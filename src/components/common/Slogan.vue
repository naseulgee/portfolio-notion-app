<template>
    <h1>{{ content }}</h1>
</template>

<script>
export default {
    computed: {
        content() {
            const key = this.$route.meta.next
            return this.$store.state.about.slogans[key]
        }
    },
}
</script>