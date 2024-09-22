<template>
    <h1 class="mb-4 fs-3 text-center text-decoration-underline">
        Skils
    </h1>
    <FloatingWrap
        @ob-callback="obCallback"
        class="text-dark">
        <template
            v-for="(stack, i) of stackList"
            :key="stack.name">
            <li
                v-if="(i - 1) % 2 == 0"
                class="floating-wrap d-flex flex-wrap flex-md-nowrap justify-content-between align-items-end mb-2 mb-md-3">
                <div
                    v-if="stackList[(i - 1)]"
                    class="floating-box mb-2 mb-md-0 rounded-3"
                    :class="{ 'small-box': (i - 1) % 4 == 0 }"
                    :style="{ backgroundColor: randomColor() }">
                    <h2 class="p-2 border-dark fs-4">
                        {{ stackList[(i - 1)].name }}
                    </h2>
                    <ul class="d-flex flex-wrap justify-content-center align-items-start p-1 p-md-2 text-center">
                        <li
                            v-for="el in stackList[(i - 1)].options"
                            :key="el.id"
                            class="mw-100">
                            <div class="icon mx-auto">
                                <NotionObj :prop="el.icon" />
                            </div>
                            <br />
                            {{ el.name.split(' ')[0] }}
                            <template v-if="el.name.split(' ')[1]">
                                <br />
                                {{ el.name.split(' ')[1] }}
                            </template>
                        </li>
                    </ul>
                </div>
                <div
                    v-if="stackList[i]"
                    class="floating-box rounded-3"
                    :class="{ 'small-box': (i - 1) % 4 != 0 }"
                    :style="{ backgroundColor: randomColor() }">
                    <h2 class="p-2 border-dark fs-4">
                        {{ stackList[i].name }}
                    </h2>
                    <ul class="d-flex flex-wrap justify-content-center align-items-start p-1 p-md-2 text-center">
                        <li
                            v-for="el in stackList[i].options"
                            :key="el.id"
                            class="mw-100">
                            <div class="icon mx-auto">
                                <NotionObj :prop="el.icon" />
                            </div>
                            <br />
                            {{ el.name.split(' ')[0] }}
                            <template v-if="el.name.split(' ')[1]">
                                <br />
                                {{ el.name.split(' ')[1] }}
                            </template>
                        </li>
                    </ul>
                </div>
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
                        if(!option.hide) return options
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
    .floating-box{
        --width: #{'min(750px, (50vw - ' + $spacer + '))'};
        width: var(--width);
        opacity: 0;
        transition: $transition-base;
        font-size: 1.5rem;
        &.small-box{ // 큰 사이즈
            --width: #{'min(400px, (40vw - ' + $spacer + '))'};
        }
        &:nth-child(odd){
            transform: translateX(-100%) !important;
        }
        &:nth-child(even){
            transform: translateX(100%) !important;
        }
        h2{
            border-bottom: 1px dashed;
        }
        ul{
            gap: $spacer * 0.5;
            li{
                font-size: 0.5em;
                .icon{
                    width: 70px;
                    height: 70px;
                    line-height: 1;
                }
            }
        }
    }
    &.on{
        .floating-box{
            opacity: 1;
            transform: none !important;
        }
    }
}
/* [Tab] =================== */
@include media-breakpoint-down(xl){
    .floating-wrap{
        .floating-box{
            --width: 50%;
            &.small-box{ // 작은 사이즈
                --width: #{'calc(50% - ' + $spacer * 0.5 + ')'};
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .floating-wrap{
        .floating-box{
            --width: 100%;
            &.small-box{ // 작은 사이즈
                --width: 100%;
            }
            ul{
                li{
                    font-size: 0.8em;
                    .icon{
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
}
</style>