# 🎁 포트폴리오
> 22.04.18 ~ 05.10 / 포트폴리오 / 프로젝트 정보 관리 홈페이지  
> 팀 구성원: 나슬기
<br/>

## 📖 주제: 주제
<div align="center">

<img alt="포트폴리오 사이트 소개 이미지" src=""/>

</div>

### 프로젝트 목적
+ 참여 프로젝트 시각적 기록

### 기록
+ slot의 화면 로딩은 nextTick 이 감지하지 못한다(24/08/29)
+ 로딩화면의 스크롤 관리(24/08/28): create 시 js로 head에 style 시트 추가, unmount 시 삭제. => 전역 css 사용 시 컴포넌트 해제 후에도 스크롤이 사라져있음
+ 로딩화면 순서(24/08/28): ~~App created(store 연결 시점이나 비슷.. 차라리 초기값을 true)~~ + ~~before Router(너무 짜증)~~ (생성) -> Layout updated(소멸) => store로 상태 관리 필요
+ 호출 순서(24/08/28): App created -> Layout created -> App nextTick 이후 실행 -> before Router -> after Router -> Layout updated
+ 노션 데이터베이스 연결(24/08/14)
<br/>

## 🛠 사용언어 및 개발 환경
<div align="center">
</div>
<br/>

## 🖥 미리보기
<table>
    <tr>
        <th colspan="2" width="50%">메인 페이지</th>
        <th width="50%">모바일 페이지</th>
    </tr>
    <tr>
        <td colspan="2"><img alt="메인 이미지" src=""/></td>
        <td><img alt="모바일 이미지" src=""/></td>
    </tr>
    <tr>
        <th width="33.33%">AA 페이지</th>
        <th width="33.33%">BB 페이지</th>
        <th width="33.33%">CC 페이지</th>
    </tr>
    <tr>
        <td><img alt="AA 이미지" src=""/></td>
        <td><img alt="BB 이미지" src=""/></td>
        <td><img alt="CC 이미지" src=""/></td>
    </tr>
</table>
