// ------------------------
// 배경색 적용 및 저장
// ------------------------
function applyBackground(color) {
  var tds = document.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    if (tds[i].className === 'site_background') {
      tds[i].style.backgroundColor = color;     
    }
  }
}

// ------------------------
// 랜덤 시그니처 이미지
// ------------------------
var images = [
    "signature_photo1.jpg",
    "signature_photo2.jpg",
    "signature_photo3.jpg",
    "signature_photo4.jpg",
    "signature_photo5.jpg"
];

function randomSignature(){
    if(document.images && document.images['signature_image']){
        var randIndex = Math.floor(Math.random() * images.length);
        document.images['signature_image'].src='/old/personal_homepage_html_v4/images/signature/' + images[randIndex];
    }
}

// ------------------------
// element visibility
// ------------------------
function visibilityElement(element_id) {
    var el = document.getElementById(element_id);

    if (!el.style.display || el.style.display == 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
}

function openImage(src) {
  var width = 300;
  var height = 520;

  var left = (screen.width  - width) / 2;
  var top  = (screen.height - height) / 2;

  window.open(
    src,
    '_blank',
    'width=' + width +
    ',height=' + height +
    ',left=' + left +
    ',top=' + top
  );
}


// ------------------------
// 초기화 함수
// ------------------------
function initPage() {
    // 랜덤 이미지 적용
    randomSignature();
}
