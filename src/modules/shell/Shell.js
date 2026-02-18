'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";
import { ViewerStateManager } from "../viewerWindow/ViewerStateManager.js";
import { TaskStateManager } from "../taskbar/TaskStateManager.js";
import { ViewerWindowProcessRegistry  } from "../viewerWindow/ViewerWindowProcessRegistry.js";
import { TaskBarProcessRegistry  } from "../taskbar/TaskBarProcessRegistry.js";
import { taskbar } from "../taskbar/TaskBar.js";

const TASKBAR_CONSTANTS = Object.freeze({
    TITLE_ICON_TYPE : 'medium_icon',
    CLOSE_BUTTON_ICON_PATH : './assets/icons/close.png',
    LOGO_ICON_PATH: '/assets/icons/logo.png',
    COLOR_ICON_PATH: '/assets/icons/color.png'
});

const GROUP_CONFIG = {
    writings: { label: '라이팅스 (writings)' },
    lifelog: { label: '라이프로그 (lifelog)' },
    archive: { label: '아카이브 (archive)' },
    reflection: { label: '리플렉션 (reflection)' },
    photolog: { label: '포토로그 (photolog)' }
};

export class Shell {
    async initialize(task_bar_element) {
        this.isPortraitLayout = null;
        this.currentMode = null;

        await taskbar.initialize(task_bar_element);
        taskbar.groupTypeData = GROUP_CONFIG;
        
        this.showTaskBar();
        this.registTaskBarFunction();
        this.registViewerFunction();
        
        this.updateLayout = this.updateLayout.bind(this);
        window.addEventListener("resize", this.updateLayout);
        this.updateLayout();
    }

    updateLayout() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const newMode = isPortrait ? "portrait" : "landscape";

        if (this.currentMode === newMode) return; // 변화 없으면 중단

        this.currentMode = newMode;

        if (isPortrait) {
            this.applyPortraitLayout();
        } else {
            this.applyLandscapeLayout();
        }
    }

    applyLandscapeLayout() {
        if (this.isPortraitLayout) {
            const primary_contents = document.getElementById('content-primary');
            const secondary_contents = document.getElementById('content-secondary');
            const tertiary_contents = document.getElementById('content-tertiary');
            
            const content_primary_items = Array.from(primary_contents.children);
            const content_secondary_items = Array.from(secondary_contents.children);
            const content_tertiary_items = Array.from(tertiary_contents.children);            

            const new_primary_contents = [content_secondary_items[0], content_primary_items[1]];
            const new_secondary_contents = [content_primary_items[0], content_tertiary_items[0], content_tertiary_items[1]];
                       
            new_primary_contents.forEach(item => primary_contents.appendChild(item));
            new_secondary_contents.forEach(item => secondary_contents.appendChild(item));

            tertiary_contents.style.display = 'none';
        }

        this.isPortraitLayout = false;
    }

    applyPortraitLayout() {
        const portrait = window.innerHeight > window.innerWidth;

        if (portrait === this.isPortraitLayout) return;
        this.isPortraitLayout = portrait;

        const primary_contents = document.getElementById('content-primary');
        const secondary_contents = document.getElementById('content-secondary');

        const tertiary_contents = document.getElementById('content-tertiary') ?? document.createElement('div');
        tertiary_contents.style.display = 'grid';
        if (!tertiary_contents.id) {
            tertiary_contents.id = 'content-tertiary';
            document.querySelector('main').appendChild(tertiary_contents);
        }

        tertiary_contents.innerHTML = "";               

        const content_primary_items = Array.from(primary_contents.children);
        const content_secondary_items = Array.from(secondary_contents.children);

        const new_primary_contents = [content_secondary_items[0], content_primary_items[1]];
        const new_secondary_contents = [content_primary_items[0]];
        const new_tertiary_contents = [content_secondary_items[1], content_secondary_items[2]];
        
        new_primary_contents.forEach(item => primary_contents.appendChild(item));
        new_secondary_contents.forEach(item => secondary_contents.appendChild(item));
        new_tertiary_contents.forEach(item => tertiary_contents.appendChild(item));
    }

    showTaskBar() {
        const logo_element = SiteLibrary.createImgElement('', 'logo', TASKBAR_CONSTANTS.LOGO_ICON_PATH, 'logo'); 
        logo_element.title = '화면정리 (clean view)';       

        const screen_shade_button = document.createElement('div');
        screen_shade_button.id = 'screen-shade-button';
        screen_shade_button.title = '선명도 필터 (clarity filter)';

        const color_theme_data = localStorage.getItem('color-theme');
        const color_theme_element = document.createElement('div');
        color_theme_element.id = 'color-theme';
        color_theme_element.title = (color_theme_data === 'dark' ? 'light mode' : 'dark mode');

        taskbar.createLayout(
            this.toggleLogo(logo_element),
            this.toggleScreenShade(screen_shade_button, 'click', 'main'),
            this.toggleThemeMode(color_theme_data, color_theme_element)
        );
    }

    mountTaskItem(group_type, taskbar_item_id, target_id, title_icon_path, title_text) {
        taskbar.mount(group_type, taskbar_item_id, target_id, title_icon_path, title_text);
    }

    unmountTaskItem(task_bar_item_id, target_id) {
        taskbar.unmount(task_bar_item_id, target_id);
    }

    toggleLogo(logo_element) {
        logo_element.addEventListener('click', () => {
            const group_map = TaskStateManager.taskGroupMap;

            for (const taskMap of group_map.values()) {
                for (const taskData of taskMap.values()) {
                    const mounted_element = document.getElementById(taskData.targetId);
                    mounted_element.style.visibility = 'hidden';
                }
            }

            const screen_shade = document.getElementById('shade-panel');
            if (screen_shade.dataset.active === 'true') {
                screen_shade.dataset.active = 'false';
                screen_shade.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        return logo_element;
    }

    toggleScreenShade(event_element, event_type, target_element_id) { 
        const target_element = document.querySelector(target_element_id);
        if (!target_element) {
            console.warn('target_element not found:', target_selector);
            return event_element;
        }

        let shade_panel = document.getElementById('shade-panel');
        
        if (!shade_panel) {
            shade_panel = document.createElement('div');
            shade_panel.id = 'shade-panel';
            shade_panel.style.display = 'none';

            target_element.appendChild(shade_panel);
        }
        
        event_element.addEventListener(event_type, () => {  
            const isActive = shade_panel.dataset.active === 'true';           
            if (isActive) {                
                shade_panel.style.display = 'none';
                shade_panel.dataset.active = 'false';
                document.body.style.overflow = 'auto';
            } else {
                shade_panel.style.display = 'block';
                shade_panel.dataset.active = 'true';
                document.body.style.overflow = 'hidden';
            }
        }); 
        
        return event_element;
    }

    toggleThemeMode(color_theme_data, color_theme_element) {
        if (color_theme_data) { document.documentElement.setAttribute('data-theme', color_theme_data); }
        else { document.documentElement.setAttribute('data-theme', 'dark'); }
        
        color_theme_element.addEventListener('click', () =>{
            const theme = document.documentElement.getAttribute('data-theme');
            
            let mode = '';

            if (theme === 'dark') { mode = 'light'; color_theme_element.title = theme + ' mode'; }
            else { mode = 'dark'; color_theme_element.title = theme + ' mode'; }

            document.documentElement.setAttribute('data-theme', mode);

            localStorage.setItem('color-theme', mode);
        });

        return color_theme_element;
    }

    /*
        사이트의 레지스트리 등록
        registTaskBarFunction : 태스크바의 확장 기능을 레지스트리에 등록
    */
    registTaskBarFunction() {
        TaskBarProcessRegistry.register('unmount', this.closeTaskBarScreenShadeSnapshot());
        TaskBarProcessRegistry.register('taskBarItemClick', this.clickTaskBarItemSnapshot());
        TaskBarProcessRegistry.register('taskBarItemCloseButtonClick', this.clickTaskBarItemCloseButtonSnapshot());        
    }

    closeTaskBarScreenShadeSnapshot() {
        const snapshot = {
            ['process-name']: 'screen-shade',
            ['function']: () => {
                if(!TaskStateManager.getElementsSize()) {
                    const shade_panel = document.getElementById('shade-panel');                     
                    const isActive = shade_panel.dataset.active === 'true';        
                    
                    if (isActive) {                
                        shade_panel.style.display = 'none';
                        shade_panel.dataset.active = 'false';
                        document.body.style.overflow = 'auto';
                    }
                }
            }
        };

        return snapshot;
    }

    clickTaskBarItemSnapshot() {
        const snapshot = {
            ['process-name']: 'task-bar-item-click-event',
            ['function']: (viewer_id) => {
                const viewer = document.getElementById(viewer_id);
                if (!viewer) {
                    console.warn('element not found:', viewer_id);
                    return;
                }

                ViewerStateManager.bringToFront(viewer);
                TaskStateManager.enforceSingle('active', viewer);
                ViewerStateManager.stateLog(viewer);
            }
        };

        return snapshot;
    }

    clickTaskBarItemCloseButtonSnapshot() {
        const snapshot = {
            ['process-name']: 'task-bar-item-close-click-event',
            ['function']: (viewer_id) => {
                ViewerStateManager.removeGroup(viewer_id);
            }
        };

        return snapshot;
    }

    registViewerFunction() {
        ViewerWindowProcessRegistry.register('enforceSingle', this.enforceSingleViewerSnapshot());
        ViewerWindowProcessRegistry.register('unmount', this.unmountViewerSnapshot());
    }

    enforceSingleViewerSnapshot() {
        const snapshot = {
            ['process-name']: 'viewer-enforce-single',
            ['function']: (element) => {
                TaskStateManager.enforceSingle('active', element);
            }
        };

        return snapshot;
    }

    unmountViewerSnapshot() {
        const snapshot = {
            ['process-name']: 'unmount-viewer',
            ['function']: (group_key, task_item_id, viewer_id) => {
                TaskStateManager.removeTask(group_key, task_item_id);
                ViewerStateManager.removeGroup(viewer_id);
                taskbar.unmount(task_item_id, viewer_id);
            }
        };

        return snapshot;
    }
}

export const shell = new Shell();