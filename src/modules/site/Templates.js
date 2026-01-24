import { SiteLibrary } from "../common/SiteLibrary.js";

export class Templates {
    constructor() {}
    async initialize() {}

    static createSectionHeader(section_header_id, img_id, caption_id, class_name, icon_path, text, icon_alt) {
        const section_header_box = document.createElement('div');
        section_header_box.id = section_header_id;
        section_header_box.className = class_name;

        const section_img_caption = SiteLibrary.createImgTitle(
            'medium_icon', 
            img_id,
            caption_id,
            icon_path, 
            text, 
            icon_alt
        );

        section_header_box.appendChild(section_img_caption);

        return section_header_box;
    }

    static createSectionHeaderEvent(section_header, caption_text) {
        const caption_element = section_header.querySelector(`#${CSS.escape(caption_text)}`);
        const content_text = caption_element.innerHTML;

        section_header.addEventListener('mouseenter', e => {
            section_header.style.backgroundColor = '#444444';
            caption_element.innerHTML = content_text + '<div class="north-east-arrow">' + '&nbsp;' + ' ↗ ' + '</div>';
        });

        section_header.addEventListener('mouseleave', e => {
            section_header.style.backgroundColor = '';            
            caption_element.innerHTML = content_text;
        });
    }
}