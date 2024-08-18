/** NOTE:
 * [참고] https://router.vuejs.kr/installation
 * 라우터를 이용해 페이지를 관리해 주는 구성 파일
 * 내보내지는 라우터 플러그인 -> main.js 에서 사용된다.
*/
import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '~/views/NotFound'
import Home from '~/views/Home'
import AboutMe from '~/views/AboutMe'
import Projects from '~/views/Projects'
import Contact from '~/views/Contact'

export default createRouter({
    /** history 값 종류
     * Hash   : 새로고침 시 페이지를 찾을 수 없습니다 방지 가능 (도메인/#/경로)
     * History: 서버 세팅이 필요함
     */
    history: createWebHashHistory(),

    /** NOTE: 페이지 이동 시 스크롤 처리
     * [참고] https://router.vuejs.kr/guide/advanced/scroll-behavior.html
     * 매개변수로 to, from, savedPosition 를 받는다.
     * 세번째 매개변수인 savedPosition 은 뒤로/앞으로 버튼에 의해 트리거된인 경우에만 사용 가능하다.
     */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },

    // 페이지를 배열로 관리한다
    routes: [
        {
            /** NOTE: 예외처리
             * [참고] https://router.vuejs.kr/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route
             * 별도로 지정하지 않은 모든 경로 예외 처리
             * 사용 시 콜론(:) 뒤에 변수명을 적고, 정규표현식(.*)을 사용하여 전체 경로를 일치시킨다
             */
            name: 'Error',
            path: '/:notFound(.*)',
            component: NotFound,
            meta: {
                next: 'Home',
                isHide: true, // 네비게이션 미노출
            }
        },
        {
            name: 'Home',
            path: '/',
            alias: '/home',
            component: Home,
            meta: {
                next: 'About Me',
                isHide: true,
            }
        },
        {
            name: 'About Me',
            path: '/about-me',
            component: AboutMe,
            meta: {
                next: 'Projects'
            }
        },
        {
            name: 'Projects',
            path: '/projects',
            component: Projects,
            meta: {
                next: 'Contact'
            }
        },
        {
            name: 'Projects Detail',
            path: '/projects/:id',
            component: Projects,
            meta: {
                next: 'Projects',
                isHide: true,
            }
        },
        {
            name: 'Contact',
            path: '/contact',
            component: Contact,
            meta: {
                next: 'About Me'
            }
        },
    ]
})