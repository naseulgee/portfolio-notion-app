<template>
    <section
        v-if="!portfolio"
        class="container vh-min-100">
        <Loader
            position="fixed"
            :size="5" />
    </section>
    <section v-else>
        <!-- s: 인트로 -->
        <section
            class="bg-dark text-white"
            data-them="dark">
            <article class="cover position-relative">
                <div class="cover-img w-100 h-100 position-absolute top-0 left-0">
                    <NotionObj
                        class-nm="w-100 h-100"
                        :prop="portfolio.cover"
                        dec="cover" />
                </div>
                <div class="container d-flex flex-column align-content-start justify-content-center w-100 h-100 min-vh-100 py-4 position-relative z-1 text-white text-left">
                    <ArrowBottomBtn is-bg-color>
                        <NotionObj
                            class-nm="p-0"
                            child-class="m-0"
                            :prop="pfprop['분류']"
                            dec="분류" />
                        <template #title>
                            <h1>
                                <NotionObj
                                    :prop="pfprop['프로젝트명']"
                                    dec="프로젝트명" />
                            </h1>
                        </template>
                    </ArrowBottomBtn>
                    <p class="dec">
                        <NotionObj
                            :prop="pfprop['소개']"
                            dec="소개" />
                    </p>
                    <ul class="d-flex mt-5 mb-0 p-0">
                        <li
                            v-if="pfprop['URL'].url"
                            class="me-2">
                            <LinkBtn>
                                <a
                                    class="text-white text-decoration-none"
                                    :href="pfprop['URL'].url"
                                    target="_blank">
                                    URL
                                </a>
                            </LinkBtn>
                        </li>
                        <li v-if="pfprop['Github'].url">
                            <LinkBtn>
                                <a
                                    class="text-white text-decoration-none"
                                    :href="pfprop['Github'].url"
                                    target="_blank">
                                    Github
                                </a>
                            </LinkBtn>
                        </li>
                    </ul>
                </div>
            </article>
            <ul class="black-line container d-flex flex-wrap justify-content-between align-items-start py-4">
                <li>
                    <strong class="d-block fw-normal">Date</strong>
                    <NotionObj
                        class-nm="opacity-50"
                        :prop="pfprop['기간']"
                        dec="기간" />
                </li>
                <li>
                    <strong class="d-block fw-normal">In charge</strong>
                    <NotionObj
                        class-nm="opacity-50 list-inline"
                        child-class="list-inline-item"
                        :prop="pfprop['담당분야']"
                        dec="담당분야" />
                </li>
                <li>
                    <strong class="d-block fw-normal">Targets</strong>
                    <NotionObj
                        class-nm="opacity-50 list-inline"
                        child-class="list-inline-item"
                        :prop="pfprop['사용대상']"
                        dec="사용대상" />
                </li>
                <li>
                    <strong class="d-block fw-normal">Benchmarking</strong>
                    <NotionObj
                        class-nm="opacity-50"
                        :prop="pfprop['벤치마킹']"
                        dec="벤치마킹" />
                </li>
            </ul>
        </section>
        <!-- e: 인트로 -->

        <!-- s: 목표 -->
        <section
            class="purpose container pt-5"
            data-them="white">
            <article>
                <h2 class="mb-4 fs-3">
                    Project<br />
                    Challenge
                </h2>
                <p>
                    <NotionObj
                        :prop="pfprop['목적']"
                        dec="목적" />
                </p>
            </article>
            <div class="d-flex flex-wrap justify-content-between align-items-start">
                <article class="did mt-3 mb-5">
                    <p class="mb-2">
                        <font-awesome-icon icon="fa-solid fa-angles-right" />
                        What I did
                    </p>
                    <div>
                        <NotionObj
                            :prop="pfprop['담당기능']"
                            dec="담당기능" />
                    </div>
                </article>
                <article class="participate mb-5 text-center">
                    <ProgressCircle
                        :percent="pfprop['기여도'].number"
                        size="30vw"
                        stroke="0.8em" />
                    <span class="d-block mt-2">
                        <NotionObj
                            :prop="pfprop['참여인원']"
                            dec="참여인원" />명 참여
                    </span>
                </article>
            </div>
        </section>
        <!-- e: 목표 -->

        <!-- s: 배너 이미지 -->
        <section
            v-if="addImg.point"
            class="point-bg cover w-100 position-relative"
            :style="{ background: `url(${addImg.point.url}) center/cover no-repeat fixed` }"
            data-them="dark">
        </section>
        <!-- e: 배너 이미지 -->

        <!-- s: 개발환경 -->
        <section class="stack-wrap container my-5">
            <h2>
                Development<br />
                environment
            </h2>
            <ul class="my-4 p-0">
                <template
                    v-for="(stack, i) in stacks"
                    :key="i">
                    <li
                        v-if="pfprop[stack]?.relation.length != 0"
                        class="d-flex flex-wrap align-items-center mb-2">
                        <h3 class="m-0 fs-4">
                            {{ stack }}
                        </h3>
                        <div
                            class="icon-wrap text-center"
                            v-for="relStack in pfprop[stack]?.relation"
                            :key="relStack.id">
                            <i class="d-block mx-auto">
                                <NotionObj
                                    :prop="stackList[relStack.id]?.icon"
                                    :dec="stackList[relStack.id]?.properties.name.title[0].plain_text + ' icon'" />
                            </i>
                            <span>{{ stackList[relStack.id]?.properties.name.title[0].plain_text }}</span>
                        </div>
                    </li>
                </template>
            </ul>
        </section>
        <!-- e: 개발환경 -->

        <!-- s: 구조 이미지 -->
        <section class="slide">
            {{ console.log("addImg:::", addImg) }}
        </section>
        <!-- e: 구조 이미지 -->

        <!-- s: 성장 포인트 -->
        <section class="container">
            <h2>
                Development<br />
                environment
            </h2>
            <NotionObj
                :prop="pfprop['성장포인트']"
                dec="성장포인트" />
        </section>
        <!-- e: 성장 포인트 -->
        <!-- <article>
            <div>
                <strong>icon :: </strong>
                <NotionObj
                    :prop="portfolio.icon"
                    dec="icon" />
            </div>
            <div>
                <strong>wbs-1-주제선정 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-1-주제선정']"
                    dec="wbs-1-주제선정" />
            </div>
            <div>
                <strong>wbs-2-기능정리 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-2-기능정리']"
                    dec="wbs-2-기능정리" />
            </div>
            <div>
                <strong>wbs-3-화면구성 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-3-화면구성']"
                    dec="wbs-3-화면구성" />
            </div>
            <div>
                <strong>wbs-4-DB설계 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-4-DB설계']"
                    dec="wbs-4-DB설계" />
            </div>
            <div>
                <strong>wbs-5-제안서 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-5-제안서']"
                    dec="wbs-5-제안서" />
            </div>
            <div>
                <strong>wbs-6-구조정리 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-6-구조정리']"
                    dec="wbs-6-구조정리" />
            </div>
            <div>
                <strong>wbs-7-페이지제작 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-7-페이지제작']"
                    dec="wbs-7-페이지제작" />
            </div>
            <div>
                <strong>wbs-8-기능시연 :: </strong>
                <NotionObj
                    :prop="pfprop['wbs-8-기능시연']"
                    dec="wbs-8-기능시연" />
            </div>
            <div>
                <strong>요구사항정의서URL :: </strong>
                <NotionObj
                    :prop="pfprop['요구사항정의서URL']"
                    dec="요구사항정의서URL" />
            </div>
            <div>
                <strong>화면구성URL :: </strong>
                <NotionObj
                    :prop="pfprop['화면구성URL']"
                    dec="화면구성URL" />
            </div>
            <div>
                <strong>DB설계URL :: </strong>
                <NotionObj
                    :prop="pfprop['DB설계URL']"
                    dec="DB설계URL" />
            </div>
            <div>
                <strong>제안서URL :: </strong>
                <NotionObj
                    :prop="pfprop['제안서URL']"
                    dec="제안서URL" />
            </div>
            <div>
                <strong>WBS상세URL :: </strong>
                <NotionObj
                    :prop="pfprop['WBS상세URL']"
                    dec="WBS상세URL" />
            </div>
    
            <div>
                <strong>img :: </strong>
                <NotionObj
                    v-for="imgProps in addImg"
                    :key="imgProps.id"
                    :prop="imgProps.img" />
            </div>
        </article> -->
    </section>
</template>

<script>
import NotionObj from '~/components/notion/NotionObj'
import Loader from '~/components/common/Loader'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import LinkBtn from '~/components/common/buttons/LinkBtn'
import ProgressCircle from '~/components/common/ProgressCircle'

export default {
    components: {
        NotionObj,
        Loader,
        ArrowBottomBtn,
        LinkBtn,
        ProgressCircle,
    },
    data() {
        return {
            stacks: [
                'Design',
                'Front',
                'Back',
                'DB',
                'Test',
                'IDE',
                'Server',
            ]
        }
    },
    computed: {
        portfolio() {
            return this.$store.getters['notion/portfolio'](this.$route.params.id)
        },
        pfprop() {
            return this.portfolio.properties
        },
        stackList() {
            return this.$store.state.notion.stackList
        },
        addImg() {
            return this.$store.state.notion.addImages
        }
    },
    methods: {
        showImgs() {
            this.$store.dispatch('notion/searchAddImages', {
                database_id: this.$route.params.id,
                // type: "usecase"
            })
        },
    },
    mounted() {
        this.showImgs()
    },
}
</script>

<style lang="scss" scoped>
.cover{
    &::before{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(var(--bs-dark-rgb), .7);
        z-index: 1;
    }
}
.black-line{
    gap: $spacer;
}
.purpose{
    .did{
        width: 50%;
    }
    .participate{
        width: 50%;
    }
}
.point-bg{
    height: 20vw;
}
.stack-wrap{
    ul{
        li{
            gap: $spacer * 0.5;
            h3{
                min-width: 150px;
            }
            .icon-wrap{
                i{
                    width: 50px;
                    height: 50px;
                }
                span{
                    font-size: 10px;
                }
            }
        }
    }
}
/* [PC] =================== */
@include media-breakpoint-up(xl){
    .black-line{
        li{
            max-width: 250px;
        }
    }
}
/* [TAB] =================== */
@include media-breakpoint-down(xl){
    .black-line{
        li{
            width: calc(50% - $spacer);
        }
    }
    .stack-wrap{
        ul{
            li{
                h3{
                    width: 100%;
                }
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .black-line{
        li{
            width: 100%;
        }
    }
    .purpose{
        .did{
            width: 100%;
        }
        .participate{
            width: 100%;
        }
    }
}
</style>