<template>
    <div
        @click="clickEvent"
        class="floating-box hover-box text-hover-none"
        :class="{ 'small-box': isSmall }">
        <div class="cover w-100 h-100">
            <div
                v-if="!imgObj.url"
                class="hover-box-img"
                :style="{ backgroundColor: randomColor }"></div>
            <img
                v-else
                class="hover-box-img"
                :src="imgObj.url"
                :dec="imgObj.imgDec" />
        </div>
        <div class="hover-box-info">
            <ArrowBottomBtn color="#fff">
                <p v-if="imgObj.subtitle">
                    {{ imgObj.subtitle }}
                </p>
                <template
                    v-if="imgObj.title"
                    #title>
                    {{ imgObj.title }}
                </template>
            </ArrowBottomBtn>
            <ul
                v-if="imgObj.labels"
                class="part d-flex flex-wrap p-0 opacity-50 fs-6">
                <template v-if="typeof imgObj.labels == 'string'">
                    <li class="d-inlin-block mb-1 me-1 px-1 border border-white rounded-pill">
                        {{ imgObj.labels }}
                    </li>
                </template>
                <template v-else>
                    <li
                        v-for="(label, i) in imgObj.labels"
                        :key="i"
                        class="d-inlin-block mb-1 me-1 px-1 border border-white rounded-pill">
                        {{ label }}
                    </li>
                </template>
            </ul>
            <div v-if="imgObj.dec">
                {{ imgObj.dec }}
            </div>
        </div>
    </div>
</template>

<script>
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'

export default {
    props: {
        imgObj: {
            type: Object,
            default: () => {},
            required: true
        },
        isSmall: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ArrowBottomBtn,
    },
    computed: {
        randomColor() {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            return `rgb(${red}, ${green}, ${blue})`;
        }
    },
    methods: {
        clickEvent() {
            if(this.imgObj.to) { // 링크가 있으면 이동
                this.$router.push(this.imgObj.to)
            } else {
                this.showModal()
            }
        },
        showModal() {
            const { title, subtitle, url, dec } = this.imgObj
            this.$store.dispatch('modal/showModal', {
                title : title ? title : (subtitle ? subtitle : dec),
                imgSrc : url,
                dec,
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.floating-box{
    &.hover-box{
        --width: #{'min(750px, (50vw - ' + $spacer + '))'};
        width: var(--width);
        height: calc(var(--width) * 3 * 0.5);
        font-size: 1.5rem;
        &.small-box{ // 큰 사이즈
            --width: #{'min(400px, (40vw - ' + $spacer + '))'};
            font-size: 1rem;
        }
    }
}
/* [Tab] =================== */
@include media-breakpoint-down(xl){
    .floating-box{
        &.hover-box{
            --width: #{'calc(500px - ' + $spacer + ')'};
            &.small-box{ // 큰 사이즈
                --width: #{'calc(300px - ' + $spacer + ')'};
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .floating-box{
        &.hover-box{
            --width: #{'calc(100vw - ' + $spacer * 0.5 + ')'};
            height: calc(var(--width) * 1.3);
            transform: none !important;
            font-size: 1em;
            &.small-box{ // 큰 사이즈
                --width: #{'calc(100vw - ' + $spacer * 0.5 + ')'};
                font-size: 1em;
            }
        }
    }
}
</style>