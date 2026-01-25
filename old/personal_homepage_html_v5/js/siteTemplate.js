const createNavigationItems = function(logoSrc, siteMap, aboutUrl, galleryUrl, linksUrl, contactEmail) {
    const navigationItemEl = document.createElement('div');
    navigationItemEl.id = 'navigation-items';

    const navLeftEl = document.createElement('div');
    navLeftEl.id = 'nav-left';
    navLeftEl.innerHTML = '<a href="#signature_image">' 
                            + '<img id="logo" src="' + logoSrc + '" height="60" alt="로고">' 
                        + '</a>';

    const navRightEl = document.createElement('div');
    navRightEl.id = 'nav-right';
    navRightEl.innerHTML = '<a href="' + aboutUrl + '">' + siteMap.menus.about + '</a>'
                            + '<a href="' + galleryUrl + '">' + siteMap.menus.gallery + '</a>'
                            + '<a href="' + linksUrl + '">' + siteMap.menus.links + '</a>'
                            + '<a href="mailto:' + contactEmail + '">' + siteMap.menus.contact + '</a>';

    navigationItemEl.appendChild(navLeftEl);
    navigationItemEl.appendChild(navRightEl);

    return navigationItemEl;
};

const createSectionHeader = function(sectionName) {
    let sectionHeader = '<div class="section-header">' 
                            + sectionName 
                        + '</div>';

    return sectionHeader;
}

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

export { createNavigationItems };
export { createSectionHeader };
export { createExperience };