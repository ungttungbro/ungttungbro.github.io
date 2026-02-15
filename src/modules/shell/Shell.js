'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";
import { ViewerStateManager } from "./ViewerStateManager.js";
import { TaskStateManager } from "./TaskStateManager.js";
import { taskbar } from "./TaskBar.js";

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
        await taskbar.initialize(task_bar_element);
        taskbar.groupTypeData = GROUP_CONFIG;
        this.showTaskBar();
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
}

export const shell = new Shell();