<template>
    <!-- s: 프로젝트 -->
    <section
        class="w-100 py-5 bg-dark text-white"
        data-them="dark">
        <div class="container">
            <ArrowBottomBtn is-bg-color />
        </div>
        <Intro :class-obj="introClass" />
        <SloganSlide next="Projects" />
        <div class="mt-4">
            <SearchPortfolio />
            <PortfolioList use-filter />
        </div>
    </section>
    <!-- e: 프로젝트 -->
    <!-- s: 성과 -->
    <section
        class="py-5"
        data-them="white">
        <Performance />
    </section>
    <!-- e: 성과 -->
    <!-- s: 풋터 슬로건 -->
    <section
        class="overflow-hidden bg-dark text-white"
        data-them="white">
        <RouterLink
            class="text-white text-hover-none text-decoration-none"
            to="/about-me">
            <div class="container mt-4">
                <ArrowBottomBtn is-bg-color>
                    Contact
                </ArrowBottomBtn>
            </div>
            <SloganSlide />
        </RouterLink>
    </section>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import Intro from '~/components/projects/Intro'
import SearchPortfolio from '~/components/projects/SearchPortfolio'
import PortfolioList from '~/components/projects/PortfolioList'
import Performance from '~/components/projects/Performance'
import SloganSlide from '~/components/common/SloganSlide'
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'

export default {
    components: {
        Intro,
        SearchPortfolio,
        PortfolioList,
        Performance,
        SloganSlide,
        ArrowBottomBtn
    },
    data() {
        return {
            introClass: {
                containerClass: [],
                titleClass: [
                    'fs-4',
                    'mb-3',
                ],
                decClass: [
                    'mb-4',
                ],
            },
        }
    },
}
</script>