<template>
    <MainHeader />

    <main>
        <!-- NOTE: 레이아웃 컴포넌트를 호출한 부분에서 내부에 작성한 컴포넌트가 전달되어 그려진다. -->
        <slot></slot>
    </main>

    <MainFooter />
</template>

<script>
import MainHeader from "~/components/common/Header";
import MainFooter from "~/components/common/Footer";

export default {
    components: {
        MainHeader,
        MainFooter,
    }
}
</script>