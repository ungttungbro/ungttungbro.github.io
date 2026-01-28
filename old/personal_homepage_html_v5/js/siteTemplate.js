'use strict';

const createNavigationItems = function(logoSrc, siteMap, aboutUrl, galleryUrl, linksUrl, contactEmail) {
    const navigationItemEl = document.createElement('div');
    navigationItemEl.id = 'navigation-items';

    const navLeftEl = document.createElement('div');
    navLeftEl.id = 'nav-left';
    navLeftEl.innerHTML = '<a href="#top">' 
                            + '<img id="logo" src="' + logoSrc + '" height="60" alt="로고">' 
                        + '</a>';

    const navRightEl = document.createElement('div');
    navRightEl.id = 'nav-right';
    navRightEl.innerHTML = '<a id="about-link" href="' + aboutUrl + '">' + siteMap.menus.about + '</a>'
                            + '<a href="' + galleryUrl + '">' + siteMap.menus.gallery + '</a>'
                            + '<a href="' + linksUrl + '">' + siteMap.menus.links + '</a>'
                            + '<a id="contact-link" href="mailto:' + contactEmail + '">' + siteMap.menus.contact + '</a>';

    navigationItemEl.appendChild(navLeftEl);
    navigationItemEl.appendChild(navRightEl);

    return navigationItemEl;
};

const signatureComment = function(titleHTML, commentHTML) {
    let comment = titleHTML + commentHTML;
    return comment;
};

const scrollIndicator = function() {
    const scrollIndicatorEl = document.createElement('div');
    scrollIndicatorEl.id = 'intro-gate';
    scrollIndicatorEl.innerHTML = '<a href="#about">'
                                    + '▼'
                                + '</a>';

    return scrollIndicatorEl;
};

const createSectionHeader = function(sectionName) {
    let sectionHeader = '<div class="section-header">' 
                            + sectionName 
                        + '</div>';

    return sectionHeader;
};

export { createNavigationItems };
export { createSectionHeader };
export { signatureComment };
export { scrollIndicator };