<template>
    <article
        @click="showImgs(portfolio.id)">
        <p>icon: {{ icon }}</p>
        <p>프로젝트: {{ portfolio.properties["프로젝트명"].title[0].plain_text }}</p>
        <p>분류: {{ }}</p>
        <p>기간: {{ }}</p>
        <p>담당분야: {{ }}</p>
        <p>stack-Design: {{ }}</p>
        <p>stack-Front: {{ }}</p>
        <p>stack-Back: {{ }}</p>
        <p>stack-DB: {{ }}</p>
        <p>stack-Test: {{ }}</p>
        <p>stack-IDE: {{ }}</p>
        <p>stack-Server: {{ }}</p>
        <p>참여인원: {{ }}</p>
        <p>기여도: {{ }}</p>
        <p>주요기능: {{ }}</p>
        <p>담당기능: {{ }}</p>
        <p>URL: {{ }}</p>
        <p>Github: {{ }}</p>
        <p>한줄소개: {{ }}</p>
        <p>소개: {{ }}</p>
        <p>목적: {{ }}</p>
        <p>사용대상: {{ }}</p>
        <p>벤치마킹: {{ }}</p>
        <p>성장포인트: {{ }}</p>
        <p>wbs-1-주제선정: {{ }}</p>
        <p>wbs-2-기능정리: {{ }}</p>
        <p>wbs-3-화면구성: {{ }}</p>
        <p>wbs-4-DB설계: {{ }}</p>
        <p>wbs-5-제안서: {{ }}</p>
        <p>wbs-6-구조정리: {{ }}</p>
        <p>wbs-7-페이지제작: {{ }}</p>
        <p>wbs-8-기능시연: {{ }}</p>
        <p>요구사항정의서URL: {{ }}</p>
        <p>화면구성URL: {{ }}</p>
        <p>DB설계URL: {{ }}</p>
        <p>제안서URL: {{ }}</p>
        <p>WBS상세URL: {{ }}</p>

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
        }
    },
    computed: {
        icon() {
            const { icon } = this.portfolio
            if(!icon) return ''
            if(icon.emoji) return icon.emoji
            return this.getImgUrl(icon)
        },
    },
    methods: {
        getImgUrl(obj) {
            if(!obj)         return ''
            if(obj.file)     return obj.file.url
            if(obj.external) return obj.external.url
            return ''
        },
        showImgs(database_id) {
            console.log(database_id)
            this.$store.dispatch('notion/searchAddImages', {
                database_id,
                type: "main"
            })
        },
    },
    mounted(){
        // console.log(this.portfolio.cover)
        // console.log(this.portfolio.icon)
    }
}
</script>