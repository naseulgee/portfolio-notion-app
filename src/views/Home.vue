<template>
    <!-- s: 인트로 -->
    <section
        class="intro-wrap w-100 min-vh-100 position-relative bg-dark text-white"
        data-them="dark">
        <AboutIntro
            ref="aboutIntro"
            :class-obj="aboutIntroClass" />
        <div
            class="skill-bg d-flex flex-wrap align-content-around justify-content-around w-100 h-100 overflow-hidden position-absolute top-0 start-0"
            :style="{'--stackSize': stackSize + 'px'}">
            <template
                v-for="stack of stackList"
                :key="stack.id">
                <img
                    v-if="stack.icon.file"
                    :src="stack.icon.file.url"
                    :alt="stack.name"
                    :style="{'--delay': Math.floor(Math.random() * stackList.length) / 10 + 's'}" />
            </template>
        </div>
    </section>
    <!-- e: 인트로 -->
    <!-- s: 분석 차트 -->
    <section
        class="analysis-wrap container w-100 py-5"
        data-them="white">
        <CharacterChart />
    </section>
    <!-- e: 분석 차트 -->
    <!-- s: 작업 포인트 -->
    <section
        class="work-point-wrap w-100 position-relative bg-dark text-white text-center"
        data-them="dark">
        <div class="work-point-inner-wrap position-relative">
            <div class="d-flex flex-wrap align-content-center justify-content-center align-item-center min-vh-100 position-sticky top-0 start-0 z-1">
                <WorkPointList />
            </div>
            <div class="shape-wrap">
                <img
                    src="~/assets/images/main/shape-1.png"
                    alt="shape-1" />
                <img
                    src="~/assets/images/main/shape-2.png"
                    alt="shape-2" />
                <img
                    src="~/assets/images/main/shape-3.png"
                    alt="shape-3" />
                <img
                    src="~/assets/images/main/shape-1.png"
                    alt="shape-1" />
                <img
                    src="~/assets/images/main/shape-2.png"
                    alt="shape-2" />
                <img
                    src="~/assets/images/main/shape-3.png"
                    alt="shape-3" />
            </div>
        </div>
        <!-- s: 성과 -->
        <div class="performance-wrap w-100 py-5 text-start">
            <Performance />
        </div>
        <!-- e: 성과 -->
    </section>
    <!-- e: 작업 포인트 -->
    <!-- s: 스킬 리스트 -->
    <section
        class="skil-list-wrap w-100 py-5 overflow-hidden text-center"
        data-them="white">
        <SkilList />
    </section>
    <!-- e: 스킬 리스트 -->
    <!-- s: 프로젝트 -->
    <section
        class="w-100 min-vh-100 py-5 bg-dark text-white"
        data-them="dark">
        <PjtIntro :class-obj="pjtIntroClass" />
        <SloganSlide next="Projects" />
        <div class="container text-end">
            <LinkBtn>
                <RouterLink
                    class="d-inline-block text-white text-hover-none text-decoration-none"
                    to="/projects">
                    <span>View all portfolios</span>
                </RouterLink>
            </LinkBtn>
        </div>
        <div class="mt-4">
            <PortfolioList :limit="4" />
        </div>
        <div class="container">
            <h2 class="mt-5 mb-4 fs-4">
                프로젝트를<br />
                더 보고 싶으신가요?
            </h2>
            <LinkBtn>
                <RouterLink
                    class="d-inline-block text-white text-hover-none text-decoration-none"
                    to="/projects">
                    <span>View all portfolios</span>
                </RouterLink>
            </LinkBtn>
        </div>
    </section>
    <!-- e: 프로젝트 -->
    <!-- s: 풋터 슬로건 -->
    <section class="overflow-hidden">
        <RouterLink
            class="text-hover-none text-decoration-none"
            to="/contact">
            <div class="container mt-4">
                <ArrowBottomBtn>
                    Contact
                </ArrowBottomBtn>
            </div>
            <SloganSlide next="Contact" />
        </RouterLink>
    </section>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import SloganSlide from '~/components/common/slogan/SloganSlide'
import LinkBtn from '~/components/common/buttons/LinkBtn'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import AboutIntro from '~/components/about/Intro'
import CharacterChart from '~/components/about/CharacterChart'
import WorkPointList from '~/components/about/WorkPointList'
import Performance from '~/components/about/Performance'
import SkilList from '~/components/about/SkilList'
import PjtIntro from '~/components/projects/Intro'
import PortfolioList from '~/components/projects/PortfolioList'

export default {
    components: {
        SloganSlide,
        LinkBtn,
        ArrowBottomBtn,
        CharacterChart,
        AboutIntro,
        WorkPointList,
        Performance,
        SkilList,
        PjtIntro,
        PortfolioList,
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
                    'min-vh-100',
                    'position-relative',
                    'z-1'
                ],
                titleClass: [
                    'mt-1',
                    'mb-3',
                    'fs-2',
                ],
                subtitleClass: [
                    'mt-4',
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
        }
    },
    computed: {
        stackList() {
            return this.$store.state.notion.stackFList.filter(stack => {
                if(['Design', 'Front', 'Back', 'DB'].includes(stack.name)) return []
            }).map(stack => {
                const options = stack.multi_select.options
                return options.filter(option => {
                    if(!option.hide) return option
                })
            }).flat()
        },
        stackSize() {
            const winW = window.innerWidth
            const winH = window.innerHeight
            const stackCnt = this.stackList.length
            return stackCnt > 0 ? Math.floor(Math.sqrt((winW * winH) / stackCnt)) - 20 : 0
        },
    },
    mounted(){
        // 타이핑 효과 추가
        this.$typing(this.$refs.aboutIntro.$refs.title, [
            'Designer,',
            'Front-End,',
            'Back-End,',
            'Full-stack Developer.',
        ])
    },
    unmounted() {
        // 페이지 이동 시 타이핑 효과 제거
        clearTimeout(this.$typing)
    }
}
</script>

<style lang="scss" scoped>
@keyframes _ani_glitter {
    0%   { opacity: 0.05; }
    70% { opacity: 0.2; }
}

.intro-wrap{
    .title{
        &::after{
            content: '';
            display: inline-block;
        }
    }
    .skill-bg{
        img{
            width: var(--stackSize);
            height: var(--stackSize);
            padding: $spacer * 0.5;
            object-fit: contain;
            opacity: 0.1;
            animation: _ani_glitter 1.5s var(--delay) ease-in-out infinite;
        }
    }
}
.work-point-wrap{
    z-index: -1;
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
                    top: 8%;
                }
                &:nth-child(6){
                    bottom: -31%;
                }
            }
        }
    }
}
</style>