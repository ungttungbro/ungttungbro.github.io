'use strict';

import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { viewerConfig } from "../modules/viewerWindow/viewerConfig.js";
import { MainDAO } from '../dao/MainDAO.js';

export class MainService {
    constructor() { }

    async initialize() {
        try {
            //dao를 호출하여 초기화함 (비동기 초기화)  
            this.dao = await MainDAO.create();
            
            this.aboutData = this.buildAboutData();
            this.linksData = this.buildLinksData();
            this.writings = await this.metaData(this.buildWritings());
            this.reflection = await this.metaData(this.buildReflection());
            this.lifelog = await this.metaData(this.buildLifelog());
        } catch (error) {
            console.log('About Service : ', error);
        }
    }
    
    async metaData(data) {
        const contents_records = data;
        
        const dtoMap = new Map();        
        for (const [key, value] of contents_records) {            
            const blog = {
                content_id: await SiteLibrary.hashString(key + value[1] + value[2]),
                region: value[0],
                type: value[1],
                title: value[2],
                summary: value[3],
                content_path: value[4],
                width: value[5]
            };

            dtoMap.set(key, blog);
        }

        return dtoMap;
    }

    buildAboutData() { 
        const about = {
            specs: this.buildSpecsData(),
            contacts: this.buildContactsData(),
            photos: this.buildPhotosData()
        };     

        return about;
    }

    buildPhotosData() {
        const photo_records = this.dao.findAboutPhotos(); 
        const photo_path = SiteLibrary.generateRandomNumber(photo_records.length);

        const dtoMap = new Map();
        dtoMap.set('featured_photo_path', photo_records[photo_path]);
        dtoMap.set('photo_records_size', photo_records.length);
        dtoMap.set('photos_data', photo_records);

        return dtoMap;
    }

    buildSpecsData() {
        const spec_records = this.dao.findAboutSpecs();

        const dtoMap = new Map();
        dtoMap.set('닉네임', spec_records['닉네임']);
        //dtoMap.set('전공', spec_records['전공']);
        //dtoMap.set('직업', spec_records['직업']);

        return dtoMap;
    }

    buildContactsData() {
        const contact_records = this.dao.findAboutContacts();

        const dtoMap = new Map();
        dtoMap.set('이메일', contact_records['email']);
        dtoMap.set('홈페이지', contact_records['homepage']); 
        dtoMap.set('깃허브', contact_records['github']); 
          
        return dtoMap;
    }

    buildLinksData() { 
        const Links = {
            oldMyWeb: this.buildOldMyWebData(),
            thanksTo: this.buildThanksToData()
        };

        return Links;
    }

    buildOldMyWebData() {
        const research_records = this.dao.findOldMyWeb();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(research_records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildThanksToData() {
        const research_records = this.dao.findThanksTo();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(research_records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildWritings() {
        const records = this.dao.findWritings();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildReflection() {
        const records = this.dao.findReflection();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildLifelog() {
        const records = this.dao.findLifelog();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildViewerConfig(viewer_id, width, height, content_type, section_icon, title, title_truncate_length) {        
        const config = structuredClone(viewerConfig);    
       
        config.element.elementId = viewer_id;
        config.element.offsetElementId = 'taskbar';
        config.element.className = 'viewer';

        config.layout.width = width + 'rem';
        config.layout.height = height + 'rem';
        config.layout.left = SiteLibrary.pxToRem(((window.innerWidth - SiteLibrary.remToPx(width)) / 2)) + 'rem';
        config.layout.top = SiteLibrary.pxToRem(((window.innerHeight - SiteLibrary.remToPx(height)) / 2)) + 'rem';

        config.meta.contentType = content_type;
        config.meta.titleIconPath = section_icon;
        config.meta.titleText = SiteLibrary.truncateText(title, title_truncate_length);

        return config;
    }
}