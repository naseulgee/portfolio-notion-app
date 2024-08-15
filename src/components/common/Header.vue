<template>
    <!-- NOTE: RouterLink
        [참고] https://router.vuejs.kr/guide/essentials/active-links.html
        to: 라우터 설정(/src/routes/index.js)에 선언된 페이지 중 path 와 일치하는 페이지로 이동시킨다
        active-class: 클릭시 활성화되는 클래스를 지정한다.
            기본값: router-link-active

        $route : 페이지 정보 속성을 가지는 객체(fullPath, params, ...)
        $router: 페이지 조작을 위한 메소드를 가지는 객체(push, back, ...)
    -->
    <header class="header d-block w-100 position-fixed top-0 start-0">
        <nav class="navbar container d-flex justify-content-between align-items-center w-100 h-100 py-0 position-relative">
            <Logo />
            <button
                class="menu d-block d-md-none p-0 border-0 position-absolute top-50 end-0 translate-middle-y bg-transparent"
                ref="menu"
                @click="showNav">
                <div
                    v-for="i in 3"
                    :key="i"
                    :class="['bar', 'bar'+i, 'rounded']"></div>
            </button>
            <ul class="nav">
                <li
                    class="nav-item"
                    v-for="(navigation, i) in navigations"
                    :key="i">
                    <RouterLink
                        :class="['nav-link', { active: isMatch(navigation.regx) }]"
                        active-class="active"
                        :to="navigation.path">
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
    computed: {
        navigations() {
            return this.$router.getRoutes().filter(route => {
                if(route.name != 'Error' && route.name != 'Home') return true
            }).map(route => {
                const { name, path } = route
                const nav = { name, path }
                if(name == 'Projects') nav.regx = /^\/projects/
                return nav
            })
        },
    },
    methods: {
        isMatch(regx) {
            if(!regx) return false
            return regx.test(this.$route.fullPath) // 정규표현식의 test 함수를 사용하여 포함여부 반환
        },
        showNav() {
            this.$refs.menu.classList.toggle("on")
        }
    },
}
</script>

<style lang="scss" scoped>
.header{
    height: 100px;
    z-index: $header-z-index;
    .navbar{
        // 햄버거 아이콘
        .menu{
            width: 30px;
            height: 25px;
            transition: $transition-base;
            .bar{
                width: 30px;
                height: 3px;
                position: absolute;
                background-color: $body-color;
                transition: $transition-base;
                &.bar1{
                    top: 0;
                    left: 0;
                    transform-origin: 2px 2px;
                }
                &.bar2{
                    top: calc(50% - 1.5px);
                    left: 0;
                    transform-origin: calc(50% - 2.5px) calc(50% - 1px);
                }
                &.bar3{
                    bottom: 0;
                    left: 0;
                    transform-origin: 28px -10px;
                }
            }
            &.on{
                width: 25px;
                .bar{
                    width: 35px;
                    &.bar1{
                        transform: rotate(45deg);
                    }
                    &.bar2{
                        transform: rotate(135deg);
                    }
                    &.bar3{
                        opacity: 0;
                        transform: rotate(45deg);
                    }
                }
            }
        }
        .nav{
            justify-content: flex-end;
        }
    }
}
/* [PC] =================== */
@include media-breakpoint-up(md){
    .header{
        .navbar{
            .menu{
                &:hover{
                    .bar{
                        background-color: $primary;
                    }
                }
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .header{
        height: 80px;
        .navbar{
            .menu{
                &.on{
                    .bar{
                        background-color: $primary;
                    }
                    +.nav{
                        opacity: 1;
                        height: 100vh;
                    }
                }
            }
            .nav{
                flex-direction: column;
                flex-wrap: nowrap;
                align-content: center;
                justify-content: center;
                align-items: center;
                gap: $spacer;
                opacity: 0;
                width: 100vw;
                height: 0;
                position: fixed;
                left: 0;
                bottom: 0;
                z-index: $nav-z-index;
                background-color: $dark;
                transition: $transition-base;
                .nav-item{
                    .nav-link:not(:hover){
                        color: $white;
                    }
                }
            }
        }
    }
}
</style>