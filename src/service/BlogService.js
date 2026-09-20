'use strict';

import { BlogDAO } from '../dao/BlogDAO.js';
import { SiteLibrary } from '../modules/common/SiteLibrary.js';

export class BlogService {
    constructor() {}

    async initialize() {
        try {
            //dao를 호출하여 초기화함 (비동기 초기화)  
            this.dao = await BlogDAO.create();

            //service name [blog]
            //this.serviceName = this.dao.findTitle();
            
            //blogmetadata DTO 생성
            this.blogMetaData = await this.metaData(this.buildPostListData());
            
            //archive meta data DTO
            this.archiveMetaData = await this.metaData(this.buildArchiveListData());

            //lifelog meta data DTO
            this.lifelogMetaData = await this.metaData(this.buildLifelogListData());
            
             //reflection meta data DTO
            this.reflectionMetaData = await this.metaData(this.buildReflectionListData());

            //photolog meta data DTO
            this.photogMetaData = await this.buildPhotologData();
        } catch (error) {
            console.log ('Blog Service : ', error);
        }
    }

    async loadContentData(content_path) {        
        return SiteLibrary.loadText(content_path);
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

    buildReflectionListData() {
        const records = this.dao.findReflection();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildLifelogListData() {
        const records = this.dao.findLifelog();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildArchiveListData() {
        const records = this.dao.findArchive();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildPostListData() {
        const records = this.dao.findPostList();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    async buildPhotologData() {
        const contents_records = this.buildPhotologEntriesData();
        const thumbnail_records = this.buildPhotologThumbnailsData();
        const photo_records = this.buildPhotologPhotosData();
        
        const dtoMap = new Map();        
        for (const [key, value] of contents_records) {
            const photolog = {
                content_id: await SiteLibrary.hashString(key),
                content: value,
                thumbnail: thumbnail_records.get(key),
                photos: photo_records.get(key)
            };
            
            dtoMap.set(key, photolog);
        }

        return dtoMap;
    }

    buildPhotologEntriesData() {
        const records = this.dao.findPhotolog();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }


    buildPhotologThumbnailsData() {
        const records = this.dao.findPhotologThumbnails();

        const dtoMap = new Map();
        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }

    buildPhotologPhotosData() {
        const records = this.dao.findPhotologPhotos();

        const dtoMap = new Map();

        for (const [key, value] of Object.entries(records)) {
            dtoMap.set(key, value);
        }

        return dtoMap;
    }
}