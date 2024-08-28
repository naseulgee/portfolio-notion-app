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
                <div class="container d-flex flex-column align-content-start justify-content-center w-100 h-100 min-vh-100 py-5 py-md-4 position-relative z-1 text-white text-left">
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
                    <div class="logo mb-n4 mb-md-n3 me-2 position-absolute bottom-0 end-0">
                        <NotionObj
                            :prop="portfolio.icon"
                            dec="icon" />
                    </div>
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
        <section
            class="stack-wrap container my-5"
            data-them="white">
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
        <section
            v-if="addImg.usecase?.length + addImg.erd?.length + addImg.pjtstruc?.length > 0"
            class="slide mt-5 position-relative"
            data-them="dark"
            @click="$refs.drag.$el.remove()"
            @touchstart="$refs.drag.$el.remove()">
            <font-awesome-icon
                ref="drag"
                class="position-absolute top-50 start-50 z-2 translate-middle fs-1 text-primary fa-beat-fade"
                icon="fa-solid fa-arrow-right-arrow-left" />
            <ul class="d-flex px-2 pb-3">
                <!-- Usecase -->
                <li
                    v-for="img in addImg.usecase"
                    :key="img.id"
                    class="hover-box"
                    @click="showModal">
                    <div class="cover w-100 h-100">
                        <img
                            class="hover-box-img"
                            :src="img.url"
                            :alt="img.pagedec" />
                    </div>
                    <div class="hover-box-info">
                        <ArrowBottomBtn color="#fff">
                            <h2 class="subtitle fs-4">
                                Use Case Diagram
                            </h2>
                        </ArrowBottomBtn>
                    </div>
                </li>
                <!-- ER -->
                <li
                    v-for="img in addImg.erd"
                    :key="img.id"
                    class="hover-box"
                    @click="showModal">
                    <div class="cover w-100 h-100">
                        <img
                            class="hover-box-img"
                            :src="img.url"
                            :alt="img.pagedec" />
                    </div>
                    <div class="hover-box-info">
                        <ArrowBottomBtn color="#fff">
                            <h2 class="subtitle fs-4">
                                ER Diagram
                            </h2>
                        </ArrowBottomBtn>
                    </div>
                </li>
                <!-- 구조 -->
                <li
                    v-for="img in addImg.pjtstruc"
                    :key="img.id"
                    class="hover-box"
                    @click="showModal">
                    <div class="cover w-100 h-100">
                        <img
                            class="hover-box-img"
                            :src="img.url"
                            :alt="img.pagedec" />
                    </div>
                    <div class="hover-box-info">
                        <ArrowBottomBtn color="#fff">
                            <h2 class="subtitle fs-4">
                                프로젝트 구조
                            </h2>
                        </ArrowBottomBtn>
                    </div>
                </li>
            </ul>
        </section>
        <!-- e: 구조 이미지 -->

        <!-- s: WBS -->
        <section
            v-if="isExWbs || isExUrl"
            class="wbs py-5 bg-dark text-white"
            data-them="dark">
            <article
                v-if="isExWbs"
                class="container">
                <h3>
                    WBS
                    <small class="fs-6">
                        <NotionObj
                            class-nm="opacity-50"
                            :prop="pfprop['기간']"
                            dec="기간" />
                    </small>
                </h3>
                <!-- WBS 일정표 -->
                <div
                    class="d-grid text-nowrap"
                    :style="{
                        'grid-template-columns': `repeat(${workday + 1}, 1fr)`,
                        'grid-template-rows': `repeat(${wbsList.length}, 1fr)`
                    }">
                    <template
                        v-for="(wbs, i) in wbsList"
                        :key="i">
                        <!-- 계획별 일정 하이라이트 -->
                        <div
                            v-if="pfprop['wbs-'+ wbs].date"
                            class="item position-relative bg-primary"
                            :style="{
                                'grid-column': `
                                ${getTerm(pfprop['기간'].date.start, pfprop['wbs-'+ wbs].date.start) + 1}
                                /
                                ${getTerm(pfprop['기간'].date.start, pfprop['wbs-'+ wbs].date) + 1}`,
                                'grid-row': `${i + 1} / ${i + 2}`
                            }">
                            <!-- 계획별 일정 표시 -->
                            <span
                                v-if="getTerm(pfprop['기간'].date.start, pfprop['wbs-'+ wbs].date) + 1 < (workday / 2)"
                                class="mx-1 position-absolute top-50 start-100 translate-middle-y">
                                {{ wbs.split('-')[1] }}
                                <small class="opacity-50">{{ pfprop['wbs-'+ wbs].date.start }}{{ pfprop['wbs-'+ wbs].date.end ? ' ~ ' + pfprop['wbs-'+ wbs].date.end : '' }}</small>
                            </span>
                            <span
                                v-else-if="getTerm(pfprop['기간'].date.start, pfprop['wbs-'+ wbs].date.start) + 1 < (workday / 2)"
                                class="mx-1 position-absolute top-50 start-0 translate-middle-y">
                                {{ wbs.split('-')[1] }}
                                <small class="opacity-50">{{ pfprop['wbs-'+ wbs].date.start }}{{ pfprop['wbs-'+ wbs].date.end ? ' ~ ' + pfprop['wbs-'+ wbs].date.end : '' }}</small>
                            </span>
                            <span
                                v-else
                                class="mx-1 position-absolute top-50 end-100 translate-middle-y">
                                {{ wbs.split('-')[1] }}
                                <small class="opacity-50">{{ pfprop['wbs-'+ wbs].date.start }}{{ pfprop['wbs-'+ wbs].date.end ? ' ~ ' + pfprop['wbs-'+ wbs].date.end : '' }}</small>
                            </span>
                        </div>
                    </template>
                </div>
            </article>
            <article
                v-if="isExUrl"
                class="container">
                <h4 class="mt-4 fs-5">
                    <font-awesome-icon icon="fa-solid fa-angles-right" />
                    Detail URLs
                </h4>
                <ul>
                    <template
                        v-for="(url, i) in urlList"
                        :key="i">
                        <li
                            v-if="pfprop[url].url"
                            class="mb-1">
                            <LinkBtn>
                                <a
                                    class="text-white text-decoration-none"
                                    :href="pfprop[url].url"
                                    target="_blank">
                                    {{ url.replace('URL', '') }}
                                </a>
                            </LinkBtn>
                        </li>
                    </template>
                </ul>
            </article>
        </section>
        <!-- e: WBS -->

        <!-- s: 성장 포인트 -->
        <section class="point py-5 bg-dark text-white">
            <article class="container">
                <div class="point-wrap">
                    <h2>Step up</h2>
                    <p class="mb-2">
                        <font-awesome-icon icon="fa-solid fa-angles-right" />
                        Point
                    </p>
                    <NotionObj
                        :prop="pfprop['성장포인트']"
                        dec="성장포인트" />
                </div>
            </article>
        </section>
        <!-- e: 성장 포인트 -->

        <!-- s: 화면 이미지 -->
        <section
            v-if="addImg.page"
            class="page-img-wrap">
            <div class="container my-5">
                <h2 class="mb-4">
                    Preview
                </h2>
                <FloatingWrap :img-list="pageImgList" />
            </div>
        </section>
        <!-- e: 화면 이미지 -->

        <!-- s: 풋터 슬로건 -->
        <section class="overflow-hidden">
            <RouterLink
                class="text-hover-none text-decoration-none"
                to="/projects">
                <div class="container mt-4">
                    <ArrowBottomBtn>
                        Project List
                    </ArrowBottomBtn>
                </div>
                <SloganSlide />
            </RouterLink>
        </section>
    <!-- e: 풋터 슬로건 -->
    </section>
</template>

<script>
import NotionObj from '~/components/notion/NotionObj'
import Loader from '~/components/common/Loader'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import LinkBtn from '~/components/common/buttons/LinkBtn'
import ProgressCircle from '~/components/common/ProgressCircle'
import FloatingWrap from '~/components/common/FloatingWrap'
import SloganSlide from '~/components/common/SloganSlide'

export default {
    components: {
        NotionObj,
        Loader,
        ArrowBottomBtn,
        LinkBtn,
        ProgressCircle,
        FloatingWrap,
        SloganSlide
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
            ],
            wbsList: [
                '1-주제선정',
                '2-기능정리',
                '3-화면구성',
                '4-DB설계',
                '5-제안서',
                '6-구조정리',
                '7-페이지제작',
                '8-기능시연',
            ],
            urlList: [
                '요구사항정의서URL',
                '화면구성URL',
                'DB설계URL',
                '제안서URL',
                'WBS상세URL',
            ],
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
        isExWbs() {
            let flag = false
            this.wbsList.forEach(wbs => {
                if(this.pfprop['wbs-'+ wbs].date) flag = true
            })
            return flag
        },
        isExUrl() {
            let flag = false
            this.urlList.forEach(url => {
                if(this.pfprop[url].url) flag = true
            })
            return flag
        },
        addImg() {
            return this.$store.state.notion.addImages
        },
        pageImgList() {
            return this.addImg.page.map(img => {
                return {
                    url: img.url,
                    imgDec: img.pagedec + ' 확대 이미지',
                    subtitle: img.pagedec,
                    labels: [ img.pagetype?.split('-')[1] ],
                }
            })
        },
        workday() {
            return this.getTerm(this.pfprop['기간'].date.start, this.pfprop['기간'].date.end)
        }
    },
    methods: {
        showModal(event) {
            let { target } = event
            if(!target.classList.contains('hover-box')) target = target.closest('.hover-box')

            this.$store.dispatch('modal/showModal', {
                title : target.querySelector('.subtitle')?.innerText,
                imgSrc : target.querySelector('.hover-box-img')?.src,
                dec : target.querySelector('.dec')?.innerText,
            })
        },
        getTerm(start, end) {
            if(!start) return 0
            if(!end) return 1
            if(typeof end == 'object') {
                end = end.end ? end.end : end.start
            }
            start = new Date(start)
            end   = new Date(end)
            return (end - start) / (1000 * 3600 * 24);
        },
    },
    mounted() {
        this.$store.dispatch('notion/searchAddImages', {
            database_id: this.$route.params.id,
        })
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
    .logo{
        width: 150px;
        height: 150px;
        max-width: calc(100vw - $spacer);
        max-height: calc(100vw - $spacer);
        font-size: 100px;
        text-align: center;
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
    height: 30vw;
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
.slide{
    ul{
        gap: $spacer * 0.5;
        overflow-x: scroll;
        .hover-box{
            flex-shrink: 0;
            width: 500px;
            height: 400px;
            max-width: 70vw;
            font-size: 1.5rem;
        }
    }
}
.wbs{
    .d-grid{
        width: 100%;
        height: 250px;
        background-color: rgba(var(--bs-white-rgb), .5);
        small{
            font-size: 0.6em;
        }
    }
}
.point{
    .point-wrap{
        width: 50%;
        margin-left: auto;
    }
}
.page-img-wrap{
    .floating-wrap{
        gap: $spacer * 0.5;
        .hover-box{
            --width: #{'min(750px, (50vw - ' + $spacer + '))'};
            width: var(--width);
            height: calc(var(--width) * 3 * 0.5);
            font-size: 1.5rem;
            &.small-box{ // 큰 사이즈
                --width: #{'min(400px, (40vw - ' + $spacer + '))'};
                font-size: 1rem;
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
    .slide{
        ul{
            &::-webkit-scrollbar {
                height: 15px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: $gray-500;
                border-radius: 10px;
                background-clip: padding-box;
                border: 2px solid transparent;
            }
            &::-webkit-scrollbar-track {
                background-color: $gray-300;
                border-radius: 10px;
            }
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
    .point{
        .point-wrap{
            width: 100%;
        }
    }
    .page-img-wrap{
        .floating-wrap{
            .hover-box{
                --width: #{'calc(100vw - ' + $spacer * 0.5 + ')'};
                &.small-box{ // 큰 사이즈
                    --width: #{'calc(100vw - ' + $spacer * 0.5 + ')'};
                }
            }
        }
    }
}
</style>