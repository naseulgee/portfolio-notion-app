<template>
    <div
        class="progress-circle-wrap mx-auto position-relative"
        :style="{ '--size': size, '--stroke': stroke, '--color': color, '--max': percent }">
        <svg class="progress-circle d-block w-100 h-100">
            <circle />
            <circle />
        </svg>
        <strong class="percent position-absolute top-50 start-50 translate-middle">
            {{ parseInt(percent * 100) }}<small>%</small>
        </strong>
    </div>
</template>

<script>
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            default: '200px'
        },
        stroke: {
            type: String,
            default: '12px'
        },
        color: {
            type: String,
            default: 'var(--bs-primary)'
        },
    },
}
</script>

<style lang="scss" scoped>
.progress-circle-wrap{
    $color: var(--color);
    $size: max(var(--size), 200px);
    $stroke: var(--stroke);
    $middle: calc($size / 2);
    $radius: calc(($size - $stroke) / 2);
    $circum: calc($radius * 2 * 3.14);
    $max: calc($circum * (1 - var(--max)));

    width: $size;
    height: $size;
    color: $color;
    font-size: calc($size / 5);
    .progress-circle {
        display: block;
        circle {
            cx: $middle;
            cy: $middle;
            r: $radius;
            fill: none;
            stroke-width: $stroke;
            transform-origin: center;
            transform: rotate(270deg);
            @keyframes _ani_gaging_up {
                0% { stroke-dashoffset: calc($circum * 1); }
                50% { stroke-dashoffset: $max; }
                100% { stroke-dashoffset: $max; }
            }
            &:nth-child(1) {
                stroke: var(--bs-dark);
                opacity: 0.3;
            }
            &:nth-child(2) {
                stroke: $color;
                stroke-dasharray: $circum;
                animation: _ani_gaging_up 3s ease-in-out infinite;
            }
        }
    }
    .percent{
        filter: brightness(70%);
        small{
            font-size: 0.5em;
        }
    }
}
</style>