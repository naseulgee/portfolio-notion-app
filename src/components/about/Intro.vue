<template>
    <article
        class="container"
        :class="[...classObj.containerClass]">
        <strong
            class="subtitle"
            :class="[...classObj.subtitleClass]">
            Who is Seulgee
        </strong>
        <h1
            class="title"
            :class="[...classObj.titleClass]">
            Designer,<br />
            Front/Back - End<br />
            Developer.
        </h1>
        <p
            class="dec opacity-50"
            :class="[...classObj.decClass]">
            여러 분야에 걸쳐 쌓은 경험을 토대로 다양한 배경을 가진 사람들과의 원활한 의사소통을 주도합니다.<br />
            그리고 프로젝트의 본질을 이해하여 함께 완성도를 높여 나갑니다.
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
                    subtitleClass: [],
                    decClass: [],
                }
            }
        },
    }
}
</script>