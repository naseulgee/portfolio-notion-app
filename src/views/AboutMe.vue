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
    <a
        class="btn btn-link"
        href="./">About me</a>
    <LinkBtn>
        <a href="./">About me</a>
    </LinkBtn>
    <ArrowBottomBtn>
        <a href="./">About me</a>
    </ArrowBottomBtn>
    <ArrowBottomBtn>
        <a href="./">About me</a>
        <template #title>
            <h1>Lodlsad</h1>
        </template>
    </ArrowBottomBtn>
    <SloganSlide />
</template>

<script>
import SloganSlide from '~/components/common/SloganSlide'
import LinkBtn from '~/components/common/buttons/LinkBtn'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'

export default {
    components: {
        SloganSlide,
        LinkBtn,
        ArrowBottomBtn,
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