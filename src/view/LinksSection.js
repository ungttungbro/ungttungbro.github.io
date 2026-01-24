'use strict';

import { LINKS_SECTION_NAMES, LINKS_SECTION_PATHS } from "../modules/common/Constants.js";
import { ELEMENT_TYPE } from "../modules/common/Constants.js";
import { siteMap } from "../modules/site/siteMap.js";
import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { Templates } from "../modules/site/Templates.js";

export class LinksSection {
    constructor(links_service) {
        this.linksService = links_service;
        this.initialize();
    }

    async initialize() {
        const section_id = this.linksService.serviceName;
        this.linksSectionElement = document.getElementById(section_id);
    }

    show() {
        try {            
            this.renderLinks();
        } catch (error) {
            console.log('error state : ', error);
        }
    }

    renderLinks() {
        const links_section_header = Templates.createSectionHeader(
            siteMap.links.sectionHeaderId,
            siteMap.links.captionImgId,
            siteMap.links.captionId,
            siteMap.links.className,
            siteMap.links.sectionHeaderIcon,
            siteMap.links.text,
            siteMap.links.sectionHeaderIconAlt
        );

        this.linksSectionElement.appendChild(links_section_header);

        const links_list = this.renderLinksList();
        this.linksSectionElement.appendChild(links_list);
    }

    renderLinksList() {
        const links_list = document.createElement(ELEMENT_TYPE.DIV);
        links_list.id = siteMap.links.linkListId;

        const oldMyWeb = this.generateLinksItem(
            this.linksService.linksData.oldMyWeb,
            'Old My Web', 
            './assets/icons/computer.png'
        );

        const thanks_to = this.generateLinksItem(
            this.linksService.linksData.thanksTo,
            'Thanks to...',
            './assets/icons/thankyou.png'
        );
        
        links_list.appendChild(oldMyWeb);        
        links_list.appendChild(thanks_to);
        
        return links_list;
    }

    generateLinksItem(links_view_data, links_name, icon_path) {
        const frag = document.createDocumentFragment();

        const element = document.createElement(ELEMENT_TYPE.DIV);
        element.className = siteMap.links.linkItemListClassName;

        const title_icon = SiteLibrary.createImgElement(
            'medium_icon',
            null,
            icon_path,
            'research links title icon'
        );
        
        const figure = SiteLibrary.createImgCaption(title_icon, null, links_name);
        figure.style.fontWeight = '500';
        frag.appendChild(figure);

        const data = links_view_data;

        const ul = document.createElement('ul');
        
        for (const [_, value] of data) {
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.href = value[0];
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = value[1];            
                    
            li.appendChild(a);
            ul.appendChild(li);
        }

        frag.appendChild(ul);

        element.appendChild(frag);

        return element;
    }
}