import { experienceData } from '../data/data.js';
import { siteMap } from '../js/siteMap.js';
import { createNavigationItems, createSectionHeader, createExperience } from '../js/siteTemplate.js';

const createNavigationItemsElement = function() {
    return createNavigationItems(
        './images/logo.png', 
        siteMap, 
        '#about', 
        '#gallery', 
        '#links', 
        'youngwan.jang@gmail.com'
    );
}

const createExperienceElement = function() {
    const experienceEl = document.createElement('div');
    experienceEl.id = 'experience-timeline';

    experienceEl.innerHTML +='<img id="profile-photo" src="./images/profile-photo.jpg" alt="증명사진">';

    const sectionHeaderHTML = createSectionHeader('Experience');
    experienceEl.innerHTML += sectionHeaderHTML;

    const experienceHTML = createExperience(experienceData);
    experienceEl.innerHTML += experienceHTML;

    return experienceEl;    
}

export { createNavigationItemsElement };
export { createExperienceElement };