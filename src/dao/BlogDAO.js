import { SiteLibrary } from "../modules/common/SiteLibrary.js";

export class BlogDAO {
    constructor() {
        this._BLOG_DATA_PATH = "./assets/data/blog/";        
    }

    static async create() {
        const dao = new BlogDAO();
        await dao.initialize();
        return dao;
    }

    async initialize() {
        [
            this.writings,
            this.archive,
            this.lifelog,
            this.reflection,
            this.photolog
        ] = await Promise.all([
            SiteLibrary.loadJson(
                `${this._BLOG_DATA_PATH}writings/writings-data.json`
            ),
            SiteLibrary.loadJson(
                `${this._BLOG_DATA_PATH}archive/archive-data.json`
            ),
            SiteLibrary.loadJson(
                `${this._BLOG_DATA_PATH}lifelog/lifelog-data.json`
            ),
            SiteLibrary.loadJson(
                `${this._BLOG_DATA_PATH}reflection/reflection-data.json`
            ),
            SiteLibrary.loadJson(
                `${this._BLOG_DATA_PATH}photolog/photolog-data.json`
            )
        ]);
    }

    findPostList() {
        return this.writings.entries;
    }

    findArchive() {
        return this.archive.entries;
    }

    findLifelog() {
        return this.lifelog.entries;
    }

    findReflection() {
        return this.reflection.entries;
    }

    /*photolog 관련 메서드*/
    findPhotolog() {
        return this.photolog.entries;
    }

    findPhotologPhotos() {
        return this.photolog.photos;
    }

    findPhotologThumbnails() {
        return this.photolog.thumbnails;
    }
}