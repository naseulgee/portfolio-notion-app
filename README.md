# 🎁 포트폴리오
> 24.08.12 ~ 08.29 / 포트폴리오 / 프로젝트 정보 관리 홈페이지  
> 팀 구성원: 나슬기
<br/>

## 📖 주제: 주제
<div align="center">

<img width="100%" alt="포트폴리오 사이트 소개 이미지" src="https://github.com/user-attachments/assets/d90204c2-419e-4264-82f0-994995158b1e"/>

</div>

### 프로젝트 목적
+ 참여 프로젝트 시각적 기록

### 성장 포인트
+ Vue3 를 이용한 SPA 복습 및 연습
+ Notion을 데이터베이스로 활용하여 API 연결 연습
+ Vuex 를 활용한 색상 테마 변경 및 로딩 화면 처리 연습
+ Vue Router 의 beforeEach 메소드를 이용한 페이지 이동 전 처리 연습
+ Notion 과 Zapier 를 이용한 자동화 구현
+ 3D Carousel 구현
+ Bootstrap 애니메이션 적용 연습

### 기록
+ slot의 화면 로딩은 nextTick 이 감지하지 못한다(24/08/29)
+ 로딩화면의 스크롤 관리(24/08/28): create 시 js로 head에 style 시트 추가, unmount 시 삭제. => 전역 css 사용 시 컴포넌트 해제 후에도 스크롤이 사라져있음
+ 로딩화면 순서(24/08/28): ~~App created(store 연결 시점이나 비슷.. 차라리 초기값을 true)~~ + ~~before Router(너무 짜증)~~ (생성) -> Layout updated(소멸) => store로 상태 관리 필요
+ 호출 순서(24/08/28): App created -> Layout created -> App nextTick 이후 실행 -> before Router -> after Router -> Layout updated
+ 노션 데이터베이스 연결(24/08/14)
<br/>

## 🛠 사용언어 및 개발 환경
<div align="center">
<img alt="Java 11" src ="https://img.shields.io/badge/☕ Java 11-007396?&style=for-the-badge"/>
<img alt="Html5" src ="https://img.shields.io/badge/HTML5-E34F26?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="Css3" src ="https://img.shields.io/badge/CSS3-1572B6?&style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="SCSS" src ="https://img.shields.io/badge/SCSS-CC6699?&style=for-the-badge&logo=Sass&logoColor=white"/>
<img alt="Bootstrap" src ="https://img.shields.io/badge/Bootstrap-7952B3?&style=for-the-badge&logo=Bootstrap&logoColor=white"/>
<img alt="Font Awesome 6" src ="https://img.shields.io/badge/Font Awesome 6-528DD7?&style=for-the-badge&logo=Font Awesome&logoColor=white"/>
<br/>
<img alt="Javascript" src ="https://img.shields.io/badge/JavaScript ES6-F7DF1E?&style=for-the-badge&logo=JavaScript&logoColor=black"/>
<img alt="Vue3" src ="https://img.shields.io/badge/Vue3-4FC08D?&style=for-the-badge&logo=Vue.js&logoColor=white"/>
<img alt="Vue Router" src ="https://img.shields.io/badge/Vue Router-4FC08D?&style=for-the-badge&logo=Vue.js&logoColor=black"/>
<img alt="Vuex" src ="https://img.shields.io/badge/Vuex-35495E?&style=for-the-badge&logo=Vue.js&logoColor=white"/>
<img alt="Axios" src ="https://img.shields.io/badge/Axios-5A29E4?&style=for-the-badge&logo=Axios&logoColor=white"/>
<br/>
<img alt="Notion" src ="https://img.shields.io/badge/Notion-000000?&style=for-the-badge&logo=Notion&logoColor=white"/>
<br/>
<img alt="ESLint" src ="https://img.shields.io/badge/ESLint-4B32C3?&style=for-the-badge&logo=ESLint&logoColor=white"/>
<br/>
<img alt="Netlify" src ="https://img.shields.io/badge/Netlify-00C7B7?&style=for-the-badge&logo=Netlify&logoColor=white"/>
<img alt="Webpack" src ="https://img.shields.io/badge/Webpack-8DD6F9?&style=for-the-badge&logo=Webpack&logoColor=white"/>
</div>
<br/>

## 🖥 미리보기
<table>
    <tr>
        <th width="50%">메인 페이지</th>
        <th width="50%">모바일 페이지</th>
    </tr>
    <tr>
        <td><img alt="메인 이미지" src="https://github.com/user-attachments/assets/26e19963-dfca-483e-95a7-688df0553292"/></td>
        <td><img alt="모바일 이미지" src="https://github.com/user-attachments/assets/f3e1e42c-7422-448c-b802-a400b5868a49"/></td>
    </tr>
    <tr>
        <th width="50%">로딩 페이지</th>
        <th width="50%">404 페이지</th>
    </tr>
    <tr>
        <td><img alt="로딩 이미지" src="https://github.com/user-attachments/assets/811a39fc-12e4-46e3-9977-69db4bd1356e"/></td>
        <td><img alt="404 이미지" src="https://github.com/user-attachments/assets/973805ba-415b-4c95-bc84-b9a8b394da7b"/></td>
    </tr>
    <tr>
        <th width="50%">About Me 페이지</th>
        <th width="50%">Contact 페이지</th>
    </tr>
    <tr>
        <td><img alt="About Me 이미지" src="https://github.com/user-attachments/assets/8aa172bf-2740-4fc1-96a6-4680513a5acf"/></td>
        <td><img alt="Contact 이미지" src="https://github.com/user-attachments/assets/aa7c756a-6f4b-43fc-9dab-ab835dd3c22f"/></td>
    </tr>
    <tr>
        <th width="50%">Portfolios 페이지</th>
        <th width="50%">Portfolios Detail 페이지</th>
    </tr>
    <tr>
        <td><img alt="Portfolios 이미지" src="https://github.com/user-attachments/assets/df211949-3191-4aa1-a480-8818d7da27e5"/></td>
        <td><img alt="Portfolios Detail 이미지" src="https://github.com/user-attachments/assets/b5856e3d-176d-4d34-bba1-e94ea4b21684"/></td>
    </tr>
</table>
