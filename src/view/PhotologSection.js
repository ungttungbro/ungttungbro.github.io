'use strict';

import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { taskbar } from "../modules/shell/TaskBar.js";
import { ViewerWindow } from "../modules/shell/ViewerWindow.js";
import { Templates } from "../modules/site/Templates.js";
import { ELEMENT_TYPE, COMMON } from "../modules/common/Constants.js"
import { siteMap } from "../modules/site/siteMap.js";

export class PhotologSection {
    constructor(photolog_service) {
        this.photologService = photolog_service;
        this.initialize();
    }

    async initialize() {
        const section_id = this.photologService.serviceName;
        this.photologSectionElement = document.getElementById(section_id);
    }

    show() {
        try {
            this.renderTeasers();
        } catch (error) {
            console.log('error state : ', error);
        }
    }

    renderTeasers() {
        const photolog_section_header = this.generateSectionHeader(
            siteMap.photolog.sectionHeaderId,
            siteMap.photolog.captionImgId,
            siteMap.photolog.captionId,
            'photolog_list_all_viewer',
            siteMap.photolog.className,
            '포토로그 (photolog) 목록',
            siteMap.photolog.sectionHeaderIcon,
            siteMap.photolog.text,
            siteMap.photolog.sectionHeaderIconAlt
        );

        this.photologSectionElement.appendChild(photolog_section_header);
        
        Templates.createSectionHeaderEvent(photolog_section_header, siteMap.photolog.captionId);
        
        const teasers = this.generateTeaserList(5);
        this.photologSectionElement.appendChild(teasers);
    }

    generateSectionHeader(
        section_header_id, img_id, caption_id, viewer_id,
        class_name, viewer_title_text, icon_path, text, icon_alt,
    ) {
        const section_header = Templates.createSectionHeader(
            section_header_id, img_id, caption_id,
            class_name, icon_path, text, icon_alt
        );

        section_header.addEventListener('click',  e => {
            this.onSectionHeaderClick (
                e,
                viewer_id,
                icon_path,
                viewer_title_text,
                this.generateTeaserList(0),          
                null,                
                COMMON.COPYRIGHT
            );
        });

        return section_header;
    }

    onSectionHeaderClick(e, id, section_icon, title, header, contents, footer) {
        e.preventDefault();

        if (document.getElementById(id)) { return; }

        const height_offset = taskbar.taskBarElement.getBoundingClientRect().bottom;

        const width = window.innerWidth / 4;
        const height = window.innerHeight - height_offset;
        const top = height_offset;
        const left = Math.min(window.innerWidth - width, window.innerWidth); // 화면 안쪽으로 제한

        try {
            const viewer = new ViewerWindow();
            viewer.configureWindow(
                id,
                width + 'px',
                height + 'px',
                top + 'px',
                left + 'px',
                'viewer',
                'blog',
                section_icon,
                title,
                this.generateViewerWindowHeaderPanel(header),
                contents,
                this.generateViewerWindowFooterPanel(footer)
            );

            viewer.targetId = id + '_task_bar_item';
            viewer.show();
            
            taskbar.mount(viewer.targetId, viewer.id, section_icon, title);
        } catch(error) {
            console.log('Section Header Event : ', error);
        }
    }

    generateTeaserList(row_count) {
        const frag = document.createDocumentFragment();

        const teasers_element = document.createElement(ELEMENT_TYPE.DIV);
        teasers_element.className = siteMap.photolog.teaserListClassName;

        const iterator = this.photologService.photologData.entries();
        let result = iterator.next();

        let index = 0;
        while (!result.done) {
            const [key, value] = result.value;

            const teaser_figure = this.generateTeaser(
                key,
                value.thumbnail,
                Object.keys(value.content),
                Object.values(value.content),
                value.photos
            );

            frag.appendChild(teaser_figure);

            const nextResult = iterator.next();
            
            if (row_count > 0) {
                if (!nextResult.done && index < (row_count - 1)) { frag.appendChild(document.createElement('hr')); }
                if (index >= (row_count - 1)) { break; }
            } else {
                if (!nextResult.done) {
                    frag.appendChild(document.createElement('hr'));
                }
            }

            result = nextResult;

            index++;
        }

        teasers_element.appendChild(frag);

        return teasers_element;
    }

    generateTeaser(id, thumbnail_path, title, text, photos_path) {
        const thumbnail = SiteLibrary.createImgElement(
            siteMap.photolog.thumbnailClassName,
            null,
            thumbnail_path,
            siteMap.photolog.thumbnailImgAlt
        );

        const teaser = SiteLibrary.createImgTitleCaption(
            thumbnail,
            SiteLibrary.truncateText(title[0], 16),
            SiteLibrary.truncateText(text[0], 64)
        );
        
        teaser.className = siteMap.photolog.teaserClassName;
        
        this.generateTeaserEvent(teaser, id, title, text.toString(), photos_path, '&copy; Jonas');
        
        return teaser;
    }

    generateTeaserEvent(element, id, title, header_contents, main_contents, footer_contents) {        
        element.addEventListener('click', e => {
            this.onSectionHeaderClick (
                e,
                'photolog_list_all_viewer',
                siteMap.photolog.sectionHeaderIcon,
                '포토로그 (photolog) 목록',
                this.generateTeaserList(0),          
                null,                
                COMMON.COPYRIGHT
            );

            this.openPhotologContent(
                id,
                title,
                header_contents,
                main_contents,
                footer_contents
            );
        });
    }

    openPhotologContent(id, title, header_contents, main_contents, footer_contents) {
        if (document.getElementById(id + '_viewer')) { return; }

        const height_offset = taskbar.taskBarElement.getBoundingClientRect().bottom;

        try {
            const viewer = new ViewerWindow();
            viewer.configureWindow (
                id,
                (window.innerWidth - (window.innerWidth / 4)) + 'px',
                (window.innerHeight - height_offset) + 'px',
                height_offset + 'px',
                0,
                'viewer',
                'photolog_photo',
                siteMap.photolog.sectionHeaderIcon,
                title,
                this.generateViewerWindowHeaderPanel(header_contents),
                this.generateViewerWindowContentsPanel(main_contents),
                this.generateViewerWindowFooterPanel(footer_contents)
            );

            viewer.targetId = id + '_task_bar_item';
            viewer.show();

            taskbar.mount(viewer.targetId, viewer.id, siteMap.photolog.sectionHeaderIcon, title);
        } catch (error) {
            console.log('Blog Post Event : ', error);
        }
    }

    generateViewerWindowHeaderPanel(header_contents) {
        const header_panel = document.createElement(ELEMENT_TYPE.DIV);
        header_panel.className = 'header_panel';    
        header_panel.style.scrollSnapAlign = 'start';   

        if (typeof header_contents === 'string') {
            header_panel.innerHTML = header_contents;
        } else if (header_contents instanceof Node) {
            header_panel.style.backgroundColor = '#323232';
            header_panel.appendChild(header_contents);
        } else {
             console.warn('Unsupported header_contents type', header_contents);
        }

        return header_panel;
    }

    generateViewerWindowContentsPanel(main_contents) {
        const contents_panel = document.createElement(ELEMENT_TYPE.DIV);
        contents_panel.className = 'content_panel';

        const data = main_contents;
        
        for (const content of data) {
            const image = SiteLibrary.createImgElement(
                siteMap.photolog.photoClassName,
                '',
                content,
                siteMap.photolog.photoImgAlt
            );

            image.loading = 'lazy';
            image.style.display = 'block';

            contents_panel.appendChild(image);
        }
        
        return contents_panel;
    }

    generateViewerWindowFooterPanel(footer_contents) {
        const footer_panel = document.createElement(ELEMENT_TYPE.DIV);

        footer_panel.className = 'footer_panel';
        footer_panel.innerHTML = footer_contents;
      
        return footer_panel;
    }
}