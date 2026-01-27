'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";
import { StateManager } from "./StateManager.js";

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
    
    mount(taskbar_item_id, target_id, title_icon_path, title_text) {
        const taskbar_item = this.createTaskBarItem(
            taskbar_item_id, 
            target_id, 
            title_icon_path, 
            SiteLibrary.truncateText(title_text, 12)
        );

        this.taskBarElement.appendChild(taskbar_item);        
    }

    createTaskBarItem(task_bar_item_id, target_id, title_icon_path, title_text) {
        const element = document.createElement('div');
        element.id = task_bar_item_id;
        element.className = 'task_bar_item';

        element.addEventListener ('click', () => {
            const viewer_wrapper_el = document.getElementById(target_id);
            if (!viewer_wrapper_el) {
                console.warn('element not found:', target_id);
                return;
            }

            StateManager.bringToFront(viewer_wrapper_el);
        });

        const title_img = SiteLibrary.createImgElement(TASKBAR_CONSTANTS.TITLE_ICON_TYPE, '', title_icon_path, '');
        const caption = SiteLibrary.createImgCaption(title_img, null, title_text);

        const close_button_icon_path = TASKBAR_CONSTANTS.CLOSE_BUTTON_ICON_PATH;
        const close_img = SiteLibrary.createImgElement('task_item_close', '', close_button_icon_path, '');

        close_img.addEventListener ('click', (e) => {
            e.stopPropagation();
            this.unmount(element.id, target_id);
            StateManager.removeGroup(target_id);
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