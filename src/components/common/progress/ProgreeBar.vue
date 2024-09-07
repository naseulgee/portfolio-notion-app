<template>
    <div
        class="bar-wrap"
        :style="{ '--time': (time - 1) + 's', '--barW': barW, '--color': color, }">
        <div
            v-if="showTime"
            class="time">
            {{ remainTime }}s
        </div>
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
        },
        showTime: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            interval: null,
            remainTime: 0
        }
    },
    methods: {
        calcTime() {
            if(this.remainTime > 0) {
                this.remainTime = this.remainTime - 1
            }
        }
    },
    mounted() {
        if(this.showTime) {
            this.remainTime = Math.ceil(this.time) - 1
            setTimeout(() => { // 게이지 바가 끝에 다다르는 시점에 0을 표시하기 위해 약간 늦게 카운트를 시작한다
                this.interval = setInterval(() => {
                    this.calcTime()
                }, 1000)
            }, 10)
        }
    },
    unmounted() {
        clearInterval(this.interval)
    }
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
    color: var(--color);
    .time{
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-10px, -100%);
    }
    .gauge{
        width: 0;
        height: 100%;
        background-color: var(--color);
        animation: gauging var(--time) linear 1 forwards;
    }
}
</style>