'use strict';

export class LifelogController {
    constructor(MainService, BlogService, View) {
        this.curation_service = MainService;
        this.original_service = BlogService;;
        this.section_view = View;

        this.initialize();
    }
   
    async initialize() {}

    /**
     * Lifelog 섹션 블록을 표현한다.
     * 섹션 블록은 큐레이션 data를 활용하므로 curation_service를 활용한다.
     */
    async displaySection() {
        const OriginalDTO = await this.original_service.getLifelog();
        const CurationDTO = await this.curation_service.getLifelog();
        
        this.section_view.setOriginalDTO(OriginalDTO);
        this.section_view.setCurationDTO(CurationDTO);

        this.section_view.show();
    }
}