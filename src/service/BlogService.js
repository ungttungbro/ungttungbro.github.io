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
            this.serviceName = this.dao.findTitle();
            
            //blogmetadata DTO 생성
            this.blogMetaData = this.metaData(this.buildPostListData());

            //archive meta data DTO
            this.archiveMetaData = this.metaData(this.buildArchiveListData());

            //lifelog meta data DTO
            this.lifelogMetaData = this.metaData(this.buildLifelogListData());

             //lifelog meta data DTO
            this.reflectionMetaData = this.metaData(this.buildReflectionListData());
        } catch (error) {
            console.log ('Blog Service : ', error);
        }
    }

    async loadContentData(content_path) {        
        return await SiteLibrary.loadText(content_path);
    }

    metaData(data) {
        const contents_records = data;
        
        const dtoMap = new Map();        
        for (const [key, value] of contents_records) {            
            const blog = {
                type: value[0],
                title: value[1],
                summary: value[2],
                content_path: value[3],
                width: value[4]
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
}