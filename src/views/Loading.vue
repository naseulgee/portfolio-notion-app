<template>
    <!-- 스크롤 막기 -->
    <section
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
        class="slots-wrapper d-flex justify-content-center align-items-center w-100 vh-100 overflow-hidden position-fixed top-0 start-0 bg-dark text-white"
        :style="{ '--time': time * 0.6 + 's' }">
        <div class="outer-screen overflow-hidden">
            <div class="slots position-relative">
                <div class="inner-screen"></div>
                <div
                    v-for="(text, i) in slotText"
                    :key="i"
                    class="slot"
                    :style="{ transform: `rotateX(${360 / slotText.length * i}deg) translateX(-50%) translateZ(200px)` }">
                    {{ text }}
                </div>
            </div>
        </div>
        <ProgreeBar
            class="mb-1 position-fixed bottom-0 start-50 translate-middle-x"
            :time="time"
            color="var(--bs-white)" />
    </section>
</template>

<script>
import ProgreeBar from '~/components/common/progress/ProgreeBar'

export default {
    props: {
        time: {
            type: Number,
            default: 5 // s
        },
    },
    components: {
        ProgreeBar,
    },
    data() {
        return {
            styleEl: null
        }
    },
    computed: {
        slogans() {
            return this.$store.state.slogans
        },
        slotText() {
            const arr = [
                ...this.slogans['About Me'].split('-'),
                ...this.slogans['Projects'].split('-'),
            ]
            // 랜덤 섞기
            for (let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr
        },
    },
    created() { // 로딩화면에서 스크롤바 제거
        this.styleEl = document.createElement("style")
        this.styleEl.appendChild(document.createTextNode(":root{ scrollbar-width: none; }  :root::-webkit-scrollbar{ display: none; }"))
        document.getElementsByTagName("head")[0].appendChild(this.styleEl)
    },
    unmounted() { // 로딩화면 종료 시 스크롤바 원복
        document.getElementsByTagName("head")[0].removeChild(this.styleEl)
    }
}
</script>

<style lang="scss" scoped>
$screenW: 50vw;
$screenH: 50vh;
$zoom: 180px;

@keyframes rotate-axis {
    0%   { transform: perspective(1000px) rotateX(0deg);   }
    100% { transform: perspective(1000px) rotateX(360deg); }
}
@keyframes rotate-axis-reverse {
    0%   { transform: translate(-50%, -50%) rotateX(360deg) translateZ($zoom); }
    100% { transform: translate(-50%, -50%) rotateX(0deg)   translateZ($zoom); }
}

.slots-wrapper{
    z-index: 100;
    word-break: keep-all;
    .outer-screen{
        // 뷰포트 + translateZ 에 따른 계산 + blur 번짐에 따른 여백
        width: calc($screenW + 11vw + 3px);
        height: calc($screenH + 11vh + 3px);
        padding: 1px;
        border: 1px solid $white;
        .slots {
            width: 100px;
            height: 100px;
            top: calc(50% - 50px);
            left: calc(50% - 50px);
            animation: rotate-axis var(--time) linear infinite;
            transform-style: preserve-3d;
            .inner-screen{ // 집중을 위한 블러 처리
                width: $screenW;
                height: $screenH;
                position: fixed;
                top: 50%;
                left: 50%;
                backdrop-filter: blur(10px);
                animation: rotate-axis-reverse var(--time) linear infinite;
            }
            .slot{
                height: 175px;
                position: absolute;
                top: -50%;
                left: 50%;
                font-size: 5vw;
                line-height: 175px;
            }
        }
    }
}
</style>