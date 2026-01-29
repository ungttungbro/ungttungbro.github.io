import { 
    experienceData, 
    worksAcademicResearchData, 
    worksTeachingActivityData, 
    worksPublishData, 
    worksProjectsData, 
    worksPersonalProjectsData,
    linksOldPageData,
    linksThanksToData
} from '../data/data.js';

import { siteMap } from '../js/siteMap.js';

import { 
    createNavigationItems, 
    createSectionHeader,
    signatureComment,
    scrollIndicator
} from '../js/siteTemplate.js';

import {
    createExperience,
    createAcademicResearch,
    createTeachingActivity,
    createPublish,
    createProjects,
    createPersonalProjects
} from '../sections/aboutSectionTemplate.js';

import {
    linksOldMyWeb,
    linksThanksTo
} from '../sections/linksSectionTemplate.js';

const headerLayoutElement = function(url, titleTextHTML, commentTextHTML) {
    const el = document.createElement('div');

    el.appendChild(createNavigationItemsElement());
    el.appendChild(createSignatureCommentElement(url, titleTextHTML, commentTextHTML));

    return el;
};

const createNavigationItemsElement = function() {
    const navigationEl = document.createElement('nav');
    navigationEl.id = 'navigation';

    navigationEl.appendChild(createNavigationItems(
        './images/logo.png', 
        siteMap, 
        'index.html',
        '#gallery', 
        'links.html', 
        'youngwan.jang@gmail.com'
    ));

    return navigationEl;
};

const createSignatureCommentElement = function(url, titleTextHTML, commentTextHTML) {
    const signatureCommentHTML = signatureComment(titleTextHTML, commentTextHTML);
    const signatureCommentEl = document.createElement('div');

    signatureCommentEl.id = 'signature-comment';
    signatureCommentEl.innerHTML = signatureCommentHTML;

    const scrollIndicatorEl = scrollIndicator(url);
    signatureCommentEl.appendChild(scrollIndicatorEl);

    return signatureCommentEl;
};

const createExperienceElement = function() {
    const sectionHeaderHTML = createSectionHeader('Experience');
    document.getElementById('experience').innerHTML += sectionHeaderHTML;
   
    const experienceEl = document.createElement('div');
    experienceEl.id = 'experience-timeline';

    experienceEl.innerHTML +='<img id="profile-photo" src="./images/profile-photo.jpg" alt="증명사진">';

    const experienceHTML = createExperience(experienceData);
    experienceEl.innerHTML += experienceHTML;

    return experienceEl;    
};

const createWorksElement = function() {
    const sectionHeaderHTML = createSectionHeader('Works');
    document.getElementById('works').innerHTML += sectionHeaderHTML;

    const worksEl = document.createElement('div');
    worksEl.id = 'works-items';

    const work_function_list = [
        [ 'Academic_Research', 'Academic & Research' ],
        [ 'Teaching_Activity_Contents', 'Teaching Activities' ],
        [ 'Publish_Contents', 'Publish' ],
        [ 'Projects', 'Projects' ],
        [ 'Personal_Projects', 'Personal Projects' ]
    ];

    let html = '';
    for (let i = 0; i < work_function_list.length; i++) {
        html += '<div class="works-item-title">'
                + '<a href="#" class="works-toggle" data-target="' + work_function_list[i][0] + '">'
                    + work_function_list[i][1]
                + '</a>'
            + '</div>'
            + '<hr>'
            + '<div id="' + work_function_list[i][0] + '" class="works-toggle-contents">';

            if (work_function_list[i][0].trim() === 'Academic_Research'.trim()) {
               html += createAcademicResearch(worksAcademicResearchData);
            }

            if (work_function_list[i][0].trim() === 'Teaching_Activity_Contents'.trim()) {
               html += createTeachingActivity(worksTeachingActivityData);
            }

            if (work_function_list[i][0].trim() === 'Publish_Contents'.trim()) {
               html += createPublish(worksPublishData);
            }

            if (work_function_list[i][0].trim() === 'Projects'.trim()) {
               html += createProjects(worksProjectsData);
            }

            if (work_function_list[i][0].trim() === 'Personal_Projects'.trim()) {
               html += createPersonalProjects(worksPersonalProjectsData);
            }

            html += '</div>';
    }
    
    worksEl.innerHTML += html;

    return worksEl;
};

const linksLayoutElement = function() {
    const linksReference = document.createElement('div');
    linksReference.id = 'links-references';

    const sectionHeaderHTML = createSectionHeader('Links (References)');
    document.getElementById('links').innerHTML += sectionHeaderHTML;

    const linksEl = document.createElement('div');
    linksEl.innerHTML = createlinksElement();

    return linksEl;
}

const createlinksElement = function() {
    var html = '<div id="links-items">'
                + '<div class="links-item-title">'
                    + '<b>Old My Web</b>'
                + '</div>'
                + '<hr>'
                + '<div id="links_item_old_web">'
                    + linksOldMyWeb(linksOldPageData)
                + '</div>'            
                + '<div class="links-item-title">'
                    + '<b>Thanks to..</b>'
                + '</div>'
                + '<hr>'
                + '<div id="links_item_thanks_to">'
                    + linksThanksTo(linksThanksToData)          
                + '</div>'
            + '</div>';
            
    return html;
};

/* 기능에 대한 부분은 JQuery로 구현함... */
$(function () {
    let anchor_offset = 0;

    function adjustAnchorOffset() {
        anchor_offset = $('#navigation').outerHeight(); // fixed header
        if (location.hash) {
            let $target = $(location.hash);
            if ($target.length) {
                setTimeout(function () {
                    $('html, body').scrollTop(
                        $target.offset().top - anchor_offset
                    );
                }, 0);
            }
        }
    }

    $(window).on('load', function () {
        adjustAnchorOffset();
        $('#about').hide();
        $('#links').hide();
        $('footer').hide();
    });
   
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        
        if (scrollTop === 0) {
            $('#about').hide();
            $('#links').hide();
            $('footer').hide();
            $('#about-link').removeClass('active');
        }
    });

    $(window).on('resize', function () {
        adjustAnchorOffset();
    });


    $('.works-toggle').on('click', function (e) {
        e.preventDefault();

        let $btn = $(this);
        let targetId = $btn.data('target');
        let $target = $('#' + targetId);

        // 다른 패널 닫기
        $('.works-toggle-contents').not($target).slideUp(200);

        // 현재 패널 토글
        $target.stop(true, true).slideToggle(200, function () {
            // 애니메이션 끝난 후 스크롤
            $('html, body').animate({
                scrollTop: $btn.offset().top - anchor_offset
            }, 800);
        });
    });

    $('#navigation-items a, #signature-comment a').on('click', function (e) {
        let href = $(this).attr('href');

        if (!href || href.charAt(0) !== '#') return;

        e.preventDefault();

        let $target = $(href);
        if (!$target.length) return;

        $('#about').show();
        $('#links').show();
        $('footer').show();
        $('#about-link').addClass('active');       

        $('html, body').animate({
            scrollTop: $target.offset().top - anchor_offset
        }, 800);
    });
});

export { headerLayoutElement };
export { createExperienceElement };
export { createWorksElement };
export { linksLayoutElement };