import { SiteLibrary } from "../common/SiteLibrary.js";
import { ViewerWindowProcessRegistry } from "../viewerWindow/ViewerWindowProcessRegistry.js";

export class Templates {
    constructor() {}
    async initialize() {}

    static createSectionHeader(section_header_id, img_id, caption_id, class_name, icon_path, text, icon_alt) {
        const section_header_box = document.createElement('div');
        section_header_box.id = section_header_id;
        section_header_box.className = class_name;

        const section_img_caption = SiteLibrary.createImgTitle(
            'medium-icon', 
            img_id,
            caption_id,
            icon_path,
            text, 
            icon_alt
        );

        const more_button = document.createElement('div');
        more_button.className = 'title-box-more-button';
        more_button.textContent = '···';

        section_header_box.appendChild(section_img_caption);
        section_header_box.appendChild(more_button);

        return section_header_box;
    }

    static createSectionHeaderEvent(section_header, caption_text) {
        const caption_element = section_header.querySelector(`#${CSS.escape(caption_text)}`);
        const content_text = caption_element.innerHTML;

        section_header.addEventListener('mouseenter', e => {
            caption_element.innerHTML = content_text + '<div class="north-east-arrow">' + '&nbsp;' + ' ↗ ' + '</div>';
        });

        section_header.addEventListener('mouseleave', e => {
            section_header.style.backgroundColor = '';            
            caption_element.innerHTML = content_text;
        });
    }

    static createContentPanel(className, content) {
        const panel = document.createElement('div');
        panel.className = className;
       
        if (typeof content === 'string') {
            panel.innerHTML = content;
        } else if (content instanceof Node) {
            panel.appendChild(content);
        } else {
            if (content !== null) {
                console.warn('Unsupported content type : ', content);
            }
        }

        return panel;
    }

    static setupResponsiveViewer(taskbar_element, viewer_element) {
        if (taskbar_element.taskBarElement.dataset.column < 3) {
            console.log(viewer_element.windowElement);
            SiteLibrary.toggleElementMaximize(viewer_element.windowElement, 'taskbar');
            if (viewer_element.isMaximized) viewer_element.isMaximized = false;
            else viewer_element.isMaximized = true;

            history.pushState({ list: viewer_element.id }, '', '');
            window.addEventListener('popstate', (e) => {
                if (!e.state) return;
                if (!e.state?.list) {
                    ViewerWindowProcessRegistry.get('unmount', 'function')?.(
                        viewer_element.windowElement.dataset.group,
                        viewer_element.targetId,
                        viewer_element.id
                    );
                }
            });
        }
    }

    static symbol(type) {
        switch (type) {
            case 'photo' : return '&#128247;&nbsp;';
            case 'video' : return '&#128252;&nbsp;';
            case 'audio' : return '<span style="font-size: 0.7rem;">&#127908&nbsp;</span>';
            case 'text' : return '&#9000;&nbsp;';
            default: return type + ' · ';
        }
    }
}