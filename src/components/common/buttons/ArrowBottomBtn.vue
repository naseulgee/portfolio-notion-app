<template>
    <svg
        class="arrow-bottom-right"
        :style="{ fill: color }"
        viewBox="0 0 24 24">
        <path d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z" />
    </svg>
    <div>
        <slot></slot>
    </div>
    <div
        v-if="$slots.title"
        class="title">
        <slot name="title"></slot>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'var(--bs-body-color)'
        }
    }
}
</script>

<style lang="scss" scoped>
.arrow-bottom-right{
    $btn-size: 1.5em;
    $btn-space: $btn-size * 2;

    display: block;
    width: $btn-size;
    height: $btn-size;
    margin-bottom: $btn-size;
}
.title{
    margin-top: 1em;
    font-size: 3em;
}
</style>