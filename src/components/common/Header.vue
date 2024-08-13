<template>
    <!-- NOTE: RouterLink
        [참고] https://router.vuejs.kr/guide/essentials/active-links.html
        to: 라우터 설정(/src/routes/index.js)에 선언된 페이지 중 path 와 일치하는 페이지로 이동시킨다
        active-class: 클릭시 활성화되는 클래스를 지정한다.
            기본값: router-link-active

        $route : 페이지 정보 속성을 가지는 객체(fullPath, params, ...)
        $router: 페이지 조작을 위한 메소드를 가지는 객체(push, back, ...)
    -->
    <header>
        <nav>
            <Logo />
            <ul>
                <li
                    class="nav-item"
                    v-for="navigation in navigations"
                    :key="navigation.name">
                    <RouterLink
                        :class="['nav-link', { active: isMatch(navigation.path) }]"
                        active-class="active"
                        :to="navigation.href">
                        <span>{{ navigation.name }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import Logo from '~/components/common/Logo'

export default {
    components: {
        Logo
    },
    data() {
        return {
            navigations: [
                {
                    name: "Home",
                    href: "/",
                    icon: "house" // MO
                },
            ]
        }
    },
    methods: {
        isMatch(path) {
            if(!path) return false
            return path.test(this.$route.fullPath) // 정규표현식의 test 함수를 사용하여 포함여부 반환
        }
    }
}
</script>