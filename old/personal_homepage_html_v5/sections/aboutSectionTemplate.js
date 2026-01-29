'use strict';

const createExperience = function(data) {
    let item = '';
    let url = '';
    for (let i = 0; i < data.length; i++) {
        let year = data[i][0];
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

        item += '<div class="experience-timeline-item">'
                + '<div class="year">' + year + '</div>'
                + '<div class="content">'
                    + '<b>' + url + '</b>' + ' ' + data[i][2]
                + '</div>'
              + '</div>';
    }

    return item;
};

const createAcademicResearch = function(data) {
    let item = data[0];

    item += '<div id="academic-research-photos">';

    for (let i = 1; i < data.length; i++) {
        item +='<img class="' + 'academic-research-photo' + '" '
                + 'src="' + data[i] 
                + ' "alt="' + 'academic-research' + '">';
    }

    item += '</div>';
    
    return item;
};



const createTeachingActivity = function(data) {
    let item = data[0];

    item += '<div id="teaching-activity-photos">';

    for (let i = 1; i < data.length; i++) {
        item +='<img class="' + 'teaching-activity-photo' +'" '
                + 'src="' + data[i] 
                + ' "alt="' + 'Teaching Activities' + '">';
    }

    item += '</div>';
    
    return item;
};

const createPublish = function(data) {
    let item = '';

    for (let i = 0; i < data.length; i++) {
        item += '<div class="works-content-title">'
                + '<a href="'+ data[i][1] + '" ' 
                    + 'onclick="' + 'window.open(this.href); return false;' + '"> ' 
                    + data[i][0] + '</a>' + '</div>'
                +'<ul>'
                    + '<li>' + data[i][2] + '</li>'
                    + '<li>' + data[i][3] + '</li>'
                    + '<li>' + data[i][4] + '</li>'
                    + '<li>' + data[i][5] + '</li>'
                +'</ul>';

        if (i + 1 < data.length)
            item += '<hr>';
    }

    return item;
};

const createProjects = function(data) {
    let item = '';

    for (let i = 0; i < data.length; i++) {
        item += '<div class="works-content-title">' + data[i][0] + '</div>'
                + '<ul>'
                    + '<li>' + data[i][1] + '</li>'
                    + '<li>' + data[i][2] + '</li>'
                    + '<li>' + data[i][3] + '</li>'
                    + '<li>' + data[i][4] + '</li>'
                + '</ul>';
        
        if (i + 1 < data.length)
            item += '<hr>';
    }

    return item;
};

const createPersonalProjects = function(data) {
    let item = '';

    for (let i = 0; i < data.length; i++) {
        item += '<div class="works-personal-project-item">'
                + '<img class="' + 'works-personal-project-image' + '" '
                + 'src="' + data[i][1] + '" '
                + 'alt="' + data[i][0] + '"' + '>'              
                + '<div class="works-content-title">' + data[i][0] + '</div>'
                + '- ' + data[i][2]
                + '<br>' + '- ' + data[i][3]
                + '<br>' + '- ' + data[i][4]
                + '<hr>'
            + '</div>'
    }

    return item;
};

export { createExperience };
export { createAcademicResearch };
export { createTeachingActivity };
export { createPublish };
export { createProjects };
export { createPersonalProjects };