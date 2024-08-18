<template>
    <!-- 
        1. 로고는 헤더, 풋터, 메인 인트로 등 쓰일 곳이 많으니 컴포넌트로 만들어서 사용
        2. 클릭 시 메인페이지로 이동할 수 있도록 RouterLink 사용
        3. 사용 위치에 따라 로고 색상과 사이즈가 달라질 수 있도록 props 로 추가 클래스를 받아서 사용
    -->
    <RouterLink
        to="/"
        class="logo d-inline-block overflow-hidden text-decoration-none"
        :style="{fontSize: size+'px'}">
        S.
    </RouterLink>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 32
        }
    },
}
</script>

<style lang="scss" scoped>
.logo{
    padding: 0 0.15em;
    color: inherit;
    font-family: "Cafe24 Moyamoya Face";
}
</style>