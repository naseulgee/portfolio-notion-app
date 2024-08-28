<template>
    <Loading
        v-if="isLoading"
        :time="loadingOffTime" />
    <MainHeader />

    <main>
        <!-- NOTE: 레이아웃 컴포넌트를 호출한 부분에서 내부에 작성한 컴포넌트가 전달되어 그려진다. -->
        <slot></slot>
    </main>
    <Modal />

    <MainFooter />
</template>

<script>
import Loading from "~/views/Loading"
import MainHeader from "~/components/common/Header"
import MainFooter from "~/components/common/Footer"
import Modal from '~/components/common/Modal'

export default {
    components: {
        Loading,
        MainHeader,
        MainFooter,
        Modal,
    },
    data() {
        return {
            observer: null,
            obsOption: {
                root: null,
                threshold: [0, 1],
            },
            loadingOffTime: 5, // s
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.loadingPage.isLoading
        },
    },
    methods: {
        initObserver(targets){
            // 기존 관찰자 제거
            if(this.observer != null) this.observer.disconnect()
            // 네비게이션 색상 초기화
            this.$store.dispatch('themeColor/setNavColor', { whiteNav: false })

            // 전달 대상이 없을 경우 함수 종료
            if(!targets || targets.length == 0) return

            // 관찰자 생성
            this.observer = new IntersectionObserver(this.observing, this.obsOption);
            // 관찰 등록
            targets.forEach(target => {
                this.observer.observe(target);
            })
        },
        observing(entries, observer) { // 타겟이 관찰될 때 마다 실행되는 콜백함수
            entries.forEach(entry => {
                const { target, isIntersecting } = entry
                const isShow   = isIntersecting // 화면에 보이는지
                const overHead = target.getBoundingClientRect().top <= 0 // 상단이 브라우저 상단과 닿아있는지

                if(isShow && overHead) {
                    this.$store.dispatch('themeColor/setNavColor', { whiteNav: target.dataset.them == 'dark' })
                } else {
                    const nextTarget = target.nextElementSibling
                    if(nextTarget){
                        this.$store.dispatch('themeColor/setNavColor', { whiteNav: nextTarget.dataset.them == 'dark' })
                    }
                }
            })
        },
    },
    created() {
        // 필요한 데이터 다 가져오기
        this.$store.dispatch('notion/searchPortfolios')
        this.$store.dispatch('notion/searchFilterList')
        this.$store.dispatch('notion/searchStackList')
    },
    async mounted() {
        await this.$nextTick() // DOM load 후
        // 5초 뒤 로딩화면 종료
        setTimeout(() => {
            this.$store.dispatch('loadingPage/changeLoading', { isLoading: false })
        }, this.loadingOffTime * 1000)
    },
    async updated() {
        // slot 에 보여주는 컴포넌트가 바뀔 때 마다 실행
        await this.$nextTick() // DOM load 후
        this.initObserver(document.querySelectorAll('[data-them]'))
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