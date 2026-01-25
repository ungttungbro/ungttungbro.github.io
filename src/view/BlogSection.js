'use strict';

import { ELEMENT_TYPE, COMMON, VIEWER } from "../modules/common/Constants.js";
import { siteMap } from "../modules/site/siteMap.js";
import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { ViewerWindow } from "../modules/shell/ViewerWindow.js";
import { taskbar } from "../modules/shell/TaskBar.js";
import { Templates } from "../modules/site/Templates.js";

export class BlogSection {
    constructor(blog_service) {
        this.blogService = blog_service;
        this.initialize();
    }

    async initialize() {
        const section_id = this.blogService.serviceName;
        this.blogSectionElement = document.getElementById(section_id);
        this.reflectionSectionElement = document.getElementById('reflection');
    }

    show() {
        try {
            this.renderBlogGrid();
            this.renderReflection();
        } catch (error) {
            console.log('[ Blog Section ] : ', error);
        }
    }
    
    renderBlogGrid() {
        const blog_grid = SiteLibrary.addChildElement(ELEMENT_TYPE.DIV, this.blogSectionElement, 'blog-grid');

        const blog_blog = this.createBlog();
        blog_grid.appendChild(blog_blog);

        const blog_section_container = SiteLibrary.addChildElement(
            ELEMENT_TYPE.DIV, 
            blog_grid, 
            'blog_section_container'
        );

        const blog_lifelog = this.createLifelog();
        const blog_archive = this.createArchive();

        blog_section_container.appendChild(blog_lifelog);
        blog_section_container.appendChild(blog_archive);

        blog_grid.appendChild(blog_section_container);
    }

    renderReflection() {
        const reflection = this.createReflection();
        this.reflectionSectionElement.appendChild(reflection);
    }

    createBlog() {
        const blog_blog = document.createElement(ELEMENT_TYPE.DIV); blog_blog.id = 'blog-blog';

        const blog_section_header = this.generateSectionHeader(
            siteMap.blog.blogSectionHeaderId,
            siteMap.blog.blogCaptionImgId,
            siteMap.blog.blogCaptionId,
            'blog_post_list_all_viewer',
            'post-index',
            '라이팅스 (writings) 목록',
            'blog',
            siteMap.blog.className,
            this.blogService.blogMetaData,
            siteMap.blog.blogSectionHeaderIcon,
            siteMap.blog.blogCaptionText,
            siteMap.blog.blogSectionHeaderIconAlt,
            24, 40, 0
        );

        Templates.createSectionHeaderEvent(blog_section_header, siteMap.blog.blogCaptionId);

        blog_blog.appendChild(blog_section_header);

        const post_list = this.generateSubjectList(
            'blog',
            'latest-post',
            siteMap.blog.blogSectionHeaderIcon,
            this.blogService.blogMetaData,
            50, 106, 4
        );

        blog_blog.appendChild(post_list);

        return blog_blog;
    }

    createLifelog() {
        const blog_lifelog = document.createElement(ELEMENT_TYPE.DIV); blog_lifelog.id = 'blog-lifelog';

        const lifelog_section_header = this.generateSectionHeader(
            siteMap.blog.lifelogSectionHeaderId,
            siteMap.blog.lifelogCaptionImgId,
            siteMap.blog.lifelogCaptionId,
            'lifelog_post_list_all_viewer',
            'post-index',
            '라이프로그 (lifelog) 목록',
            'lifelog',
            siteMap.blog.className,
            this.blogService.lifelogMetaData,
            siteMap.blog.lifelogSectionHeaderIcon,
            siteMap.blog.lifelogCaptionText,
            siteMap.blog.lifelogSectionHeaderIconAlt,
            26, 0, 0
        );

        blog_lifelog.appendChild(lifelog_section_header);

        Templates.createSectionHeaderEvent(lifelog_section_header, siteMap.blog.lifelogCaptionId);

        const lifelog_list = this.generateSubjectList(
            'lifelog',
            'latest-post', 
            siteMap.blog.lifelogSectionHeaderIcon,
            this.blogService.lifelogMetaData, 
            32, 0, 5
        );

        blog_lifelog.appendChild(lifelog_list);

        return blog_lifelog;
    }

    createArchive() {
        const blog_archive = document.createElement(ELEMENT_TYPE.DIV); blog_archive.id = 'blog-archive';

        const archive_section_header = this.generateSectionHeader(
            siteMap.blog.archiveSectionHeaderId,
            siteMap.blog.archiveCaptionImgId,
            siteMap.blog.archiveCaptionId,
            'archive_list_all_viewer',
            'post-index',
            '아카이브 (archive) 목록',
            'archive',
            siteMap.blog.className,
            this.blogService.archiveMetaData,
            siteMap.blog.archiveSectionHeaderIcon,
            siteMap.blog.archiveCaptionText,
            siteMap.blog.archiveSectionHeaderIconAlt,
            26, 0, 0
        );

        blog_archive.appendChild(archive_section_header);
        
        Templates.createSectionHeaderEvent(archive_section_header, siteMap.blog.archiveCaptionId);
        
        const archive_list = this.generateSubjectList(
            'archive',
            'latest-post', 
            siteMap.blog.archiveSectionHeaderIcon, 
            this.blogService.archiveMetaData, 
            40, 0, 3
        );

        blog_archive.appendChild(archive_list);

        return blog_archive;        
    }

    createReflection() {
        const blog_reflection = document.createElement(ELEMENT_TYPE.DIV); blog_reflection.id = 'blog-reflection';

        const reflection_section_header = this.generateSectionHeader(
            siteMap.blog.reflectionSectionHeaderId,
            siteMap.blog.reflectionCaptionImgId,
            siteMap.blog.reflectionCaptionId,
            'reflection_post_list_all_viewer',
            'post-index',
            '리플렉션 (reflection) 목록',
            'reflection',
            siteMap.blog.className,
            this.blogService.reflectionMetaData,
            siteMap.blog.reflectionSectionHeaderIcon,
            siteMap.blog.reflectionCaptionText,
            siteMap.blog.reflectionSectionHeaderIconAlt,
            24, 0, 0
        );

        blog_reflection.appendChild(reflection_section_header);

        Templates.createSectionHeaderEvent(reflection_section_header, siteMap.blog.reflectionCaptionId);

        const reflection_list = this.generateSubjectList(
            'reflection',
            'latest-post',
            siteMap.blog.reflectionSectionHeaderIcon, 
            this.blogService.reflectionMetaData, 
            40, 0, 7
        );

        blog_reflection.appendChild(reflection_list);

        return blog_reflection;
    }

    generateSectionHeader(
        section_header_id, img_id, caption_id, viewer_id, post_index_class_name,
        viewer_title_text, blog_type, section_header_class_name, data, icon_path, text, icon_alt,
        title_truncate_length, summary_truncate_length, row_count
    ) {
        const section_header = Templates.createSectionHeader(
            section_header_id, img_id, caption_id,
            section_header_class_name, icon_path, text, icon_alt
        );

        section_header.addEventListener('click',  e => {
            this.onSectionHeaderClick (
                e, viewer_id, icon_path, viewer_title_text,
                this.generateSubjectList(
                    blog_type, post_index_class_name, icon_path, data,
                    title_truncate_length, summary_truncate_length, row_count
                ),
                null,
                COMMON.COPYRIGHT
            );
        });

        return section_header;
    }

    onSectionHeaderClick(e, id, section_icon, title, header, contents, footer) {
        e.preventDefault();

        if (document.getElementById(id)) { return; }

        const height_offset = taskbar.taskBarElement.getBoundingClientRect().bottom;

        const width = window.innerWidth * VIEWER.LIST_RATIO_MIDDLE;
        const height = window.innerHeight - height_offset;
        const top = height_offset;
        const left = Math.min(window.innerWidth - width, window.innerWidth); // 화면 안쪽으로 제한

        try {
            const viewer = new ViewerWindow();
            viewer.configureWindow(
                id,
                width + 'px',
                height + 'px',
                top + 'px',
                left + 'px',
                'viewer',
                'blog',
                section_icon,
                title,
                this.generateContentPanel('blog-header-panel', header),
                contents,
                this.generateContentPanel('blog-footer-panel', footer)
            );

            viewer.targetId = id + '_task_bar_item';
            viewer.show();
            
            taskbar.mount(viewer.targetId, viewer.id, section_icon, title);
        } catch(error) {
            console.warn('Section Header Event : ', error);
        }
    }

    generateSubjectList(
        type, class_name, section_icon, data, 
        title_truncate_length, summary_truncate_length, row_count
    ) {
        const frag = document.createDocumentFragment();

        const subject_list = document.createElement(ELEMENT_TYPE.DIV);
        subject_list.className = class_name;

        const iterator = data.entries();
        let result = iterator.next();

        let index = 0;
        while (!result.done) {
            const [key, value] = result.value;

            let region = '';
            if (type === 'lifelog') { region = ' (' + value.region + ')'; }

            const subject = 
                '<div class="meta">' 
                    + key + region + ' · ' + value.type
                + '</div>'                
                + '<div class="title">' 
                    + SiteLibrary.truncateText(value.title, title_truncate_length) 
                + '</div>'                
                + '<div class="summary">' 
                    + SiteLibrary.truncateText(value.summary, summary_truncate_length) 
                + '</div>';

            const a =  document.createElement('a');
            a.href = '#';
            a.innerHTML = subject;
            
            this.generatePostEvent(
                type, data, a, encodeURIComponent(key),section_icon, value.title, 
                null, value.content_path,COMMON.COPYRIGHT
            );

            frag.appendChild(a);

            const nextResult = iterator.next();
            if (row_count > 0) {
                if (!nextResult.done && index < (row_count - 1)) { frag.appendChild(document.createElement('hr')); }
                if (index >= (row_count - 1)) { break; }
            } else {
                if (!nextResult.done) {
                    frag.appendChild(document.createElement('hr'));
                }
            }

            result = nextResult;

            index++;
        }

        subject_list.appendChild(frag);

        return subject_list;
    }

    subjectListSpec(type) {
        let list_spec = {
            title: '',
            list_viewer_id: '',
            class_name: 'post-index'
        };

        if(type === 'blog') {
            list_spec.title = '라이팅스 (writings) 목록';
            list_spec.list_viewer_id = 'blog_post_list_all_viewer';            
        } else if (type === 'lifelog') {
            list_spec.title = '라이프로그 (lifelog) 목록';
            list_spec.list_viewer_id = 'lifelog_post_list_all_viewer';                      
        } else if (type === 'archive') {
            list_spec.title = '아카이브 (archive) 목록';
            list_spec.list_viewer_id = 'archive_post_list_all_viewer';            
        } else if (type === 'reflection') {
            list_spec.title = '리플렉션 (reflection) 목록';
            list_spec.list_viewer_id = 'reflection_post_list_all_viewer';            
        } else {
            list_spec.title = '';
            list_spec.list_viewer_id = '';
            list_spec.class_name = '';
        }

        return list_spec;
    }

    generatePostEvent(type, data, element, id, section_icon, title, header, content_path, footer) {
        element.addEventListener('mouseenter', e => { this.prefetchPost(element, content_path); }); 
        element.addEventListener('click',  e => {            
            let viewer_width = (window.innerWidth - (window.innerWidth * VIEWER.LIST_RATIO_MIDDLE)) + 'px';     

            if (type === 'lifelog') { viewer_width = data.get(id)['width']; }

            const spec = this.subjectListSpec(type);

            this.onPostClick (
                e, id, type, viewer_width, section_icon,
                title, header,content_path, footer
            );

            this.onSectionHeaderClick (
                e,
                spec.list_viewer_id,
                section_icon,
                spec.title,
                this.generateSubjectList(type, spec.class_name, section_icon, data, 26, 44, 0),
                null,
                COMMON.COPYRIGHT
            );
        });
    }
    
    prefetchPost(element, content_path) {
        if (element.dataset.prefetched) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = content_path;
        link.as = 'document';

        document.head.appendChild(link);
        element.dataset.prefetched = 'true';
    }

    async onPostClick(e, id, blog_type, viewer_width, section_icon, title, header, content_path, footer) {
        e.preventDefault();
       
        if (document.getElementById(id)) { return; }

        let left = 0;
        if (blog_type === 'lifelog') {
            left = (window.innerWidth 
                    - ((window.innerWidth * VIEWER.LIST_RATIO_MIDDLE) 
                    + (SiteLibrary.remToPx(viewer_width))
                )) + 'px';
        }

        const height_offset = taskbar.taskBarElement.getBoundingClientRect().bottom;

        try {
            const viewer = new ViewerWindow();
            viewer.configureWindow(
                id,
                viewer_width,
                (window.innerHeight - height_offset) + 'px',
                height_offset + 'px',
                left,
                'viewer',
                'blog',
                section_icon,
                title,
                header,
                this.generateContentPanel(
                    'blog-content-panel', 
                    await this.blogService.loadContentData(content_path)
                ),
                this.generateContentPanel('blog-footer-panel', COMMON.COPYRIGHT)
            );

            viewer.targetId = id + '_task_bar_item';
            viewer.show();
            
            taskbar.mount(viewer.targetId, viewer.id, section_icon, title);
        } catch(error) {
            console.warn('Blog Post Event : ', error);
        }
    }

    generateContentPanel(className, content) {
        const panel = document.createElement(ELEMENT_TYPE.DIV);
        panel.className = className;
       
        if (typeof content === 'string') {
            panel.innerHTML = content;
        } else if (content instanceof Node) {
            panel.appendChild(content);
        } else {
            console.warn('Unsupported content type : ', content);
        }

        return panel;
    }
}