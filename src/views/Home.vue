<template>
    <!-- s: 인트로 -->
    <section
        class="intro-wrap w-100 vh-100 position-relative bg-dark text-white"
        data-them="dark">
        <AboutIntro
            ref="aboutIntro"
            :class-obj="aboutIntroClass">
            <LinkBtn>
                <RouterLink
                    class="text-white text-decoration-none"
                    to="/about-me">
                    About Me
                </RouterLink>
            </LinkBtn>
        </AboutIntro>
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
    <!-- s: 프로젝트 -->
    <section
        class="w-100 min-vh-100 py-5"
        data-them="white">
        <PjtIntro :class-obj="pjtIntroClass" />
        <SloganSlide next="Projects" />
        <div class="mt-4">
            <PortfolioList :limit="4" />
        </div>
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
    <section>
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
    </section>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import SloganSlide from '~/components/common/slogan/SloganSlide'
import LinkBtn from '~/components/common/buttons/LinkBtn'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import AboutIntro from '~/components/about/Intro'
import WorkPointIntro from '~/components/about/WorkPointIntro'
import WorkPointList from '~/components/about/WorkPointList'
import PjtIntro from '~/components/projects/Intro'
import PortfolioList from '~/components/projects/PortfolioList'

export default {
    components: {
        SloganSlide,
        LinkBtn,
        ArrowBottomBtn,
        AboutIntro,
        WorkPointIntro,
        WorkPointList,
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
                    'h-100',
                    'position-relative',
                    'z-1'
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
    text-shadow: 0 0 1.5em var(--bs-dark);
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