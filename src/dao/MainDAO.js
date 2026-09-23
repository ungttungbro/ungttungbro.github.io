import { SiteLibrary } from "../modules/common/SiteLibrary.js";

export class MainDAO {
    constructor() {
        this._ABOUT_DATA_PATH = "./assets/data/main.json";
    }

    static async create() {
        const dao = new MainDAO();
        await dao.initialize();
        return dao;
    }

    async initialize() {
        // DB CONN JSON 반환
        this.DB = await SiteLibrary.loadJson(this._ABOUT_DATA_PATH);
        this.aboutRecords = this.DB.about;
        this.linksRecords = this.DB.links;
        this.writingRecords = this.DB.writings;
        this.reflectionRecords = this.DB.reflection;
    }

    findAboutAll() {
        return this.aboutRecords;
    }

    findLinksAll() {
        return this.linksRecords;
    }

    findAboutPhotos() {
        return this.aboutRecords.photos;
    }

    findAboutSpecs() {
        return this.aboutRecords.specs;
    }

    findAboutContacts() {
        return this.aboutRecords.contacts;
    }

    findOldMyWeb() {
        return this.linksRecords.old_my_web;
    }

    findThanksTo() {
        return this.linksRecords.thanks_to;
    }

    findWritings() {
        return this.writingRecords.entries;
    }

    findReflection() {
        return this.reflectionRecords.entries;
    }
}