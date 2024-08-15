<template>
    <h1>
        Hi
    </h1>
    <ul class="container">
        <li>
            <Portfolio
                v-for="portfolio in portfolios"
                :key="portfolio.id"
                :portfolio="portfolio" />
        </li>
    </ul>
</template>

<script>
import Portfolio from '~/components/projects/Portfolio'

export default {
    components: {
        Portfolio,
    },
    computed: {
        portfolios() {
            return this.$store.state.notion.portfolios
        }
    },
    methods: {
    },
    async mounted() {
        this.$store.dispatch('notion/searchPortfolios')
    },
}
</script>