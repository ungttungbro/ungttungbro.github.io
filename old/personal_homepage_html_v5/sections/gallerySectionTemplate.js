'use strict';

const createThumbnails = function(data) {
    let item = '<div class="thumbnail-container">';

    for (var i = 0; i < data.length; i++) {
        item += '<div class="gallery-thumbnail">'
                    + '<img class="gallery-photo" src="' + data[i][3] + '" alt="' + data[i][4] + '">'
                    + '<b>' +'<font size="1">'
                    + data[i][4] + '</b>'
                    + '<br>' + data[i][2]
                    + '<br>' + data[i][0] + ' ' + data[i][1]
                    + '</font>'
                + '</div>';
    }

    item += '</div>';

    return item;
};

export { createThumbnails };