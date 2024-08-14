<template>
    <article
        @click="showImgs(portfolio.id)">
        <div>
            <strong>icon :: </strong>
            <NotionObj
                :prop="portfolio.icon"
                dec="icon" />
        </div>
        <div>
            <strong>프로젝트명 :: </strong>
            <NotionObj
                :prop="pfprop['프로젝트명']"
                dec="프로젝트명" />
        </div>
        <div>
            <strong>분류 :: </strong>
            <NotionObj
                :prop="pfprop['분류']"
                dec="분류" />
        </div>
        <div>
            <strong>기간 :: </strong>
            <NotionObj
                :prop="pfprop['기간']"
                dec="기간" />
        </div>
        <div>
            <strong>담당분야 :: </strong>
            <NotionObj
                :prop="pfprop['담당분야']"
                dec="담당분야" />
        </div>
        <div>
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
        </div>
        <div>
            <strong>참여인원 :: </strong>
            <NotionObj
                :prop="pfprop['참여인원']"
                dec="참여인원" />
        </div>
        <div>
            <strong>기여도 :: </strong>
            <NotionObj
                :prop="pfprop['기여도']"
                dec="기여도" />
        </div>
        <div>
            <strong>주요기능 :: </strong>
            <NotionObj
                :prop="pfprop['주요기능']"
                dec="주요기능" />
        </div>
        <div>
            <strong>담당기능 :: </strong>
            <NotionObj
                :prop="pfprop['담당기능']"
                dec="담당기능" />
        </div>
        <div>
            <strong>URL :: </strong>
            <NotionObj
                :prop="pfprop['URL']"
                dec="URL" />
        </div>
        <div>
            <strong>Github :: </strong>
            <NotionObj
                :prop="pfprop['Github']"
                dec="Github" />
        </div>
        <div>
            <strong>한줄소개 :: </strong>
            <NotionObj
                :prop="pfprop['한줄소개']"
                dec="한줄소개" />
        </div>
        <div>
            <strong>소개 :: </strong>
            <NotionObj
                :prop="pfprop['소개']"
                dec="소개" />
        </div>
        <div>
            <strong>목적 :: </strong>
            <NotionObj
                :prop="pfprop['목적']"
                dec="목적" />
        </div>
        <div>
            <strong>사용대상 :: </strong>
            <NotionObj
                :prop="pfprop['사용대상']"
                dec="사용대상" />
        </div>
        <div>
            <strong>벤치마킹 :: </strong>
            <NotionObj
                :prop="pfprop['벤치마킹']"
                dec="벤치마킹" />
        </div>
        <div>
            <strong>성장포인트 :: </strong>
            <NotionObj
                :prop="pfprop['성장포인트']"
                dec="성장포인트" />
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

        <hr />
    </article>
</template>

<script>
import NotionObj from '~/components/notion/NotionObj'

export default {
    // 부모 컴포넌트에게 전달받을 속성 정의
    props: {
        portfolio: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    components: {
        NotionObj,
    },
    data() {
        return {
            pfprop: this.portfolio.properties
        }
    },
    computed: {
        addImg() {
            return this.$store.state.notion.addImages
        }
    },
    methods: {
        showImgs(database_id) {
            this.$store.dispatch('notion/searchAddImages', {
                database_id,
                type: "usecase"
            })
        },
    },
}
</script>