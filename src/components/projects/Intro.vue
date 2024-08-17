<template>
    <article
        class="container"
        :class="[...classObj.containerClass]">
        <h1
            class="title"
            :class="[...classObj.titleClass]">
            Projects
        </h1>
        <p
            class="dec opacity-50"
            :class="[...classObj.decClass]">
            프로젝트의 주요 목표를 이해하고<br />
            서비스 본질에 집중하여 개발합니다.
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
    }
}
</script>