<template>
    <h1>About me</h1>
    <h2>About me</h2>
    <h3>About me</h3>
    <h4>About me</h4>
    <h5>About me</h5>
    <h6>About me</h6>
    <p @click="$store.dispatch('themeColor/setThemeColor', {isDark: !this.$store.state.themeColor.isDark})">
        About me
    </p>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
}
</script>