<template>
    <h1 class="mb-4 fs-3 text-center text-decoration-underline">
        Skils
    </h1>
    <FloatingWrap
        @ob-callback="obCallback"
        class="text-dark">
        <template
            v-for="stack of stackList"
            :key="stack.name">
            <li
                class="floating-wrap w-100 mb-2 rounded-3 position-relative text-center"
                :style="{ backgroundColor: randomColor() }">
                <h2 class="m-0 p-2 fs-4">
                    {{ stack.name }}
                </h2>
                <div class="line position-relative">
                    <div class="circle rounded-circle position-absolute top-50 start-0 translate-middle bg-white"></div>
                    <div class="circle rounded-circle position-absolute top-50 end-0 bg-white"></div>
                    <svg
                        class="d-block"
                        height="5"
                        width="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 50 L100 50"
                            stroke="var(--bs-body-bg)"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-dasharray="10, 15"
                            stroke-dashoffset="-10"
                            vector-effect="non-scaling-stroke" />
                    </svg>
                </div>
                <ul class="d-flex flex-wrap align-items-start p-2 text-center">
                    <li
                        v-for="option in stack.options"
                        :key="option.id">
                        <div class="icon mx-auto mb-1">
                            <NotionObj :prop="option.icon" />
                        </div>
                        {{ option.name.split(' ')[0] }}
                        <template v-if="option.name.split(' ')[1]">
                            <br />
                            {{ option.name.split(' ')[1] }}
                        </template>
                    </li>
                </ul>
            </li>
        </template>
    </FloatingWrap>
</template>

<script>
import FloatingWrap from '~/components/common/floating/FloatingWrap'
import NotionObj from '~/components/notion/NotionObj.vue';

export default {
    components: {
        FloatingWrap,
        NotionObj,
    },
    data() {
        return {
        }
    },
    computed: {
        stackList() {
            return this.$store.state.notion.stackFList.map(stack => {
                const options = stack.multi_select.options
                return {
                    name: stack.name,
                    options: options.filter(option => {
                        if(!option.hide) return option
                    })
                }
            })
        }
    },
    methods: {
        randomColor() {
            return `hsl(${Math.floor(Math.random() * 100)}, 65%, 65%)`
        },
        obCallback(target, isShow){
            if(isShow) {
                target.classList.add('on')
            } else {
                target.classList.remove('on')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.floating-wrap{
    opacity: 0;
    transition: $transition-base;
    font-size: 1.5rem;
    .line{
        .circle{
            width: 30px;
            aspect-ratio: 1;
            &.end-0{
                transform: translate(50%, -50%);
            }
        }
    }
    ul{
        justify-content: center;
        gap: $spacer * 0.5;
        li{
            max-width: 100%;
            font-size: 0.5em;
            .icon{
                width: 70px;
                max-width: 100%;
                aspect-ratio: 1;
                line-height: 1;
                filter: drop-shadow(1px 1px 1px #00000050);
            }
        }
    }
    &.on{
        opacity: 1;
    }
    &::after{
        display: block;
        content: '';
        width: 95%;
        height: 20px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        filter: blur(10px) brightness(0.8);
        background: inherit;
        z-index: -1;
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .floating-wrap{
        ul{
            justify-content: space-between;
            gap: 5px;
            li{
                max-width: 45%;
                font-size: 10px;
            }
        }
    }
}
</style>