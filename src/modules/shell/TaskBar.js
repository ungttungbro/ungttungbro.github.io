'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";
import { ViewerStateManager } from "./ViewerStateManager.js";
import { TaskStateManager } from "./TaskStateManager.js";

const TASKBAR_CONSTANTS = Object.freeze({
    TITLE_ICON_TYPE : 'medium_icon',
    CLOSE_BUTTON_ICON_PATH : './assets/icons/close.png',
    LOGO_ICON_PATH: '/assets/icons/logo.png',
    COLOR_ICON_PATH: '/assets/icons/color.png'
});

export class TaskBar {
    initialize(task_bar_element) {
        if (!task_bar_element) 
            throw new Error('taskbar element required');

        this.taskBarElement = task_bar_element;
        this.taskItemsElement = document.createElement('div');
        this.taskItemsElement.id = 'task-items';

        this.layout();
    }

    layout() {
        const logo = SiteLibrary.createImgElement('', 'logo', TASKBAR_CONSTANTS.LOGO_ICON_PATH, 'logo'); 
        logo.title = '화면정리 (clean view)';       

        logo.addEventListener('click', () =>{
            const group_map = TaskStateManager.taskGroupMap;

            for (const taskMap of group_map.values()) {
                for (const taskData of taskMap.values()) {
                    const mounted_element = document.getElementById(taskData.targetId);
                    mounted_element.style.visibility = 'hidden';
                }
            }

            const clarity_filter = document.getElementById('shade-panel');
            if (clarity_filter) {
                clarity_filter.remove();
                document.body.style.overflow = 'auto';
            }
        });
        
        const color_theme = localStorage.getItem('color-theme');
        if (color_theme) { document.documentElement.setAttribute('data-theme', color_theme); }
        else { document.documentElement.setAttribute('data-theme', 'dark'); }

        const color = document.createElement('div');
        color.id = 'color-theme';
        color.title = (color_theme === 'dark' ? 'light mode' : 'dark mode');
        
        color.addEventListener('click', () =>{
            const theme = document.documentElement.getAttribute('data-theme');
            
            let mode = '';

            if (theme === 'dark') { mode = 'light'; color.title = theme + ' mode'; }
            else { mode = 'dark'; color.title = theme + ' mode'; }

            document.documentElement.setAttribute('data-theme', mode);

            localStorage.setItem('color-theme', mode);
        });

        const main_layout = document.querySelector('main');

        const screen_shade = document.createElement('div');
        screen_shade.id = 'screen-shade';
        screen_shade.title = '선명도 필터 (clarity filter)';

        screen_shade.addEventListener('click', () => {
            const el = document.getElementById('shade-panel');
            if (el) {
                el.remove();
                document.body.style.overflow = 'auto';
                return; 
            }
            
            const shade_panel = document.createElement('div');
            shade_panel.id = 'shade-panel';
            
            main_layout.appendChild(shade_panel);

            document.body.style.overflow = 'hidden';
        });

        this.taskBarElement.appendChild(logo);
        this.taskBarElement.appendChild(this.taskItemsElement);
        this.taskBarElement.appendChild(screen_shade);
        this.taskBarElement.appendChild(color);
    }
    
    mount(group_type, taskbar_item_id, target_id, title_icon_path, title_text) {
        const task_item = this.createSingleTaskItem (
            group_type, 
            taskbar_item_id, 
            target_id, 
            title_icon_path, 
            title_text
        );

        TaskStateManager.addTask(group_type, task_item, target_id);

        const task_bar = this.taskItemsElement;
        const task_group = TaskStateManager.getGroup(group_type);
        const group_length = task_group.size;

        const task_group_root = this.taskGroupRoot(
            group_type,
            task_group,
            title_icon_path
        );

        if (group_length === 1) { 
            task_bar.appendChild(task_item);
            return;
        } 
        
        if (group_length === 2) {
            task_bar.appendChild(task_group_root);
            return;
        } 
        
        const groupItems = task_group_root.querySelector('.task-group-items');
        if (!groupItems) return;

        groupItems.appendChild(task_item);

        return task_bar;
    }

    taskGroupRoot(group_type, task_group, title_icon_path) {
        let root = document.getElementById(group_type + '_task_group');

        if (root) return root;

        root = this.createTaskGroupRoot(
            group_type,
            group_type + '_task_group',
            title_icon_path,
            this.groupName(group_type)
        );

        const group_items = this.createGroupItems(task_group);
        root.appendChild(group_items);

        this.groupItemsEvent(root, group_items);

        return root;
    }

    groupItemsEvent(task_group_item, group_items) {
        document.addEventListener('pointerdown', (e) => {
            if (!group_items.contains(e.target)) {
                group_items.style.visibility = 'hidden';
            }
        });

        task_group_item.addEventListener ('click', (e) => {
            e.stopPropagation();
            if (group_items.style.visibility === 'visible') {
                group_items.style.visibility = 'hidden';
            } else {
                group_items.style.visibility = 'visible';
            }            
        });
    }

    createGroupItems(task_group) {
        const group_items = document.createElement('div');
        group_items.className = 'task-group-items';

        for (const [key] of task_group) {
            group_items.appendChild(task_group.get(key).element);
        }

        return group_items;
    }

    teardownSingleItems(group_type) {
        const group = TaskStateManager.getGroup(group_type);
        if (!group) return;

        for (const task of group.values()) {
            if (task.element) {
                task.element.remove();
                task.element = null;
            }
        }
    }

    createTaskGroupRoot(group_type, task_group_id, title_icon_path, title_text) {
        const element = document.createElement('div');
        element.id = task_group_id;
        element.className = 'task-bar-group';

        const title_img = SiteLibrary.createImgElement(TASKBAR_CONSTANTS.TITLE_ICON_TYPE, '', title_icon_path, '');
        const caption = SiteLibrary.createImgCaption(title_img, null, title_text);

        const close_button_icon_path = TASKBAR_CONSTANTS.CLOSE_BUTTON_ICON_PATH;
        const close_img = SiteLibrary.createImgElement('task-item-close', '', close_button_icon_path, '');

        close_img.addEventListener ('click', (e) => {
            e.stopPropagation();

            const group = TaskStateManager.getGroup(group_type);

            for (const task of group.values()) {
                this.unmount(task.element.id, task.targetId);
            }
        });

        element.appendChild(title_img);
        element.appendChild(caption);
        element.appendChild(close_img);

        return element;
    }

    createSingleTaskItem(group_type, taskbar_item_id, target_id, title_icon_path, title_text) {
        const taskbar_item = this.createTaskBarItem (
            taskbar_item_id, 
            target_id, 
            title_icon_path, 
            SiteLibrary.truncateText(title_text, 12)
        );

        taskbar_item.dataset.group = group_type;

        return taskbar_item;
    }

    groupName(group_type) {
        let group_name = '';
        switch(group_type) {
            case 'writings':
                group_name = '라이팅스 (writings)';
                break;
            case 'lifelog' :
                group_name = '라이프로그 (lifelog)';
                break;
            case 'archive' :
                group_name = '아카이브 (archive)';
                break;
            case 'reflection' :
                group_name = '리플렉션 (reflection)';
                break;
            case 'photolog' :
                group_name = '포토로그 (photolog)';
                break;
            default:
                group_name = '';
                break;
        }

        return group_name;
    }

    createTaskBarItem(taskbar_item_id, target_id, title_icon_path, title_text) {
        const element = document.createElement('div');
        element.id = taskbar_item_id;
        element.className = 'task-bar-item';

        element.addEventListener ('click', () => {
            const viewer_wrapper_el = document.getElementById(target_id);
            if (!viewer_wrapper_el) {
                console.warn('element not found:', target_id);
                return;
            }

            ViewerStateManager.bringToFront(viewer_wrapper_el);
        });

        const title_img = SiteLibrary.createImgElement(TASKBAR_CONSTANTS.TITLE_ICON_TYPE, '', title_icon_path, '');
        const caption = SiteLibrary.createImgCaption(title_img, null, title_text);

        const close_button_icon_path = TASKBAR_CONSTANTS.CLOSE_BUTTON_ICON_PATH;
        const close_img = SiteLibrary.createImgElement('task-item-close', '', close_button_icon_path, '');

        close_img.addEventListener ('click', (e) => {
            e.stopPropagation();

            this.unmount(element.id, target_id);

            TaskStateManager.removeTask(element.dataset.group, element.id);
            ViewerStateManager.removeGroup(target_id);
        });

        element.appendChild(caption);
        element.appendChild(close_img);
       
        return element;
    }

    unmount(task_bar_item_id, target_id) {
        let task_element = document.getElementById(task_bar_item_id);

        TaskStateManager.removeTask(task_element.dataset.group, task_element.id);

        SiteLibrary.closeElement(task_element.id);        
        SiteLibrary.closeElement(target_id);
        
        const group_items = TaskStateManager.getGroup(task_element.dataset.group);
        let group_root = document.getElementById(task_element.dataset.group + '_task_group');

        if (group_root && group_items.size === 1) {
            this.taskItemsElement.appendChild(group_items.values().next().value.element);
            group_root.remove();
        }

        if(!TaskStateManager.getElementsSize()) {
            const clarity_filter = document.getElementById('shade-panel');
            if (clarity_filter) {
                clarity_filter.remove();
                document.body.style.overflow = 'auto';
            }
        }

        group_root = null;
        task_element = null;
    }
}

export const taskbar = new TaskBar();