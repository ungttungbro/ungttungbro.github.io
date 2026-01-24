export const siteMap = Object.freeze({
    about: Object.freeze({
        photoZoneId: 'photo_zone',
        profileBoxId: 'profile',
        specsId: 'specs',
        contactsId: 'contacts',
        thumbnailsId: 'thumbnails',
        photoClassName: 'about_photo',
        thumbnailClassName: 'profile_thumbnail',
        photoImgAlt: 'about_photo_image',
        thumbnailImgAlt: 'profile_thumbnail_image'
    }),


    blog: Object.freeze({
        blogSectionHeaderId: 'blog_title',
        lifelogSectionHeaderId: 'lifelog_title',
        archiveSectionHeaderId: 'archive_title',
        reflectionHeaderId: 'reflection_title',
        blogCaptionImgId: 'blog-caption-img',
        lifelogCaptionImgId: 'lifelog-caption-img',
        archiveCaptionImgId: 'archive-caption-img',
        reflectionCaptionImgId: 'reflection-caption-img',
        blogCaptionId: 'blog-caption-text',
        lifelogCaptionId: 'lifelog-caption-text',
        archiveCaptionId: 'archive-caption-text',
        reflectionCaptionId: 'reflection-caption-text',
        blogSectionHeaderIcon: './assets/icons/blog.png',
        lifelogSectionHeaderIcon: './assets/icons/lifelog.png',
        archiveSectionHeaderIcon: './assets/icons/archive.png',
        reflectionSectionHeaderIcon: './assets/icons/reflection.png',
        className: 'title_box',
        blogCaptionText: '라이팅스 (writings)',
        lifelogCaptionText: '라이프로그 (lifelog)',
        archiveCaptionText: '아카이브 (archive)',
        reflectionCaptionText: '리플렉션 (reflection)',
        blogSectionHeaderIconAlt: 'blog Section Header Icon',
        lifelogSectionHeaderIconAlt: 'lifelog Section Header Icon',
        archiveSectionHeaderIconAlt: 'archive Section Header Icon',
        archiveSectionHeaderIconAlt: 'reflection Section Header Icon'
    }),


    photolog: Object.freeze({
        sectionHeaderId: 'photolog_title',
        sectionHeaderIcon: './assets/icons/photographer.png',
        sectionHeaderIconAlt: 'Photolog Icon',
        captionImgId: 'photolog-caption-img',
        captionId: 'photolog-caption-text',
        className: 'title_box',
        text: '포토로그 (photolog)',
        teaserListClassName: 'teaser_list',
        teaserClassName: 'teaser_figure',
        thumbnailClassName: 'photolog_thumbnail',
        thumbnailImgAlt: 'photolog_thumbnail_image',
        photoClassName: 'photolog_photo',
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
    })
});