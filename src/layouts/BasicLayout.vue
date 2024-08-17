<template>
    <MainHeader />

    <main>
        <!-- NOTE: 레이아웃 컴포넌트를 호출한 부분에서 내부에 작성한 컴포넌트가 전달되어 그려진다. -->
        <slot></slot>
    </main>

    <MainFooter />
</template>

<script>
import MainHeader from "~/components/common/Header"
import MainFooter from "~/components/common/Footer"

export default {
    components: {
        MainHeader,
        MainFooter,
    },
    methods: {
        reg_observer(){
            // 타겟 지정
            const targets = document.querySelectorAll('[data-them]')
            // // const targets = document.querySelectorAll('article')

            const firstIsDark = targets[0] && targets[0].offsetTop == 0
            this.$store.dispatch('themeColor/setNavColor', { whiteNav: firstIsDark }) // 네비게이션 색상 변경

            // 타겟이 관찰될 때 마다 실행되는 콜백함수
            const handler = (entries, observer) => {
                entries.forEach(entry => {
                    console.log(entry.target.querySelector(".title").innerText, entry.isIntersecting, entry.target.dataset.them)
                    // let flag = entry.target.dataset.them == 'dark'
                    // // if(flag) document.documentElement.classList.toggle('dark', entry.isIntersecting);
                    // this.$store.dispatch('themeColor/setThemeColor', { isDark: flag })
                });
            }

            // 관찰자 생성
            const observer = new IntersectionObserver(handler);
            // 관찰 등록
            targets.forEach(target => {
                observer.observe(target);
            });
        }
    },
    updated() {
        console.log("updated")
        // 관찰 이벤트 제거
        // 관찰 이벤트 생성
        this.reg_observer()
    },
}
</script>

<!-- NOTE: 전역으로 적용되어야 하기 때문에 scoped를 명시하지 않는다. -->
<style lang="scss">
body {
    main {
        // min-height: $vh-HF;
        // padding-top: $headerH;
        box-sizing: content-box;
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    body {
        main {
            // min-height: $vh-HF;
            padding-top: 0;
        }
        footer{
            // padding-bottom: $headerH;
        }
    }
}
</style>