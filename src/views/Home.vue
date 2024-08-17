<template>
    <!-- s: 인트로 -->
    <section
        class="w-100 vh-100 bg-dark text-white"
        data-them="dark">
        <AboutIntro :class-obj="aboutIntroClass">
            <LinkBtn>
                <RouterLink
                    class="text-white text-decoration-none"
                    to="/about-me">
                    About Me
                </RouterLink>
            </LinkBtn>
        </AboutIntro>
    </section>
    <!-- e: 인트로 -->
    <!-- s: 프로젝트 -->
    <section class="w-100 min-vh-100 py-5">
        <PjtIntro :class-obj="pjtIntroClass" />
        <SloganSlide next="Projects" />
        <div class="container">
            <RouterLink
                class="d-inline-block text-hover-none text-decoration-none"
                to="/projects">
                <h2 class="mt-5 mb-4 fs-4">
                    프로젝트를<br />
                    더 보고 싶으신가요?
                </h2>
                <LinkBtn>
                    <span>View all portfolios</span>
                </LinkBtn>
            </RouterLink>
        </div>
    </section>
    <!-- e: 프로젝트 -->
    <!-- s: 작업 포인트 -->
    <section
        class="work-point-wrap w-100 py-5 position-relative bg-dark text-white text-center"
        data-them="dark">
        <div class="work-point-inner-wrap position-relative">
            <WorkPointIntro :class-obj="WorkPointIntroClass" />
            <div class="shape-wrap">
                <img src="~/assets/images/main/shape-1.png" />
                <img src="~/assets/images/main/shape-2.png" />
                <img src="~/assets/images/main/shape-3.png" />
                <img src="~/assets/images/main/shape-1.png" />
                <img src="~/assets/images/main/shape-2.png" />
                <img src="~/assets/images/main/shape-3.png" />
            </div>
        </div>
        <WorkPointList />
    </section>
    <!-- e: 작업 포인트 -->
    <!-- s: 풋터 슬로건 -->
    <RouterLink
        class="text-hover-none text-decoration-none"
        to="/projects">
        <div class="container mt-4">
            <ArrowBottomBtn>
                View all portfolios
            </ArrowBottomBtn>
        </div>
        <SloganSlide />
    </RouterLink>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import SloganSlide from '~/components/common/SloganSlide'
import LinkBtn from '~/components/common/buttons/LinkBtn'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import AboutIntro from '~/components/about/Intro'
import WorkPointIntro from '~/components/about/WorkPointIntro'
import WorkPointList from '~/components/about/WorkPointList'
import PjtIntro from '~/components/projects/Intro'

export default {
    components: {
        SloganSlide,
        LinkBtn,
        ArrowBottomBtn,
        AboutIntro,
        WorkPointIntro,
        WorkPointList,
        PjtIntro,
    },
    data() {
        return {
            aboutIntroClass: {
                containerClass: [
                    'd-flex',
                    'flex-column',
                    'flex-wrap',
                    'justify-content-center',
                    'align-items-start',
                    'h-100',
                ],
                titleClass: [
                    'mt-1',
                    'mb-3',
                    'fs-2',
                ],
                subtitleClass: [
                    'opacity-50',
                ],
                decClass: [
                    'mb-4',
                ],
            },
            pjtIntroClass: {
                containerClass: [],
                titleClass: [
                    'fs-4',
                ],
                decClass: [
                    'mb-4',
                ],
            },
            WorkPointIntroClass: {
                containerClass: [
                    'container',
                    'd-flex',
                    'flex-column',
                    'flex-wrap',
                    'justify-content-center',
                    'align-items-center',
                    'min-vh-100',
                    'position-sticky',
                    'top-0',
                    'start-0',
                    'z-1',
                ],
                titleClass: [],
                decClass: [],
            },
        }
    },
}
</script>

<style lang="scss" scoped>
.work-point-wrap{
    z-index: -1;
    text-shadow: 0 0 1.5em rgba(var(--bs-dark-rgb), var(--bs-bg-opacity));
    .work-point-inner-wrap{
        height: 200vh;
        .shape-wrap{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                &:nth-child(n+4){
                    transform: translateX(-50%) rotate(180deg);
                }
                &:nth-child(1){
                    top: -17%;
                    z-index: 2;
                }
                &:nth-child(2){
                    top: -7%;
                }
                &:nth-child(3){
                    top: -19%;
                }
                &:nth-child(4){
                    bottom: -10%;
                }
                &:nth-child(5){
                    bottom: -23%;
                }
                &:nth-child(6){
                    bottom: -31%;
                }
            }
        }
    }
}
</style>