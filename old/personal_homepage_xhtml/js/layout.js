function buildExperienceLayoutHTML() {
    var html = '<img id="career_photo_me" src="./images/photo_me.jpg" alt="증명사진" />'
            + buildExperienceHTML(experienceData);
    
    return html;
}

function buildWorksLayoutHTML() {
    var work_function_list = [
        [ 'Academic_Research', 'Academic & Research' ],
        [ 'Teaching_Activity_Contents', 'Teaching Activities' ],
        [ 'Publish_Contents', 'Publish' ],
        [ 'Projects', 'Projects' ],
        [ 'Personal_Projects', 'Personal Projects' ]
    ];

    var html = '';
    for (var i = 0; i < work_function_list.length; i++) {
        html += '<div class="works_item_title">'
                + '<a href="#" class="works_toggle" data-target="' + work_function_list[i][0] + '">'
                    + '<b>' + work_function_list[i][1] + '</b>'
                + '</a>'
            + '</div>'
            + '<hr style="border: 2px solid #718178;"/>'
            + '<div id="' + work_function_list[i][0] + '" class="works_toggle_contents">';

            if (work_function_list[i][0].trim() === 'Academic_Research'.trim()) {
               html += buildWorksAcademicResearchHTML(worksAcademicResearchData);
            }

            if (work_function_list[i][0].trim() === 'Teaching_Activity_Contents'.trim()) {
               html += buildWorksTeachingActivityHTML(worksTeachingActivityData);
            }

            if (work_function_list[i][0].trim() === 'Publish_Contents'.trim()) {
               html += buildWorksPublishHTML(worksPublishData);
            }

            if (work_function_list[i][0].trim() === 'Projects'.trim()) {
               html += buildWorksProjectsHTML(worksProjectsData);
            }

            if (work_function_list[i][0].trim() === 'Personal_Projects'.trim()) {
               html += buildWorksPersonalProjectsHTML(worksPersonalProjectsData);
            }

            html += '</div>';
    }

    return html;
}

function buildSkillsLayoutHTML() {
    var html = '<div class="contents_sub_title_text">'
                 + '<b>Instructional Skills</b>'
                + '</div>'
                + '<hr style="border: 2px solid #718178;"/>'
                + '<div id="Skills_Intructional">'
                    + buildSkillsInstructionalHTML(skillsInstructionalData)
                + '</div>'
                + '<div class="contents_sub_title_text">'
                    + '<b>Programming Skills</b>'
                + '</div>'
                + '<hr style="border: 2px solid #718178;"/>'
                + '<div id="skills_language_icon_div">'
                    + buildSkillsLanguageIconHTML(skillsProgrammingData)
                +'</div>';
    
    return html;
}


function buildGalleryLayoutHTML() {
    return buildGalleryHTML(photoGalleryData);
}


function buildLinksLayoutHTML() {
    var html = '<div class="contents_sub_title_text">'
                + '<b>Old My Web</b>'
            + '</div>'
            + '<hr style="border: 2px solid #718178;"/>'
            + '<div id="links_item_old_web">'
                + buildLinksOldMyWebHTML(linksOldPageData)
            +'</div>'
            + '<br>'
            + '<div class="contents_sub_title_text">'
                + '<b>Thanks to..</b>'
            + '</div>'
            + '<hr style="border: 2px solid #718178;"/>'
            + '<div id="links_item_thanks_to">'
                + buildLinksThanksTo(linksThanksToData)          
            + '</div>';
            
    return html;
}


function buildExperienceHTML(data) {
    var item = '';
    var url = '';
    for (var i = 0; i < data.length; i++) {
        var year = data[i][0];
        if (i > 0 && data[i][0] === data[i-1][0]) {
            year = '&nbsp;';
        }

        if (data[i][3]) {
            url = '<a href="' + data[i][3] + '" ' 
                + 'onclick="window.open(this.href); return false;">'
                + data[i][1] + '</a>';
        } else {
            url = data[i][1];
        }

        item += '<div class="experience_timeline_item">'
                + '<div class="year">' + year + '</div>'
                + '<div class="content">'
                    + '<b>' + url + '</b>' + data[i][2]
                + '</div>'
              + '</div>';
    }

    return item;
}

function buildWorksAcademicResearchHTML(data) {
    var item = data[0];

    item += '<div id="academic_research_photos">';

    for (var i = 1; i < data.length; i++) {
        item +='<img class="' + 'academic_research_photo' +'" '
                + 'src="' + data[i] 
                + ' "alt="' + 'academic_research' + '"/>';
    }

    item += '</div>';
    
    return item;
}

function buildWorksTeachingActivityHTML(data) {
    var item = data[0];

    item += '<div id="teaching_activity_photos">';

    for (var i = 1; i < data.length; i++) {
        item +='<img class="' + 'teaching_activity_photo' +'" '
                + 'src="' + data[i] 
                + ' "alt="' + 'Teaching Activities' + '"/>';
    }

    item += '</div>';
    
    return item;
}

function buildWorksPublishHTML(data) {
    var item = '';

    for (var i = 0; i < data.length; i++) {
        item += '<p>' + '<b>'
                + '<a href="'+ data[i][1] + '" ' 
                    + 'onclick="' + 'window.open(this.href); return false;' + '"> ' 
                    + data[i][0] + '</a>' + '</b>' + '</p>'
                +'<ul>'
                    + '<li>' + data[i][2] + '</li>'
                    + '<li>' + data[i][3] + '</li>'
                    + '<li>' + data[i][4] + '</li>'
                    + '<li>' + data[i][5] + '</li>'
                +'</ul>';

        if (i + 1 < data.length)
            item += '<hr/>';
    }

    return item;
}

function buildWorksProjectsHTML(data) {
    var item = '';

    for (var i = 0; i < data.length; i++) {
        item += '<p>' + '<b>' + data[i][0] + '</b>' + '</p>'
                + '<ul>'
                    + '<li>' + data[i][1] + '</li>'
                    + '<li>' + data[i][2] + '</li>'
                    + '<li>' + data[i][3] + '</li>'
                    + '<li>' + data[i][4] + '</li>'
                + '</ul>';
        
        if (i + 1 < data.length)
            item += '<hr/>';
    }

    return item;
}

function buildWorksPersonalProjectsHTML(data) {
    var item = '';

    for (var i = 0; i < data.length; i++) {
        item += '<div class="works_personal_project_item">'
                + '<img class="' + 'works_personal_project_image' + '" '
                + 'src="' + data[i][1] + '" '
                + 'alt="' + data[i][0] + '"' + '/>'              
                + '<b>' + data[i][0] + '</b>'
                + '<br/>' + '- ' + data[i][2]
                + '<br/>' + '- ' + data[i][3]
                + '<br/>' + '- ' + data[i][4]
                + '<hr/>'
            + '</div>'
    }

    return item;
}

function buildSkillsInstructionalHTML(data) {
    var item = '';

    item += '<ul>';

    for (var i = 0; i < data.length; i++) {
        item += '<li>' + '<b>' + data[i][0] + ' : ' + '</b>'  + data[i][1] + '</li>';
    }

    item += '</ul>'
          + '<br/>';

    return item;
}

function buildSkillsLanguageIconHTML(data) {
    var item = '';

    for (var i = 0; i < data.length; i++) {
        item += '<img class="' 
                + 'skills_language_icon_img' + '" ' 
                + 'src="' + data[i][0] + '" '
                + 'alt="' + data[i][1] + '"' + '/>';
    }

    return item;
}

function buildGalleryHTML(data) {
    var item = '';

    var width = $(window).width();
    for (var i = 0; i < data.length; i++) {
        if (width <= 480) {
             // 3개 단위로 새 row 열기
            if (i % 3 == 0) {
                if (i != 0) item += '</div>'; // 이전 row 닫기
                item += '<div class="gallery_row">';
            }
        } else if (width <= 768) {
            // 4개 단위로 새 row 열기
            if (i % 4 == 0) {
                if (i != 0) item += '</div>'; // 이전 row 닫기
                item += '<div class="gallery_row">';
            }
        }
        else {
            // 5개 단위로 새 row 열기
            if (i % 5 == 0) {
                if (i != 0) item += '</div>'; // 이전 row 닫기
                item += '<div class="gallery_row">';
            }
        }

        // gallery item 추가
        item += '<div class="gallery_item">'
                + '<img src="' + data[i][3] + '" alt="' + data[i][4] + '"/>'
                + '<b>' +'<font size="1">'
                + data[i][4] + '</b>'
                + '<br/>' + data[i][2]
                + '<br/>' + data[i][0] + ' ' + data[i][1]
                + '</font>'
            + '</div>';
    }

    // 마지막 row 닫기
    if (data.length > 0) {
        item += '</div>';
    }

    return item;
}

function buildLinksOldMyWebHTML(data) {
    var item = '';

    item += '<ul>';
    for (var i = 0; i < data.length; i++) {
        item += '<li>' + '<a href="' 
            + data[i][1] + '" ' + 'target="_blank"' + '>' 
            + data[i][0] + '</a>'
            + '</li>';           
    }

    item += '</ul>';

    return item;
}

function buildLinksThanksTo(data) {
    var item = '';

    item += '<ul>';
    for (var i = 0; i < data.length; i++) {
        item += '<li>' + '<a href="' 
            + data[i][1] + '" ' + 'target="_blank"' + '>' 
            + data[i][0] + '</a>'
            + '</li>';           
    }

    item += '</ul>';

    return item;
}


/* 기능에 대한 부분은 JQuery로 구현함... */
$(function () {
    var anchor_offset = 0;

    function adjustAnchorOffset() {
        anchor_offset = $('#menus').outerHeight(); // fixed header
        if (location.hash) {
            var $target = $(location.hash);
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
    });

    $(window).on('resize', function () {
        adjustAnchorOffset();       
        $('#gallery_table').html(buildGalleryLayoutHTML());
    });


    $('.works_toggle').on('click', function (e) {
        e.preventDefault();

        var $btn = $(this);
        var targetId = $btn.data('target');
        var $target = $('#' + targetId);

        // 다른 패널 닫기
        $('.works_toggle_contents').not($target).slideUp(200);

        // 현재 패널 토글
        $target.stop(true, true).slideToggle(200, function () {
            // 애니메이션 끝난 후 스크롤
            $('html, body').animate({
                scrollTop: $btn.offset().top - anchor_offset
            }, 400);
        });
    });

    $('#menus a').on('click', function (e) {
        var href = $(this).attr('href');

        if (!href || href.charAt(0) !== '#') return;

        e.preventDefault();

        var $target = $(href);
        if (!$target.length) return;

        $('html, body').animate({
            scrollTop: $target.offset().top - anchor_offset
        }, 400);
    });
});