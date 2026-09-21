'use strict';

import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { MainDAO } from '../dao/MainDAO.js';

export class MainService {
    constructor() { }

    async initialize() {
        try {
            //dao를 호출하여 초기화함 (비동기 초기화)  
            this.dao = await MainDAO.create();
            
            this.aboutData = this.buildAboutData();
            this.linksData = this.buildLinksData();
        } catch (error) {
            console.log('About Service : ', error);
        }
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
}