'use strict';

const createThumbnails = function(data) {
    var item = '';

    for (var i = 0; i < data.length; i++) {
        item += '<div class="gallery-thumbnail">'
                + '<img src="' + data[i][3] + '" alt="' + data[i][4] + '">'
                + '<b>' +'<font size="1">'
                + data[i][4] + '</b>'
                + '<br>' + data[i][2]
                + '<br>' + data[i][0] + ' ' + data[i][1]
                + '</font>'
            + '</div>';
    }

    // 마지막 row 닫기
    if (data.length > 0) {
        item += '</div>';
    }

    return item;
};

export { createThumbnails };