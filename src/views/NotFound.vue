<template>
    <section
        class="vh-100 bg-dark text-white"
        data-them="dark">
        <div class="container d-flex justify-content-center align-items-center w-100 h-100">
            <h1 class="m-0">
                404<br />Page<br />Not Found
            </h1>
        </div>
    </section>
    <!-- s: 풋터 슬로건 -->
    <RouterLink
        class="text-hover-none text-decoration-none"
        to="/">
        <div class="container mt-4">
            <ArrowBottomBtn>Go Home</ArrowBottomBtn>
        </div>
        <SloganSlide />
    </RouterLink>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import SloganSlide from '~/components/common/slogan/SloganSlide'

export default {
    components: {
        ArrowBottomBtn,
        SloganSlide
    }
}
</script>