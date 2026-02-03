'use strict';

const createThumbnails = function(data) {
    const container = document.createElement('div');
    container.className = 'thumbnail-container';

    const frag = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail';

        const img = document.createElement('img');
        img.className = 'gallery-photo';
        img.src = data[i][3];
        img.alt = data[i][4];
        
        const text = document.createElement('div');
        text.innerHTML = '<b>' + '<font size="1">'
                    + data[i][4] + '</b>'
                    + '<br>' + data[i][2]
                    + '<br>' + data[i][0] + ' ' + data[i][1]
                    + '</font>';

        thumbnail.appendChild(img);
        thumbnail.appendChild(text);

        thumbnail.addEventListener('click', ()=> {
            const moniterEl = document.getElementById('gallery-moniter');

            const moniterPhotoEl = document.createElement('img');
            moniterPhotoEl.className = 'gallery-monitor-photo';
            moniterPhotoEl.src = data[i][3];
            moniterPhotoEl.alt = data[i][4];

            moniterEl.innerHTML = '';
            moniterEl.appendChild(moniterPhotoEl);
        });

        frag.appendChild(thumbnail);
    }

    container.appendChild(frag);

    return container;
};

export { createThumbnails };