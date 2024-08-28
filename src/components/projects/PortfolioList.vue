<template>
    <FloatingWrap :img-list="portfolios" />
</template>

<script>
import FloatingWrap from '~/components/common/floating/FloatingWrap'

export default {
    components: {
        FloatingWrap,
    },
    computed: {
        portfolios() {
            return this.$store.getters['notion/filteredPortfolios']?.map(portfolio => {
                return {
                    to: '/projects/' + portfolio.id,
                    url: portfolio.cover?.file.url,
                    imgDec: 'cover',
                    subtitle: portfolio.properties['기간'].date?.start.slice(0,4),
                    title: portfolio.properties['프로젝트명'].title[0]?.plain_text,
                    labels: portfolio.properties['담당분야'].multi_select?.map(el => el.name),
                    dec: portfolio.properties['한줄소개'].rich_text[0]?.plain_text,
                }
            })
        },
    },
}
</script>