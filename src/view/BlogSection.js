'use strict';

import { ELEMENT_TYPE, COMMON, VIEWER } from "../modules/common/Constants.js";
import { siteMeta } from "../modules/site/siteMeta.js";
import { SiteLibrary } from "../modules/common/SiteLibrary.js";
import { ViewerWindow } from "../modules/viewerWindow/ViewerWindow.js";
import { shell } from "../modules/shell/Shell.js";
import { Templates } from "../modules/site/Templates.js";
import { ViewerStateManager } from "../modules/viewerWindow/ViewerStateManager.js";

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
            siteMeta.blog.blogSectionHeaderId,
            siteMeta.blog.blogCaptionImgId,
            siteMeta.blog.blogCaptionId,
            'blog_post_list_all_viewer',
            'post-index',
            '라이팅스 (writings) 목록',
            'writings',
            siteMeta.blog.className,
            this.blogService.blogMetaData,
            siteMeta.blog.blogSectionHeaderIcon,
            siteMeta.blog.blogCaptionText,
            siteMeta.blog.blogSectionHeaderIconAlt,
            1, 2, 0
        );

        Templates.createSectionHeaderEvent(blog_section_header, siteMeta.blog.blogCaptionId);

        blog_blog.appendChild(blog_section_header);

        const post_list = this.generateSubjectList(
            'writings',
            'latest-post',
            siteMeta.blog.blogSectionHeaderIcon,
            this.blogService.blogMetaData,
            siteMeta.blog.writringsTitleCharLength, 
            siteMeta.blog.writingsSummaryCharLength, 
            4
        );

        blog_blog.appendChild(post_list);

        return blog_blog;
    }

    createLifelog() {
        const blog_lifelog = document.createElement(ELEMENT_TYPE.DIV); blog_lifelog.id = 'blog-lifelog';

        const lifelog_section_header = this.generateSectionHeader(
            siteMeta.blog.lifelogSectionHeaderId,
            siteMeta.blog.lifelogCaptionImgId,
            siteMeta.blog.lifelogCaptionId,
            'lifelog_post_list_all_viewer',
            'post-index',
            '라이프로그 (lifelog) 목록',
            'lifelog',
            siteMeta.blog.className,
            this.blogService.lifelogMetaData,
            siteMeta.blog.lifelogSectionHeaderIcon,
            siteMeta.blog.lifelogCaptionText,
            siteMeta.blog.lifelogSectionHeaderIconAlt,
            1, 0, 0
        );

        blog_lifelog.appendChild(lifelog_section_header);

        Templates.createSectionHeaderEvent(lifelog_section_header, siteMeta.blog.lifelogCaptionId);

        const lifelog_list = this.generateSubjectList(
            'lifelog',
            'latest-post', 
            siteMeta.blog.lifelogSectionHeaderIcon,
            this.blogService.lifelogMetaData, 
            siteMeta.blog.lifelogTitleCharLength, 
            siteMeta.blog.lifelogSummaryCharLength,
            4
        );

        blog_lifelog.appendChild(lifelog_list);

        return blog_lifelog;
    }

    createArchive() {
        const blog_archive = document.createElement(ELEMENT_TYPE.DIV); blog_archive.id = 'blog-archive';

        const archive_section_header = this.generateSectionHeader(
            siteMeta.blog.archiveSectionHeaderId,
            siteMeta.blog.archiveCaptionImgId,
            siteMeta.blog.archiveCaptionId,
            'archive_list_all_viewer',
            'post-index',
            '아카이브 (archive) 목록',
            'archive',
            siteMeta.blog.className,
            this.blogService.archiveMetaData,
            siteMeta.blog.archiveSectionHeaderIcon,
            siteMeta.blog.archiveCaptionText,
            siteMeta.blog.archiveSectionHeaderIconAlt,
            1, 0, 0
        );

        blog_archive.appendChild(archive_section_header);
        
        Templates.createSectionHeaderEvent(archive_section_header, siteMeta.blog.archiveCaptionId);
        
        const archive_list = this.generateSubjectList(
            'archive',
            'latest-post', 
            siteMeta.blog.archiveSectionHeaderIcon, 
            this.blogService.archiveMetaData, 
            siteMeta.blog.archiveTitleCharLength, 
            siteMeta.blog.archiveSummaryCharLength,
            3
        );

        blog_archive.appendChild(archive_list);

        return blog_archive;        
    }

    createReflection() {
        const blog_reflection = document.createElement(ELEMENT_TYPE.DIV); blog_reflection.id = 'blog-reflection';

        const reflection_section_header = this.generateSectionHeader(
            siteMeta.blog.reflectionSectionHeaderId,
            siteMeta.blog.reflectionCaptionImgId,
            siteMeta.blog.reflectionCaptionId,
            'reflection_post_list_all_viewer',
            'post-index',
            '리플렉션 (reflection) 목록',
            'reflection',
            siteMeta.blog.className,
            this.blogService.reflectionMetaData,
            siteMeta.blog.reflectionSectionHeaderIcon,
            siteMeta.blog.reflectionCaptionText,
            siteMeta.blog.reflectionSectionHeaderIconAlt,
            1, 0, 0
        );

        blog_reflection.appendChild(reflection_section_header);

        Templates.createSectionHeaderEvent(reflection_section_header, siteMeta.blog.reflectionCaptionId);

        const reflection_list = this.generateSubjectList(
            'reflection',
            'latest-post',
            siteMeta.blog.reflectionSectionHeaderIcon, 
            this.blogService.reflectionMetaData, 
            siteMeta.blog.reflectionTitleCharLength, 
            siteMeta.blog.reflectionSummaryCharLength,
            5
        );

        blog_reflection.appendChild(reflection_list);

        return blog_reflection;
    }

    generateSectionHeader(
        section_header_id, img_id, caption_id, viewer_id, post_index_class_name,
        viewer_title_text, blog_type, section_header_class_name, data, icon_path, text, icon_alt,
        title_char_count, summary_char_count, row_count
    ) {
        const section_header = Templates.createSectionHeader(
            section_header_id, img_id, caption_id,
            section_header_class_name, icon_path, text, icon_alt
        );

        section_header.addEventListener('click',  e => {
            this.onSectionHeaderClick (
                e, blog_type, viewer_id, icon_path, viewer_title_text,
                this.generateSubjectList(
                    blog_type, post_index_class_name, icon_path, data,
                    title_char_count, summary_char_count, row_count
                ),
                null,
                COMMON.COPYRIGHT
            );
        });

        return section_header;
    }

    onSectionHeaderClick(e, blog_type, id, section_icon, title, header, contents, footer) {
        e.preventDefault();

        const contents_id = COMMON.VIEWER_PREFIX + id;
       
        if (document.getElementById(contents_id)) {
            ViewerStateManager.bringToFront(document.getElementById(contents_id));
            return; 
        }

        const width = window.innerWidth * VIEWER.LIST_RATIO_MIDDLE;        
        const left = Math.min(window.innerWidth - width, window.innerWidth); // 화면 안쪽으로 제한

        try {
            const viewer = new ViewerWindow();
            viewer.configureWindow(
                contents_id,
                22 + 'rem',
                44 + 'rem',
                SiteLibrary.pxToRem(((window.innerHeight - SiteLibrary.remToPx('44')) / 2)) + 'rem',
                SiteLibrary.pxToRem(left) + 'rem',
                'viewer',
                'blog',
                section_icon,
                title,
                Templates.createContentPanel('blog-header-panel', header),
                contents,
                Templates.createContentPanel('blog-footer-panel', footer)
            );

            viewer.targetId = COMMON.TASKBAR_PREFIX + id;
            viewer.show();
            
            shell.mountTaskItem(blog_type, viewer.targetId, viewer.id, section_icon, title);
        } catch(error) {
            console.warn('Section Header Event : ', error);
        } finally {
            const element = document.getElementById(contents_id);
            element.dataset.group = blog_type;

            ViewerStateManager.stateLog(element);
        }
    }

    generateSubjectList(
        type, class_name, section_icon, data, 
        title_char_count, summary_char_count, row_count
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

            const meta_span = document.createElement('span');
            meta_span.className = 'meta';
            meta_span.textContent = value.type + ' · ' + key + region;

            frag.appendChild(meta_span);

            const title = document.createElement('div');
            title.className = 'title';
            title.textContent = SiteLibrary.truncateText(value.title, title_char_count);

            const summary = document.createElement('span');
            summary.className = 'summary';
            summary.textContent = SiteLibrary.truncateText(value.summary, summary_char_count);

            const a =  document.createElement('a');
            a.href = '#';
            a.appendChild(title);
            a.appendChild(summary);
                        
            this.generatePostEvent(
                type, data, a, key, section_icon, value.title, 
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

    generatePostEvent(type, data, element, id, section_icon, title, header, content_path, footer) {
        element.addEventListener('mouseenter', e => { this.prefetchPost(element, content_path); }); 
        element.addEventListener('click',  e => {
            let viewer_width = '44rem';
            if (type === 'lifelog') { viewer_width = data.get(id)['width']; }

            this.onPostClick (
                e, data.get(id)['content_id'], type, viewer_width, section_icon,
                title, header,content_path, footer
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

        const contents_id = COMMON.VIEWER_PREFIX + id;
       
        if (document.getElementById(contents_id)) {
            ViewerStateManager.bringToFront(document.getElementById(contents_id));
            return; 
        }

        let left = (window.innerWidth * VIEWER.LIST_RATIO_MIDDLE);
        if (blog_type === 'lifelog') {
            left = (window.innerWidth 
                - ((window.innerWidth * VIEWER.LIST_RATIO_MIDDLE) 
                + (SiteLibrary.remToPx(viewer_width))
            ));
        }

        try {
            const viewer = new ViewerWindow();
            viewer.configureWindow(
                contents_id,
                viewer_width,
                '36rem',
                SiteLibrary.pxToRem(((window.innerHeight - SiteLibrary.remToPx('36')) / 2)) + 'rem',
                SiteLibrary.pxToRem(((window.innerWidth - SiteLibrary.remToPx('44')) / 2)) + 'rem',
                'viewer',
                'blog',
                section_icon,
                title,
                header,
                Templates.createContentPanel(
                    'blog-content-panel', 
                    await this.blogService.loadContentData(content_path)
                ),
                Templates.createContentPanel('blog-footer-panel', footer)
            );

            viewer.targetId = COMMON.TASKBAR_PREFIX + id;
            viewer.show();
            
            shell.mountTaskItem(blog_type, viewer.targetId, viewer.id, section_icon, title);
        } catch(error) {
            console.warn('Blog Post Event : ', error);
        } finally {
            const element = document.getElementById(contents_id);
            element.dataset.group = blog_type;

            ViewerStateManager.stateLog(element);
        }
    }
}