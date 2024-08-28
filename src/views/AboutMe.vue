<template>
    <!-- s: 인트로 -->
    <section
        class="intro w-100 min-vh-100 bg-dark text-white"
        data-them="dark">
        <Intro :class-obj="introClass" />
    </section>
    <!-- e: 인트로 -->

    <SloganSlide
        next="About Me"
        data-them="white" />
    
    <!-- s: 작업 포인트 -->
    <section
        class="work-point-wrap container w-100 py-5 text-center"
        data-them="white">
        <WorkPointIntro :class-obj="WorkPointIntroClass" />
        <WorkPointList />
    </section>
    <!-- e: 작업 포인트 -->

    <!-- s: 스킬목록 -->
    <section
        class="py-5 overflow-hidden bg-dark text-white"
        data-them="dark">
        <SkilList />
    </section>
    <!-- e: 스킬목록 -->

    <!-- s: 풋터 슬로건 -->
    <section class="overflow-hidden">
        <RouterLink
            class="text-hover-none text-decoration-none"
            to="/projects">
            <div class="container mt-5">
                <ArrowBottomBtn>
                    Projects
                </ArrowBottomBtn>
            </div>
            <SloganSlide />
        </RouterLink>
    </section>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import Intro from '~/components/about/Intro'
import WorkPointIntro from '~/components/about/WorkPointIntro'
import WorkPointList from '~/components/about/WorkPointList'
import SkilList from '~/components/about/SkilList'
import SloganSlide from '~/components/common/slogan/SloganSlide'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'

export default {
    components: {
        Intro,
        WorkPointIntro,
        WorkPointList,
        SkilList,
        SloganSlide,
        ArrowBottomBtn,
    },
    data() {
        return {
            introClass: {
                containerClass: [
                    'd-flex',
                    'flex-column',
                    'justify-content-center',
                    'align-items-start',
                    'min-vh-100',
                    'text-break',
                ],
                titleClass: [
                    'w-100',
                    'mt-1',
                    'mb-3',
                    'fs-2',
                ],
                subtitleClass: [
                    'opacity-50',
                ],
                decClass: [
                    'mt-4',
                    'w-50',
                    'ms-md-auto',
                ],
            },
            WorkPointIntroClass: {
                containerClass: [],
                titleClass: [
                    'fs-6'
                ],
                decClass: [
                    'opacity-50',
                    'mb-4'
                ],
            },
        }
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
}
</script>

<style lang="scss" scoped>
.intro{
    background: url('~assets/images/about/geometric-bg.jpg') center/cover no-repeat fixed;
}
</style>