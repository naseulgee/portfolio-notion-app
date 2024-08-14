<template>
    <article
        @click="showImgs(portfolio.id)">
        <div>icon: <NotionObj :prop="portfolio.icon" /></div>
        <div>프로젝트: <NotionObj :prop="pfprop['프로젝트명']" /></div>
        <div>분류: <NotionObj :prop="pfprop['분류']" /></div>
        <div>기간: <NotionObj :prop="pfprop['기간']" /></div>
        <div>담당분야: <NotionObj :prop="pfprop['담당분야']" /></div>
        <div>stack-Design: <NotionObj :prop="pfprop['stack-Design']" /></div>
        <div>stack-Front: <NotionObj :prop="pfprop['stack-Front']" /></div>
        <div>stack-Back: <NotionObj :prop="pfprop['stack-Back']" /></div>
        <div>stack-DB: <NotionObj :prop="pfprop['stack-DB']" /></div>
        <div>stack-Test: <NotionObj :prop="pfprop['stack-Test']" /></div>
        <div>stack-IDE: <NotionObj :prop="pfprop['stack-IDE']" /></div>
        <div>stack-Server: <NotionObj :prop="pfprop['stack-Server']" /></div>
        <div>참여인원: <NotionObj :prop="pfprop['참여인원']" /></div>
        <div>기여도: <NotionObj :prop="pfprop['기여도']" /></div>
        <div>주요기능: <NotionObj :prop="pfprop['주요기능']" /></div>
        <div>담당기능: <NotionObj :prop="pfprop['담당기능']" /></div>
        <div>URL: <NotionObj :prop="pfprop['URL']" /></div>
        <div>Github: <NotionObj :prop="pfprop['Github']" /></div>
        <div>한줄소개: <NotionObj :prop="pfprop['한줄소개']" /></div>
        <div>소개: <NotionObj :prop="pfprop['소개']" /></div>
        <div>목적: <NotionObj :prop="pfprop['목적']" /></div>
        <div>사용대상: <NotionObj :prop="pfprop['사용대상']" /></div>
        <div>벤치마킹: <NotionObj :prop="pfprop['벤치마킹']" /></div>
        <div>성장포인트: <NotionObj :prop="pfprop['성장포인트']" /></div>
        <div>wbs-1-주제선정: <NotionObj :prop="pfprop['wbs-1-주제선정']" /></div>
        <div>wbs-2-기능정리: <NotionObj :prop="pfprop['wbs-2-기능정리']" /></div>
        <div>wbs-3-화면구성: <NotionObj :prop="pfprop['wbs-3-화면구성']" /></div>
        <div>wbs-4-DB설계: <NotionObj :prop="pfprop['wbs-4-DB설계']" /></div>
        <div>wbs-5-제안서: <NotionObj :prop="pfprop['wbs-5-제안서']" /></div>
        <div>wbs-6-구조정리: <NotionObj :prop="pfprop['wbs-6-구조정리']" /></div>
        <div>wbs-7-페이지제작: <NotionObj :prop="pfprop['wbs-7-페이지제작']" /></div>
        <div>wbs-8-기능시연: <NotionObj :prop="pfprop['wbs-8-기능시연']" /></div>
        <div>요구사항정의서URL: <NotionObj :prop="pfprop['요구사항정의서URL']" /></div>
        <div>화면구성URL: <NotionObj :prop="pfprop['화면구성URL']" /></div>
        <div>DB설계URL: <NotionObj :prop="pfprop['DB설계URL']" /></div>
        <div>제안서URL: <NotionObj :prop="pfprop['제안서URL']" /></div>
        <div>WBS상세URL: <NotionObj :prop="pfprop['WBS상세URL']" /></div>

        <div>
            img: <NotionObj
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