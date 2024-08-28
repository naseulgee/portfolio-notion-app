<template>
    <div
        class="slogan-wrapper"
        :class="{ isWhite }">
        <div class="slogan-inner-wrapper py-4 position-relative">
            <Slogan
                v-for="i in 2"
                :key="i" 
                :next="next" />
        </div>
    </div>
</template>

<script>
import Slogan from "~/components/common/slogan/Slogan"

export default {
    components: {
        Slogan,
    },
    props: {
        isWhite: {
            type: Boolean,
            default: false,
        },
        next: {
            type: String,
            required: false
        },
    }
}
</script>

<style lang="scss" scoped>
@keyframes _slide_slogan {
    0%  { transform: translateX(0%); }
    100%{ transform: translateX(-100%); }
}
.slogan-wrapper{
    overflow: hidden;
    white-space: nowrap;
    &.isWhite{
        color: var(--bs-white);
    }
    .slogan-inner-wrapper{
        width: fit-content;
        animation: _slide_slogan 20s linear infinite;
        h1 {
            padding-right: 0.5em;
            &:last-child{
                position: absolute;
                top: 50%;
                left: 100%;
                transform: translateY(-55%);
            }
        }
    }
}
</style>