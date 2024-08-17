<template>
    <article
        class="container"
        :class="[...classObj.containerClass]"
        :data-them="them">
        <h1
            class="title mb-3"
            :class="[...classObj.titleClass]">
            기초가 탄탄하면 수정 및 운영 관리가 쉬워집니다.
        </h1>
        <p
            class="dec opacity-50"
            :class="[...classObj.decClass]">
            유저 경험에 큰 영향을 주어 이탈률을 감소시키고,<br />
            서버 저장 공간을 절약하여 유지 비용을 감소하는데 도움이 됩니다.
        </p>
        <slot></slot>
    </article>
</template>

<script>
export default {
    props: {
        classObj: {
            type: Object,
            default: () => {
                return {
                    containerClass: [],
                    titleClass: [],
                    decClass: [],
                }
            }
        },
        them: {
            type: String,
            required: false
        }
    }
}
</script>