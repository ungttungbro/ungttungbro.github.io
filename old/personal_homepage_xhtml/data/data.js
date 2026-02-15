const experienceData = [
    [ '2025', '직업상담사 1급', '자격 취득 (고용노동부)' ],
    [ '2021', '한국과학창의재단', '(연구원) - 초중등 정보교육 프로그램 연구, 기획, 행정',  'https://kosac.re.kr' ],
    [ '2020', '직업훈련교사 3급', '자격 취득 (고용노동부)' ],
    [ '2018', '코딩플러스학원', '(코딩강사) - 코딩강의 [스크래치, C/C++, 자료구조, 알고리즘]', 'http://www.codingplus.co.kr/main/main.do' ],
    [ '2017', '국립한국방송통신대학교', '(학사운영튜터) - 학사운영, 행사지원, 학사상담', 'https://knou.ac.kr' ],
    [ '2015', '대건정보처리학원', '코딩강의 [스크래치, C/C++, 정보올림피아드]', 'https://daekun2019-mo4.imweb.me' ],
    [ '2015', '특허 제10-1550969호 등록', '음악의 분위기와 폭소노미 태그의 관계의 분석 방법' ],
    [ '2014', '국립금오공과대학교 대학원', '(졸업) - 소프트웨어공학과 (공학석사)', 'https://cam.kumoh.ac.kr' ],
    [ '2014', '정보처리기사', '자격 취득 (한국산업인력공단)' ],
    [ '2013', '한국컴퓨터종합학술대회 우수 발표 논문상', '수상 (한국정보과학회)' ],
    [ '2011', '(주)에픽소프트', '(개발자) - CRM 솔루션 개발 및 유지보수 [VB, MS-SQL]', 'http://www.epicsoft.co.kr/main/main.asp' ],
    [ '2011', '국립금오공과대학교', '(졸업) - 컴퓨터공학과 (공학사)', 'https://kumoh.ac.kr' ],
    [ '2007', '동서울대학', '(졸업) - 컴퓨터소프트웨어공학과 (전문학사)', 'https://www.du.ac.kr/main.do' ],
    [ '2006', '(주)혜만테크', '(개발자) - GIS 솔루션 개발 및 유지보수 [VC++, MS-SQL, ASP]' ]
];


const worksAcademicResearchData = [
    '2017년 방송통신대학교에서 학사운영, 2021~2022 한국과학창의재단에서 연구직으로 활동 하였으며 교육활동과 상담, 그리고 실무에서의 선한 영량력에 대한 성취를 경험했던 귀한 시간이었습니다.',
    './images/works/research/academic_research1.jpg',
    './images/works/research/academic_research2.jpg',
    './images/works/research/academic_research3.jpg',
    './images/works/research/academic_research4.jpg'
];


const worksTeachingActivityData = [
    '2015년~2016 대건정보처리학원, 2018~2020 코딩플러스학원에서 활동 하였으며, 학생들과의 교류와 친목, 공부하는 즐거움이 좋았던 시간이었습니다.',
    './images/works/activity/teaching_activity1.jpg',
    './images/works/activity/teaching_activity2.jpg',
    './images/works/activity/teaching_activity3.jpg',
    './images/works/activity/teaching_activity4.jpg',
    './images/works/activity/teaching_activity5.jpg',
    './images/works/activity/teaching_activity6.jpg',
    './images/works/activity/teaching_activity7.jpg',
    './images/works/activity/teaching_activity8.jpg'
];


const worksPublishData = [
    [ '모바일 사용자 상황정보를 이용한 퍼스널 라이프로그 자동태깅 시스템', 'https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=DIKO0013354194', '모바일 환경 기반에서 생성된 사용자의 상황정보를 가공하고 추론하는 방법을 연구하고 실험한 것을 기록한 석사학위논문',  '저자 : 장영완, 김병만', '등재일 : 2014.8', '등재기관 : 금오공과대학교 대학원' ],
    [ '스마트폰 기반의 이동상황 판별을 위한 유클리디안 거리유사도의 응용', 'https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=JAKO201429765168594', '이동 컴퓨팅 환경에서의 사용자 움직임을 파악하기 위해 유클리디안 거리유사도를 이용하여 스마트폰의 센서를 통해 인식한 사용자의 움직임을 추상화 하는 방법',  '저자 : 장영완, 김병만, 장성봉, 신윤식', '등재일 : 2014.8', '등재기관 : 한국산업정보학회논문지 제19권 제4호' ],
    [ '모바일 사용자 상황정보를 이용한 퍼스널 라이프로그 자동 태깅 방법', 'https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=JAKO201306464397689', '모바일 환경 기반에서 생성된 사용자의 상황정보를 가공하고 추론하여 일화형태의 레코드를 구성하고 대표값을 추출하여 태깅하는 것으로 일상의 정보를 수집하는 방법', '저자 : 장영완, 김병만, 문창배, 신윤식', '등재일 : 2013.10', '등재기관 : 한국정보과학회논문지 시스템 및 이론 제40권 제5호' ],
    [ '모바일 사용자 상황정보를 이용한 퍼스널 라이프로그 자동 태깅 시스템', 'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=1a0202e37d52c72d&amp;control_no=c6bef31fce76f2d3ffe0bdc3ef48d419&amp;keyword=', '모바일 환경 기반에서 생성되어 가공된 사용자 상황정보를 추론하여 일화형태이 레코드를 구성하고 대표값을 태깅하는 시스템', '저자 : 장영완, 김병만, 신윤식', '등재일 : 2013.6', '등재기관 : 2013년 한국컴퓨터종합학술대회 논문집' ],
    [ '음악의 분위기와 폭소노미 태그의 관계 분석', 'https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=JAKO201324161075932', '폭소노미에 사용되는 태그에 대하여 유사어, 태깅 레벨, 신조어 등의 문제를 해결하기 위해 음악의 분위기 강도 (Arousal과 Valence의 강도)를 음악의 내부태그로 활용하는 방법을 분석', '저자 : 문창배, 김현수, 장영완, 김병만', '등재일 : 2013.3', '등재기관 : 감성과학 제16권 제1호' ]
];


const worksProjectsData = [
    [ 'Sports Pro 21','스포츠 센터 POS및 CRM 관련 어플리케이션 개발 운영 프로젝트 (한국마사회, 한성기업 르네상스휘트니스, 삼부스포렉스등 다수)', '수행역할 : 프로그램 개발 및 유지보수 (VB, MS-SQL)', '참여기간 : 2011.2 ~ 2011.9', '소속기관 : (주)에픽소프트' ],
    [ 'DMS (Design Management System)','한국전력 고압단가 업체 운영 및 유지보수 설계 프로그램 개발 및 운영 프로젝트','수행역할 : 프로그램 운영 및 유지보수 (VC++, MS-SQL, Oracle)','참여기간 : 2006.12 ~ 2009.2','소속기관 : (주)혜만테크' ]
];


const worksPersonalProjectsData = [
    [ 'SEED256bit 블록암호 라이브러리', './images/works/projects/console.gif','SEED256bit 블록암호 운영 라이브러리 설계','KISA 알고리즘 기반 5가지 운영모드 구현','프로젝트 완료일 : 2011.3' ],
    [ 'Lavine Launcher', './images/works/projects/Lavine.gif','독자적 문법 설계 및 인터프리터 기반 구조','개발환경 : VC++','프로젝트 완료일 : 2010.12' ],
    [ 'groupware', './images/works/projects/groupware.gif','그룹웨어 개발','개발환경 : VC++, ASP, MS-SQL, C#','프로젝트 완료일 : 2010.7' ],
    [ 'InternetDisk', './images/works/projects/internetdisk.gif','FTP 기반 인터넷디스크','파일 업로드, 다운로드, 탐색기능','프로젝트 완료일 : 2009.12' ],
    [ 'RockStyleLife', './images/works/projects/rockstylelife.gif','록 스타일 의류 쇼핑몰','ASP, MS-SQL 기반 개발','프로젝트 완료일 : 2006.12' ],
    [ 'prent', './images/works/projects/prent.gif','PC 렌탈 쇼핑몰','SP, MS-SQL 기반 개발','프로젝트 완료일 : 2006.6' ]
];


const skillsInstructionalData = [
    [ '초중등 정보교육', '스크래치, 엔트리등 블록코드를 사용하여 초중등교과과정에 맞춘 강의' ],
    [ '코딩교육', ' C/C++ 코딩 언어 강의' ],
    [ '프로그래밍 교육', '자료구조, 알고리즘등 프로그래밍 스킬 강의' ]
];


const skillsProgrammingData = [
    [ './images/skills/html.png', 'html image' ],
    [ './images/skills/css.png', 'css image' ],
    [ './images/skills/js.png', 'js image' ],
    [ './images/skills/cpp.png', 'cpp image' ]
];


const photoGalleryData = [
    [ '2020-3-4', '장승배기', 'Gallaxy S3', './images/gallery/photos/20200304_photo.jpg', '장영완 선생님' ],
    [ '2019-11-8', '장승배기', 'Gallaxy S3', './images/gallery/photos/20191108_photo.jpg', '뉘신지?' ],
    [ '2019-4-1', '장승배기', 'Gallaxy S3', './images/gallery/photos/20190401_photo.jpg', '조화로 데코하기' ],
    [ '2019-4-1', '장승배기', 'Gallaxy S3', './images/gallery/photos/20190401_photo2.jpg', '조화로 데코하기2' ],
    [ '2018-12-5', '장승배기', 'Gallaxy S3', './images/gallery/photos/20181205_photo.jpg', '칠판낙서' ],
    [ '2015-3-15', '서울 혜화동', 'ILCE-7M2', './images/gallery/photos/20150315_photo.jpg', '혜화동에 갔다' ],
    [ '2013-2-19', '구미','Optimus Q', './images/gallery/photos/20130219_photo.jpg', '강의실 정리 후 한컷' ],
    [ '2012-12-14', '구미','Optimus Q', './images/gallery/photos/20121214_photo.jpg', '학교 건물' ],
    [ '2012-11-15', '구미','Optimus Q', './images/gallery/photos/20121115_photo.jpg', '학교 정리' ],
    [ '2006-6-23', '성남', '필름카메라', './images/gallery/photos/20060623_photo.jpg', '장영완' ]
];


const linksOldPageData = [
    [ 'old homepage' ,'../works-site-html401' ],
    [ 'old old homepage' ,'../works-site-html320' ],
    [ 'old old old homepage' ,'../works-site-html2' ]
];


const linksThanksToData = [
    [ 'W3C markup 검증 서비스', 'http://validator.kldp.org' ],
    [ 'google 학술검색 서비스', 'https://scholar.google.co.kr' ],
    [ 'Flaticon', 'https://www.flaticon.com' ],
    [ '국립금오공과대학교', 'https://kumoh.ac.kr' ],
    [ '동서울대학교', 'https://www.du.ac.kr/main.do' ],
    [ '한국방송통신대학교', 'https://knou.ac.kr' ],
    [ '한국과학창의재단', 'https://kosac.re.kr' ]
];