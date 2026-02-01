'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";
import { ViewerStateManager } from "./ViewerStateManager.js";
import { TaskStateManager } from "./TaskStateManager.js";

const TASKBAR_CONSTANTS = Object.freeze({
    TITLE_ICON_TYPE : 'medium_icon',
    CLOSE_BUTTON_ICON_PATH : './assets/icons/close.png',
});

export class TaskBar {
    initialize(task_bar_element) {
        if (!task_bar_element) 
            throw new Error('taskbar element required');

        this.taskBarElement = task_bar_element;

        this.layout();
    }

    layout() {
        const logo = SiteLibrary.createImgElement('', 'logo', '/assets/icons/logo.png', 'logo');
        this.taskBarElement.appendChild(logo);
    }
    
    mount(group_type, taskbar_item_id, target_id, title_icon_path, title_text) {
        const taskbar_item = this.createTaskBarItem(
            taskbar_item_id, 
            target_id, 
            title_icon_path, 
            SiteLibrary.truncateText(title_text, 12)
        );

        taskbar_item.dataset.group = group_type;

        const task_bar = this.taskBarElement;
        task_bar.appendChild(taskbar_item);

        TaskStateManager.addTask(group_type, taskbar_item);

        const gorup_length = TaskStateManager.getGroup(group_type).size;
        
        if (gorup_length > 1) {
            const task_group_item = this.createTaskGroup (                
                taskbar_item.id, 
                title_icon_path,
                this.groupName(taskbar_item.dataset.group)
            );

            task_group_item.addEventListener ('mouseenter', (e) => {
                e.stopPropagation();

                const group_items = document.createElement('div');
                group_items.className = 'task-group-items';

                task_group_item.appendChild(group_items);
            });

            task_bar.appendChild(task_group_item);
        } else {
            console.log('그룹 아이템이 한개 아님 없음');
        }

        return task_bar;
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

    createTaskGroup(taskbar_item_id, title_icon_path, title_text) {
        const element = document.createElement('div');
        element.id = taskbar_item_id;
        element.className = 'task-bar-group';

        const title_img = SiteLibrary.createImgElement(TASKBAR_CONSTANTS.TITLE_ICON_TYPE, '', title_icon_path, '');
        const caption = SiteLibrary.createImgCaption(title_img, null, title_text);

        const close_button_icon_path = TASKBAR_CONSTANTS.CLOSE_BUTTON_ICON_PATH;
        const close_img = SiteLibrary.createImgElement('task_item_close', '', close_button_icon_path, '');

        close_img.addEventListener ('click', (e) => {
            e.stopPropagation();

            this.unmount(element.id, target_id);    
            TaskStateManager.removeTask(element.dataset.group, element.id + '_task_bar_item');
            ViewerStateManager.removeGroup(target_id);
        });

        element.appendChild(title_img);
        element.appendChild(caption);
        element.appendChild(close_img);

        return element;
    }

    createTaskBarItem(taskbar_item_id, target_id, title_icon_path, title_text) {
        const element = document.createElement('div');
        element.id = taskbar_item_id;
        element.className = 'task_bar_item';

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
        const close_img = SiteLibrary.createImgElement('task_item_close', '', close_button_icon_path, '');

        close_img.addEventListener ('click', (e) => {
            e.stopPropagation();

            this.unmount(element.id, target_id);                    
            TaskStateManager.removeTask(element.dataset.group, element.id + '_task_bar_item');
            ViewerStateManager.removeGroup(target_id);
        });

        element.appendChild(caption);
        element.appendChild(close_img);
       
        return element;
    }

    unmount(task_bar_item_id, target_id) {
        SiteLibrary.closeElement(task_bar_item_id);        
        SiteLibrary.closeElement(target_id);        
    }
}

export const taskbar = new TaskBar();