<template>
    <RouterLink
        :to="'/projects/' + portfolio.id"
        class="portfolio-wrap hover-box text-hover-none">
        <div class="cover w-100 h-100">
            <div
                v-if="!portfolio.cover"
                class="hover-box-img"
                :style="{ backgroundColor: randomColor }"></div>
            <NotionObj
                class-nm="hover-box-img"
                :prop="portfolio.cover"
                dec="cover" />
        </div>
        <div class="hover-box-info">
            <ArrowBottomBtn color="#fff">
                <p class="year">
                    {{ year }}
                </p>
                <template #title>
                    <NotionObj
                        class-nm="pjt-name"
                        :prop="pfprop['프로젝트명']"
                        dec="프로젝트명" />
                </template>
            </ArrowBottomBtn>
            <NotionObj
                class-nm="part d-flex flex-wrap p-0 opacity-50 fs-6"
                child-class="d-inlin-block mb-1 me-1 px-1 border border-white rounded-pill"
                :prop="pfprop['담당분야']"
                dec="담당분야" />
            <div>
                <NotionObj
                    class-nm="dec"
                    :prop="pfprop['한줄소개']"
                    dec="한줄소개" />
            </div>
            <!-- <div>
                <strong>분류 :: </strong>
                <NotionObj
                    :prop="pfprop['분류']"
                    dec="분류" />
            </div> -->
            <!-- <div>
                <strong>stack-Design :: </strong>
                <NotionObj
                    :prop="pfprop['stack-Design']"
                    dec="stack-Design" />
            </div>
            <div>
                <strong>stack-Front :: </strong>
                <NotionObj
                    :prop="pfprop['stack-Front']"
                    dec="stack-Front" />
            </div>
            <div>
                <strong>stack-Back :: </strong>
                <NotionObj
                    :prop="pfprop['stack-Back']"
                    dec="stack-Back" />
            </div>
            <div>
                <strong>stack-DB :: </strong>
                <NotionObj
                    :prop="pfprop['stack-DB']"
                    dec="stack-DB" />
            </div>
            <div>
                <strong>stack-Test :: </strong>
                <NotionObj
                    :prop="pfprop['stack-Test']"
                    dec="stack-Test" />
            </div>
            <div>
                <strong>stack-IDE :: </strong>
                <NotionObj
                    :prop="pfprop['stack-IDE']"
                    dec="stack-IDE" />
            </div>
            <div>
                <strong>stack-Server :: </strong>
                <NotionObj
                    :prop="pfprop['stack-Server']"
                    dec="stack-Server" />
            </div> -->
        </div>
    </RouterLink>
</template>

<script>
import NotionObj from '~/components/notion/NotionObj'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'

export default {
    props: {
        portfolio: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    components: {
        NotionObj,
        ArrowBottomBtn,
    },
    data() {
        return {
            pfprop: this.portfolio.properties
        }
    },
    computed: {
        year() {
            return this.pfprop['기간'].date.start.slice(0,4)
        },
        randomColor() {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            return `rgb(${red}, ${green}, ${blue})`;
        }
    },
}
</script>