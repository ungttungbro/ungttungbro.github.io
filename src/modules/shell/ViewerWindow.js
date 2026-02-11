'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";
import { ViewerStateManager } from "./ViewerStateManager.js";
import { TaskStateManager } from "./TaskStateManager.js";

const CONSTANTS = Object.freeze({
    TITLE_ICON_TYPE: 'medium_icon',
    CLOSE_BUTTON_ICON_PATH: './assets/icons/close.png',
    MAXIMIZE_BUTTON_ICON_PATH: './assets/icons/screen.png',
    MINIMIZE_BUTTON_ICON_PATH: './assets/icons/minimize.png',
    VIEWER_WRAPPER_NAME: '_viewer_wrapper',
    WINDOW_BUTTON_NAME: 'window_button'
});

export class ViewerWindow {
    constructor () {
        this.targetId = null;
        this.viewer_wrapper_id = null;        
        this.viewer_wrapper_element = null;
        this.window_element = null;
        this.beforeWidth = null;
        this.beforeHeight = null;
    }

    /*  this 멤버필드
        id, width, height, className, contentClassName, titleIconPath,
        titleText, headerContents, mainContents, footerContents
    */
    show() {
        this.viewer_wrapper_id = this.id;
        const isViewerWrapper = document.querySelector(`#${CSS.escape(this.viewer_wrapper_id)}`);
        if (isViewerWrapper) { return; }

        this.viewer_wrapper_element = this.createViewerWrapperElement();
        this.window_element = this.createWindowElement();
        
        const title_bar = this.createTitleBar();
        this.window_element.appendChild(title_bar);

        const contents = this.createContentArea();
        this.window_element.appendChild(contents);

        this.viewer_wrapper_element.appendChild(this.window_element);
        document.body.appendChild(this.viewer_wrapper_element);

        this.dragWindow();
        this.resizeWindow();

        ViewerStateManager.stateLog(this.viewer_wrapper_element);
    }

    createViewerWrapperElement() {
        const element = document.createElement('div');

        element.id = this.viewer_wrapper_id;
        element.className = 'viewer_wrapper';
        element.style.width = this.width;
        element.style.height = this.height;   
        element.style.pointerEvents = 'none';
        element.style.position = 'fixed';
        element.style.transform = 'none';
        element.style.left = this.left;
        element.style.top = this.top;
        element.style.zIndex = ViewerStateManager.maxZIndex() + 1;
        element.addEventListener('click', e => { 
            element.style.zIndex = ViewerStateManager.maxZIndex() + 1; 
            ViewerStateManager.stateLog(element);
        });

        return element;
    }    

    createWindowElement() {
        const element = document.createElement('div');

        element.id = this.id + '_viewer';
        element.className = this.className;
        element.style.width = this.width;
        element.style.height = this.height;       
        
        return element;
    }

    createContentArea() {       
        const contents = document.createElement('div');
        contents.id = 'content_area';
        contents.scrollTop = 0;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                contents.style.scrollSnapType = 'y mandatory';
            });
        });

        if(this.headerContents !== null) { 
            const header_panel = document.createElement('div'); header_panel.className = 'header_panel';
            header_panel.appendChild(this.headerContents);
            contents.appendChild(header_panel); 
        }      
               
        if (this.mainContents !== null) {
            const contents_panel = document.createElement('div'); contents_panel.className = 'content_panel';
            contents_panel.appendChild(this.mainContents);
            contents.appendChild(contents_panel);
        } 

        if (this.footerContents !== null) {
            const footer_panel = document.createElement('div'); footer_panel.className = 'footer_panel';
            footer_panel.appendChild(this.footerContents);
            contents.appendChild(footer_panel); 
        } 
        
        return contents;
    }

    createTitleBar() {
        const title_bar = document.createElement('div');
        title_bar.className = 'title_bar';
        
        title_bar.appendChild(this.createTitleIcon());
        title_bar.appendChild(this.createWindowButtons());

        return title_bar;
    }

    createTitleIcon() {
        const icon = document.createElement('img');
        icon.className = 'small_icon';
        icon.src =  this.titleIconPath;

        const title_figure = SiteLibrary.createImgCaption(icon, null, SiteLibrary.truncateText(this.titleText, 45));
        title_figure.style.float = 'left';        

        return title_figure;
    }

    createWindowButtons() {
        const window_buttons = document.createElement('div');
        window_buttons.id = 'window_button_container';

        const close_button = SiteLibrary.createImgElement(
            CONSTANTS.WINDOW_BUTTON_NAME, 
            '', 
            CONSTANTS.CLOSE_BUTTON_ICON_PATH, 
            'close button'
        );

        const maximize_button = SiteLibrary.createImgElement(
            CONSTANTS.WINDOW_BUTTON_NAME,
            '', 
            CONSTANTS.MAXIMIZE_BUTTON_ICON_PATH, 
            'maximize button'
        );

        const minimize_button = SiteLibrary.createImgElement(
            CONSTANTS.WINDOW_BUTTON_NAME, 
            '', 
            CONSTANTS.MINIMIZE_BUTTON_ICON_PATH, 
            'minimize button'
        );

        this.generateWindowsButtonsEvent(minimize_button, maximize_button, close_button);
        
        window_buttons.appendChild(minimize_button);
        window_buttons.appendChild(maximize_button);
        window_buttons.appendChild(close_button);
        
        return window_buttons;
    }

    generateWindowsButtonsEvent(minimize_button, maximize_button, close_button) {
        minimize_button.addEventListener('click', e => {
            e.stopPropagation();
            SiteLibrary.elementVisibility(this.viewer_wrapper_id);

            this.viewer_wrapper_element.style.zIndex = ViewerStateManager.maxZIndex() + 1; 
            ViewerStateManager.stateLog(this.viewer_wrapper_element);
        });

        maximize_button.addEventListener('click', e => {
            e.stopPropagation();

            SiteLibrary.toggleElementMaximize(
                this.window_element,
                'taskbar',
                this.beforeWidth, 
                this.beforeHeight
            );

            this.viewer_wrapper_element.style.zIndex = ViewerStateManager.maxZIndex() + 1; 
            ViewerStateManager.stateLog(this.viewer_wrapper_element);
        });

        close_button.addEventListener('click', e => {
            e.stopPropagation();

            TaskStateManager.removeTask(this.viewer_wrapper_element.dataset.group, this.viewer_wrapper_id  + '_task_bar_item');
            ViewerStateManager.removeGroup(this.viewer_wrapper_id);

            let task_element = document.getElementById(this.targetId);
            let task_container = document.getElementById('task-items');
            let group_root = document.getElementById(task_element.dataset.group + '_task_group');

            const group_items = TaskStateManager.getGroup(task_element.dataset.group);
            if (group_root && group_items.size === 1) {
                task_container.appendChild(group_items.values().next().value.element);           
                group_root.remove();
            }

            SiteLibrary.closeElement(this.targetId);            
            SiteLibrary.closeElement(this.viewer_wrapper_id);

            group_root = null;
            task_container = null;
            task_element = null;
        });
    }

    resizeWindow() {        
        const resizeDirection = (e) => {
            const EDGE = 12; // 모서리 감지 영역(px)

            const rect = this.window_element.getBoundingClientRect();
            
            const left   = rect.left;
            const right  = rect.right;
            const top    = rect.top;
            const bottom = rect.bottom;

            const nearLeft   = Math.abs(e.clientX - left)   <= EDGE && e.clientY >= top && e.clientY <= bottom;
            const nearRight  = Math.abs(e.clientX - right)  <= EDGE && e.clientY >= top && e.clientY <= bottom;
            const nearTop    = Math.abs(e.clientY - top)    <= EDGE && e.clientX >= left && e.clientX <= right;
            const nearBottom = Math.abs(e.clientY - bottom) <= EDGE && e.clientX >= left && e.clientX <= right;

            let direction = null;
            if (nearRight && nearBottom) direction = 'se';
            else if (nearRight && nearTop) direction = 'ne';
            else if (nearLeft && nearBottom) direction = 'sw';
            else if (nearLeft && nearTop) direction = 'nw';
            else if (nearRight) direction = 'e';
            else if (nearLeft) direction = 'w';
            else if (nearBottom) direction = 's';
            else if (nearTop) direction = 'n';
            else direction = null;

            return direction;
        };

        this.onResizeMove = (e) => {
            if (!this.isResizing) return;

            const dx = e.clientX - this.resizeStartX;
            const dy = e.clientY - this.resizeStartY;

            let newWidth  = this.startWidth;
            let newHeight = this.startHeight;
            let newLeft   = this.startLeft;
            let newTop    = this.startTop;

            if (this.resizeDirection.includes('e')) {
                newWidth = this.startWidth + dx;
            }
            if (this.resizeDirection.includes('s')) {
                newHeight = this.startHeight + dy;
            }
            if (this.resizeDirection.includes('w')) {
                newWidth = this.startWidth - dx;
                newLeft  = this.startLeft + dx;
            }
            if (this.resizeDirection.includes('n')) {
                newHeight = this.startHeight - dy;
                newTop    = this.startTop + dy;
            }

            this.window_element.style.width  = newWidth + 'px';
            this.window_element.style.height = newHeight + 'px';
            this.window_element.style.left = newLeft + 'px';
            this.window_element.style.top = newTop + 'px';

            this.viewer_wrapper_element.style.width  = this.window_element.style.width;
            this.viewer_wrapper_element.style.height = this.window_element.style.height;
            this.viewer_wrapper_element.style.left = this.window_element.style.left;
            this.viewer_wrapper_element.style.top = this.window_element.style.top;
        };

        this.onResizeEnd = () => {
            this.isResizing = false;

            this.beforeWidth = this.window_element.style.width;
            this.beforeHeight = this.window_element.style.height;

            document.removeEventListener('pointermove', this.onResizeMove);
            document.removeEventListener('pointerup', this.onResizeEnd);

            ViewerStateManager.stateLog(this.viewer_wrapper_element);
        };

        this.window_element.addEventListener('pointerdown', e => {
            const direction = resizeDirection(e);
            if (!direction) return;

            const rect = this.window_element.getBoundingClientRect();

            this.isResizing = true;
            this.resizeDirection = direction;

            this.resizeStartX = e.clientX;
            this.resizeStartY = e.clientY;

            this.startWidth  = rect.width;
            this.startHeight = rect.height;
            this.startLeft   = rect.left;
            this.startTop    = rect.top;

            document.addEventListener('pointermove', this.onResizeMove);
            document.addEventListener('pointerup', this.onResizeEnd);
        });

        this.window_element.addEventListener('pointermove', e => {            
            const direction = resizeDirection(e);
            const cursorMap = {
                e: 'e-resize',
                w: 'w-resize',
                n: 'n-resize',
                s: 's-resize',
                ne: 'ne-resize',
                nw: 'nw-resize',
                se: 'se-resize',
                sw: 'sw-resize'
            };

            if (cursorMap[direction]) {
                this.window_element.style.cursor = cursorMap[direction];
            } else {
                this.window_element.style.cursor = 'default';
            }                
        });
    }

    dragWindow() {
        const wrapper = this.viewer_wrapper_element;   

        const title_bar = wrapper.querySelector('.title_bar');

        this.generateDragEvent(title_bar);
    }

    generateDragEvent(title_bar) {
        let drag_state = null;

        // 더블 클릭 최대/최소화
        title_bar.addEventListener('dblclick', e => {
            if (!title_bar.isDragging) {
                SiteLibrary.toggleElementMaximize(
                    this.window_element,
                    'taskbar',
                    this.beforeWidth,
                    this.beforeHeight
                );
            }
        });

        // 드래그 시작
        title_bar.addEventListener('pointerdown', e => {
            if (e.target.closest('.window_button')) return;

            const wrapper = this.viewer_wrapper_element;
            if (wrapper.classList.contains(wrapper.id)) return;

            wrapper.style.zIndex = ViewerStateManager.maxZIndex() + 1; 
            ViewerStateManager.stateLog(wrapper);

            const rect = wrapper.getBoundingClientRect();

            drag_state = {
                pointerId: e.pointerId,
                startX: e.clientX,
                startY: e.clientY,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
                dragging: false
            };
        });

        // 드래그 이동
        document.addEventListener('pointermove', e => {
            if (!drag_state || e.pointerId !== drag_state.pointerId) return;

            const dx = Math.abs(e.clientX - drag_state.startX);
            const dy = Math.abs(e.clientY - drag_state.startY);

            // 드래그 임계값
            if (!drag_state.dragging && (dx > 5 || dy > 5)) {
                drag_state.dragging = true;
                title_bar.isDragging = true;
                e.preventDefault();
            }

            if (!drag_state.dragging) return;

            const wrapper = this.viewer_wrapper_element;
            wrapper.style.left = (e.clientX - drag_state.offsetX) + 'px';
            wrapper.style.top  = (e.clientY - drag_state.offsetY) + 'px';
        });

        // 드래그 종료
        document.addEventListener('pointerup', e => {
            if (!drag_state || e.pointerId !== drag_state.pointerId) return;

            ViewerStateManager.stateLog(this.viewer_wrapper_element);
            
            title_bar.isDragging = false;
            drag_state = null;
        });

        document.addEventListener('pointercancel', () => {
            drag_state = null;
            title_bar.isDragging = false;
        });
    }


    configureWindow(
        id, width, height, top, left,
        class_name, content_name, 
        title_icon_path, title_text, 
        header_contents, main_contents, footer_contents
    ) {        
        this.id = id;
        this.width = this.beforeWidth = width;
        this.height = this.beforeHeight = height;
        this.top = top;
        this.left = left;
        this.className = class_name;
        this.contentClassName = content_name;
        this.titleIconPath = title_icon_path;
        this.titleText = title_text;
        this.headerContents = header_contents;
        this.mainContents = main_contents;
        this.footerContents = footer_contents;
    }
}