<template>
    <h1>{{ content }}</h1>
</template>

<script>
export default {
    // Slogan은 SloganSlide 내에서 호출되지만, 단독으로도 호출할 수 있음
    // 한 페이지 내 두 개 이상의 Slogan이 호출될 수 있어, inject 가 아닌 props를 사용함
    props: {
        next: {
            type: String,
            required: false
        }
    },
    computed: {
        content() {
            const key = this.next ? this.next : this.$route.meta.next
            let text = this.$store.state.slogans[key]
            if(!text) text = this.$store.state.slogans['Home']
            return text
        }
    },
}
</script>