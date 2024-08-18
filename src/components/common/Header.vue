<template>
    <!-- NOTE: RouterLink
        [참고] https://router.vuejs.kr/guide/essentials/active-links.html
        to: 라우터 설정(/src/routes/index.js)에 선언된 페이지 중 path 와 일치하는 페이지로 이동시킨다
        active-class: 클릭시 활성화되는 클래스를 지정한다.
            기본값: router-link-active

        $route : 페이지 정보 속성을 가지는 객체(fullPath, params, ...)
        $router: 페이지 조작을 위한 메소드를 가지는 객체(push, back, ...)
    -->
    <header
        class="header d-block w-100 position-fixed top-0 start-0"
        :class="{ 'text-white': $store.state.themeColor.whiteNav }">
        <nav class="container d-flex justify-content-between align-items-center w-100 h-100 py-0 position-relative">
            <Logo @click="closeNav" />
            <button
                class="menu d-block d-md-none p-0 border-0 position-absolute top-50 translate-middle-y bg-transparent"
                :class="{ on: showNav }"
                @click="toggleNav">
                <div
                    v-for="i in 3"
                    :key="i"
                    :class="['bar', 'bar'+i, 'rounded']"></div>
            </button>
            <ul class="nav">
                <li
                    class="btn btn-them d-flex p-0 border border-dark rounded-pill overflow-hidden"
                    :class="{ on: isDark }"
                    @click="toggleThem">
                    <font-awesome-icon
                        icon="fa-solid fa-sun"
                        class="icon sun d-block w-50 h-100 position-relative z-1" />
                    <font-awesome-icon
                        icon="fa-solid fa-moon"
                        class="icon moon d-block w-50 h-100 position-relative z-1" />
                </li>
                <li
                    class="nav-item"
                    v-for="(navigation, i) in navigations"
                    :key="i"
                    @click="closeNav">
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
    data() {
        return {
            showNav: false,
            navColor: false,
        }
    },
    computed: {
        navigations() {
            return this.$router.getRoutes()
                .filter(route => !route.meta.isHide)
                .map(route => {
                    const { name, path } = route
                    const nav = { name, path }
                    if(name == 'Projects') {
                        nav.path = '/projects'
                        nav.regx = /^\/projects/
                    }
                    return nav
                })
        },
        beforeNavColor: {
            get(){ // 일반적으로 호출 시 실행된다
                return this.navColor
            },
            set(value){ // 호출 후 값을 할당 시 실행된다
                if(value != null) {
                    this.navColor = value
                }else{
                    this.navColor = this.$store.state.themeColor.whiteNav
                }
            }
        },
        isDark() {
            return this.$store.state.themeColor.isDark
        }
    },
    methods: {
        isMatch(regx) {
            if(!regx) return false
            return regx.test(this.$route.fullPath) // 정규표현식의 test 함수를 사용하여 포함여부 반환
        },
        toggleNav() {
            // PC일 경우 작동 안함
            if(window.innerWidth > 768) return
            this.showNav = !this.showNav // 메뉴 아이콘 토글
            // 메뉴를 보여준다면
            if(this.showNav){
                this.beforeNavColor = this.$store.state.themeColor.whiteNav // 기존 색상 저장
                this.$store.dispatch('themeColor/setNavColor', { whiteNav: true })
            } else{
                // 메뉴를 숨긴다면 기존 색상으로 변환
                this.$store.dispatch('themeColor/setNavColor', { whiteNav: this.beforeNavColor })
            }
        },
        closeNav() {
            this.showNav = false
        },
        toggleThem() {
            this.$store.dispatch('themeColor/setThemeColor', {isDark: !this.$store.state.themeColor.isDark})
        }
    },
}
</script>

<style lang="scss" scoped>
.header{
    height: 100px;
    z-index: 99;
    .container{
        .nav{
            align-items: center;
            justify-content: flex-end;
            .btn-them{
                $icon-size: 30px;
                width: $icon-size * 2;
                height: $icon-size;
                position: relative;
                background-color: $primary;
                transition: $transition-fast;
                &::before{
                    content: '';
                    display: block;
                    width: 50%;
                    height: 100%;
                    // border: 1px solid $gray-200;
                    border-radius: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: #fff;
                    transition: $transition-fast;
                }
                .icon{
                    padding: 10%;
                    box-sizing: border-box;
                    transition: $transition-fast;
                    &.sun{
                        color: #ffa500;
                    }
                    &.moon{
                        color: $dark;
                    }
                }
                &.on{
                    background-color: $dark;
                    &::before{
                        left: 50%;
                    }
                    .icon{
                        &.sun{
                            color: #fff;
                        }
                    }
                }
            }
            .nav-item{
                .nav-link:not(:hover){
                    color: inherit;
                }
            }
        }
    }
}
/* [PC] =================== */
@include media-breakpoint-up(md){
    .header{
        .container{
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
        &.text-white{
            .container{
                .menu{
                    .bar{
                        background-color: $white;
                    }
                }
            }
        }
        .container{
            // 햄버거 아이콘
            .menu{
                width: 30px;
                height: 25px;
                right: 15px;
                transition: $transition-base;
                .bar{
                    width: 30px;
                    height: 3px;
                    position: absolute;
                    background-color: var(--bs-body-color);
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
                        background-color: $primary;
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
                z-index: -1;
                background-color: var(--bs-dark);
                transition: $transition-base;
            }
        }
    }
}
</style>