const linksOldMyWeb = function(data) {
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

const linksThanksTo = function(data) {
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

export { linksOldMyWeb };
export { linksThanksTo };