<template>
    <div
        class="bar-wrap"
        :style="{ '--time': time + 's', '--barW': barW, '--color': color, }">
        <div class="gauge"></div>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: Number,
            default: 5 // s
        },
        barW: {
            type: String,
            default: '100%'
        },
        color: {
            type: String,
            default: 'var(--bs-primary)'
        }
    },
}
</script>

<style lang="scss" scoped>
@keyframes gauging {
    0%   { width: 0%; }
    100% { width: 100%; }
}

.bar-wrap{
    width: var(--barW);
    height: 20px;
    padding: 1px;
    border: 2px solid var(--color);
    .gauge{
        width: 0;
        height: 100%;
        background-color: var(--color);
        animation: gauging var(--time) linear 1 forwards;
    }
}
</style>