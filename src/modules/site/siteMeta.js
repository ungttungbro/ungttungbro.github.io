export const siteMeta = Object.freeze({
    about: Object.freeze({
        photoZoneId: 'photo-zone',
        profileBoxId: 'profile',
        specsId: 'specs',
        contactsId: 'contacts',
        thumbnailsId: 'thumbnails',
        photoClassName: 'about-photo',
        thumbnailClassName: 'profile-thumbnail',
        photoImgAlt: 'about photo image',
        thumbnailImgAlt: 'profile thumbnail image'
    }),


    blog: Object.freeze({
        blogSectionHeaderId: 'blog_title',
        blogCaptionImgId: 'blog-caption-img',
        blogCaptionId: 'blog-caption-text',
        blogCaptionText: '라이팅스 (writings)',
        blogSectionHeaderIcon: './assets/icons/blog.png',
        blogSectionHeaderIconAlt: 'blog Section Header Icon',

        lifelogSectionHeaderId: 'lifelog_title',
        lifelogCaptionImgId: 'lifelog-caption-img',
        lifelogCaptionId: 'lifelog-caption-text',
        lifelogSectionHeaderIcon: './assets/icons/lifelog.png',
        lifelogCaptionText: '라이프로그 (lifelog)',
        lifelogSectionHeaderIconAlt: 'lifelog Section Header Icon',

        archiveSectionHeaderId: 'archive_title',
        archiveCaptionImgId: 'archive-caption-img',
        archiveCaptionId: 'archive-caption-text',
        archiveCaptionText: '아카이브 (archive)',
        archiveSectionHeaderIcon: './assets/icons/archive.png',        
        archiveSectionHeaderIconAlt: 'archive Section Header Icon',

        reflectionHeaderId: 'reflection_title',        
        reflectionCaptionImgId: 'reflection-caption-img',
        reflectionCaptionId: 'reflection-caption-text',
        reflectionCaptionText: '리플렉션 (reflection)',
        reflectionSectionHeaderIcon: './assets/icons/reflection.png',        
        reflectionSectionHeaderIconAlt: 'reflection Section Header Icon',
        
        className: 'title_box',
    }),


    photolog: Object.freeze({
        sectionHeaderId: 'photolog_title',
        sectionHeaderIcon: './assets/icons/photographer.png',
        sectionHeaderIconAlt: 'Photolog Icon',
        captionImgId: 'photolog-caption-img',
        captionId: 'photolog-caption-text',
        className: 'title_box',
        text: '포토로그 (photolog)',
        teaserListClassName: 'teaser-list',
        teaserClassName: 'teaser-figure',
        thumbnailClassName: 'photolog-thumbnail',
        thumbnailImgAlt: 'photolog-thumbnail-image',
        photoClassName: 'photolog-photo',
        photoImgAlt: 'photo Image'
    }),

    
    links: Object.freeze({
        sectionHeaderId: 'links_title',
        sectionHeaderIcon: './assets/icons/bookmark.png',
        sectionHeaderIconAlt: 'links Title Icon',
        captionId: 'links-caption-text',
        captionImgId: 'links-caption-img', 
        className: 'title_box',
        text: '링크 (references)',
        linkListId: 'links_list',
        linkItemListClassName: 'links_item_list'
    }),

    viewer: Object.freeze({
        writingsWidth: 650,
        writingsListWidth: 290,
        writingsPortraitWidth: 500,

        lifelogWidth: 450,
        lifelogListWidth: 290,
        lifelogPortraitWidth: 500,

        archiveWidth: 450,
        archiveListWidth: 290,
        archivePortraitWidth: 500,

        reflectionWidth: 450,
        reflectionListWidth: 290,
        reflectionPortraitWidth: 500
    })
});