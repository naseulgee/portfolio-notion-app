<template>
    <!-- 
        1. 로고는 헤더, 풋터, 메인 인트로 등 쓰일 곳이 많으니 컴포넌트로 만들어서 사용
        2. 클릭 시 메인페이지로 이동할 수 있도록 RouterLink 사용
        3. 사용 위치에 따라 로고 색상과 사이즈가 달라질 수 있도록 props 로 추가 클래스를 받아서 사용
    -->
    <RouterLink
        to="/"
        class="d-inline-block overflow-hidden"
        :style="{width: size+'px', height: size+'px'}">
        <img
            v-show="!white"
            src="~/assets/images/common/logo.png"
            alt="Seulgee's Portfolio website Logo" />
        <img
            v-show="white"
            src="~/assets/images/common/logoW.png"
            alt="Logo white" />
    </RouterLink>
</template>

<script>
export default {
    props: {
        isWhite: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 40
        }
    },
    computed: {
        white() {
            // 어두운 테마
            if(this.$store.state.themeColor.isDark) return true
            // 수동 조절
            if(this.isWhite) return true
            return false
        }
    }
}
</script>