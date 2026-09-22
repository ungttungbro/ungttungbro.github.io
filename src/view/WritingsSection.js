'use strict';

import { ELEMENT_TYPE, COMMON } from "../modules/common/Constants.js";
import { siteMeta } from "../modules/site/siteMeta.js";
import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { ViewerWindow } from "../modules/viewerWindow/ViewerWindow.js";
import { shell } from "../modules/shell/Shell.js";
import { Templates } from "../modules/site/Templates.js";
import { taskbar } from "../modules/taskbar/TaskBar.js";
import { ViewerStateManager } from "../modules/viewerWindow/ViewerStateManager.js";
import { ViewerWindowProcessRegistry } from "../modules/viewerWindow/ViewerWindowProcessRegistry.js";
import { viewerConfig } from "../modules/viewerWindow/viewerConfig.js";

export class WritingsSection {
    constructor(MainService, BlogService) {
        this.main_service = MainService;
        this.blog_service = BlogService;
        this.initialize();

        this._BASE_PATH = "./assets/data/blog/";
    }

    async initialize() { }

    show() {
        try {
            this.render();
        } catch (error) {
            console.log('[ Blog Section ] : ', error);
        }
    }

    render() {
        const writings = document.getElementById('writings');
        writings.appendChild(this.createSection('writings', 'blog-writings', this.main_service.writings));
    }

    createSection(type, section_id, data) {        
        const section_meta_data = siteMeta.selectSectionConfig(type);
        if(!section_meta_data) return;

        const element = document.createElement(ELEMENT_TYPE.DIV); element.id = section_id;
        const section_header = this.generateSectionHeader(data, siteMeta.selectSectionConfig(type));

        Templates.createSectionHeaderEvent(section_header, section_meta_data.captionId);

        element.appendChild(section_header);

        const items = this.generateSectionItems(data, siteMeta.selectSectionConfig(type));
        element.appendChild(items);

        return element;
    }

    createSectionItem(id, meta_data, title, title_char_max_length, summary, summary_char_max_length, content_path) {
        const element = document.createElement(ELEMENT_TYPE.DIV);
        element.className = 'writings-section-item-panel';

        const meta_span = document.createElement('span');
        meta_span.className = 'meta';
        meta_span.innerHTML = meta_data;
        meta_span.innerHTML += '<br>';

        element.appendChild(meta_span);

        const title_span = document.createElement('span');
        title_span.className = 'title';
        title_span.textContent = SiteLibrary.truncateText(title, title_char_max_length);

        const summary_span = document.createElement('span');
        summary_span.className = 'summary';
        summary_span.textContent = SiteLibrary.truncateText(summary, summary_char_max_length);

        const a =  document.createElement('a');
        a.href = '#';
        a.appendChild(title_span);
        a.appendChild(document.createElement('br'));
        a.appendChild(summary_span);

        const section_config = siteMeta.selectSectionConfig('writings');
        this.generatePostEvent(
            section_config.blogTypeName, 
            COMMON.VIEWER_PREFIX + id, 
            a, 
            section_config.sectionHeaderIcon, 
            title, 
            null,
            this._BASE_PATH + content_path, 
            COMMON.COPYRIGHT
        );

        element.appendChild(a);

        return element;
    }

    generatePostEvent(type, id, element, section_icon, title, header, content_path, footer) {
        element.addEventListener('mouseenter', e => { SiteLibrary.prefetch(element, content_path); }); 
        element.addEventListener('click',  e => {
            this.onPostClick (e, id, type, section_icon, title, header, content_path, footer);
        });
    }

    generateSectionItems(data, config) {
        const frag = document.createDocumentFragment();

        const element = document.createElement(ELEMENT_TYPE.DIV);
        element.className = config.latestPostClassName;

        let index = 0;
        for (const [key, value] of data) {
            const sectionItemElement = this.createSectionItem(
                value.content_id,
                Templates.symbol(value.type) + key,
                value.title,
                config.titleCharLength,
                value.summary,
                config.summaryCharLength,
                value.content_path
            );

            frag.appendChild(sectionItemElement);

            if (++index < data.size) {
                frag.appendChild(document.createElement('hr'));
            }      
        }

        element.appendChild(frag);

        return element;
    }

    

    generateSectionHeader(data, config) {
        const section_header = Templates.createSectionHeader(
            config.sectionHeaderId, 
            config.captionImgId, 
            config.captionId,
            config.className, 
            config.sectionHeaderIcon, 
            config.captionText, 
            config.sectionHeaderIconAlt
        );

        section_header.addEventListener('click',  e => {
            this.onSectionHeaderClick (
                e, 
                config.blogTypeName, 
                config.listViewerId, 
                config.sectionHeaderIcon, 
                config.sectionListName,
                this.generateSectionItems(data, config),
                null,
                COMMON.COPYRIGHT
            );
        });

        return section_header;
    }

    

    onSectionHeaderClick(e, blog_type, id, section_icon, title, header, contents, footer) {
        e.preventDefault();

        const viewer_id = COMMON.VIEWER_PREFIX + id;
        const task_id = COMMON.TASKBAR_PREFIX + id;
        const config = structuredClone(viewerConfig);

        try {
            config.element.elementId = viewer_id;
            config.element.offsetElementId = 'taskbar';
            config.element.className = 'viewer';

            config.layout.width = 22 + 'rem';
            config.layout.height = 38 + 'rem';
            config.layout.left = SiteLibrary.pxToRem(((window.innerWidth - SiteLibrary.remToPx('22')) / 2)) + 'rem';
            config.layout.top = SiteLibrary.pxToRem(((window.innerHeight - SiteLibrary.remToPx('38')) / 2)) + 'rem';

            config.meta.contentType = blog_type;
            config.meta.titleIconPath = section_icon;
            config.meta.titleText = SiteLibrary.truncateText(title, 18);
            
            this.mountContents(config, task_id, header, contents, footer);
        } catch(error) {
            console.warn('Section Header Event : ', error);
        } finally {
            const element = document.getElementById(viewer_id);
            element.dataset.group = config.meta.contentType;

            ViewerStateManager.stateLog(element);
        }
    }
    
    async onPostClick(e, id, blog_type, section_icon, title, header, content_path, footer) {
        e.preventDefault();

        const config = this.main_service.buildViewerConfig(id, 48, 36, blog_type, section_icon, title, 24);

        try {
            this.mountContents(
                config, 
                COMMON.TASKBAR_PREFIX + id, 
                header, 
                await SiteLibrary.loadText(content_path), 
                footer
            );
        } catch(error) {
            console.warn('Blog Post Event : ', error);
        } finally {
            const element = document.getElementById(id);
            element.dataset.group = config.meta.contentType;

            ViewerStateManager.stateLog(element);
        }
    }

    mountContents(viewer_config, task_id, header, contents, footer) {        
        if (document.getElementById(viewer_config.element.elementId)) {
            ViewerStateManager.bringToFront(document.getElementById(viewer_config.element.elementId));
            return; 
        }

        const viewer = new ViewerWindow();
        viewer.configureWindow(
            viewer_config,
            Templates.createContentPanel('blog-header-panel', header),
            Templates.createContentPanel('blog-content-panel', contents),
            Templates.createContentPanel('blog-footer-panel', footer)
        );

        viewer.targetId = task_id;        
        viewer.show();

        if (taskbar.taskBarElement.dataset.column < 3) {
            SiteLibrary.toggleElementMaximize(viewer.windowElement, 'taskbar');
            if (viewer.isMaximized) viewer.isMaximized = false;
            else viewer.isMaximized = true;

            history.pushState({ list: viewer.id }, '', '');
            window.addEventListener('popstate', (e) => {
                if (!e.state) return;
                if (!e.state?.list) {
                    ViewerWindowProcessRegistry.get('unmount', 'function')?.(
                        viewer.windowElement.dataset.group,
                        viewer.targetId,
                        viewer.id
                    );
                }
            });
        }

        shell.mountTaskItem(
            viewer_config.meta.contentType, 
            viewer.targetId, 
            viewer.id, 
            viewer_config.meta.titleIconPath, 
            viewer_config.meta.titleText
        );
    }
}