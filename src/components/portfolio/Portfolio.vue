<template>
    <article
        @click="showImgs(portfolio.id)">
        <p>icon: {{ this.$notionDBObj(portfolio.icon) }}</p>
        <p>프로젝트: {{ this.$notionDBObj(pfpp["프로젝트명"]) }}</p>
        <p>분류: {{ this.$notionDBObj(pfpp["분류"]) }}</p>
        <p>기간: {{ this.$notionDBObj(pfpp["기간"]) }}</p>
        <p>담당분야: {{ this.$notionDBObj(pfpp["담당분야"]) }}</p>
        <p>stack-Design: {{ this.$notionDBObj(pfpp["stack-Design"]) }}</p>
        <p>stack-Front: {{ this.$notionDBObj(pfpp["stack-Front"]) }}</p>
        <p>stack-Back: {{ this.$notionDBObj(pfpp["stack-Back"]) }}</p>
        <p>stack-DB: {{ this.$notionDBObj(pfpp["stack-DB"]) }}</p>
        <p>stack-Test: {{ this.$notionDBObj(pfpp["stack-Test"]) }}</p>
        <p>stack-IDE: {{ this.$notionDBObj(pfpp["stack-IDE"]) }}</p>
        <p>stack-Server: {{ this.$notionDBObj(pfpp["stack-Server"]) }}</p>
        <p>참여인원: {{ this.$notionDBObj(pfpp["참여인원"]) }}</p>
        <p>기여도: {{ this.$notionDBObj(pfpp["기여도"]) }}</p>
        <p>주요기능: </p><p v-html="this.$notionDBObj(pfpp['주요기능'])"></p>
        <p>담당기능: </p><p v-html="this.$notionDBObj(pfpp['담당기능'])"></p>
        <p>URL: {{ this.$notionDBObj(pfpp["URL"]) }}</p>
        <p>Github: {{ this.$notionDBObj(pfpp["Github"]) }}</p>
        <p>한줄소개: </p><p v-html="this.$notionDBObj(pfpp['한줄소개'])"></p>
        <p>소개: </p><p v-html="this.$notionDBObj(pfpp['소개'])"></p>
        <p>목적: {{ this.$notionDBObj(pfpp["목적"]) }}</p>
        <p>사용대상: {{ this.$notionDBObj(pfpp["사용대상"]) }}</p>
        <p>벤치마킹: {{ this.$notionDBObj(pfpp["벤치마킹"]) }}</p>
        <p>성장포인트: </p><p v-html="this.$notionDBObj(pfpp['성장포인트'])"></p>
        <p>wbs-1-주제선정: {{ this.$notionDBObj(pfpp["wbs-1-주제선정"]) }}</p>
        <p>wbs-2-기능정리: {{ this.$notionDBObj(pfpp["wbs-2-기능정리"]) }}</p>
        <p>wbs-3-화면구성: {{ this.$notionDBObj(pfpp["wbs-3-화면구성"]) }}</p>
        <p>wbs-4-DB설계: {{ this.$notionDBObj(pfpp["wbs-4-DB설계"]) }}</p>
        <p>wbs-5-제안서: {{ this.$notionDBObj(pfpp["wbs-5-제안서"]) }}</p>
        <p>wbs-6-구조정리: {{ this.$notionDBObj(pfpp["wbs-6-구조정리"]) }}</p>
        <p>wbs-7-페이지제작: {{ this.$notionDBObj(pfpp["wbs-7-페이지제작"]) }}</p>
        <p>wbs-8-기능시연: {{ this.$notionDBObj(pfpp["wbs-8-기능시연"]) }}</p>
        <p>요구사항정의서URL: {{ this.$notionDBObj(pfpp["요구사항정의서URL"]) }}</p>
        <p>화면구성URL: {{ this.$notionDBObj(pfpp["화면구성URL"]) }}</p>
        <p>DB설계URL: {{ this.$notionDBObj(pfpp["DB설계URL"]) }}</p>
        <p>제안서URL: {{ this.$notionDBObj(pfpp["제안서URL"]) }}</p>
        <p>WBS상세URL: {{ this.$notionDBObj(pfpp["WBS상세URL"]) }}</p>
        <p>img: {{ addImg }}</p>

        <hr />
    </article>
</template>

<script>
export default {
    // 부모 컴포넌트에게 전달받을 속성 정의
    props: {
        portfolio: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    data() {
        return {
            pfpp: this.portfolio.properties
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
                type: "main"
            })
        },
    },
    mounted(){
        // console.log(this.pfpp["담당기능"])
        // console.log(this.pfpp["벤치마킹"])
        // console.log(this.pfpp["성장포인트"])
        // console.log(this.pfpp["한줄소개"])
    }
}
</script>