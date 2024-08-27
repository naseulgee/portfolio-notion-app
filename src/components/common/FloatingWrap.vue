<template>
    <ul class="container">
        <template
            v-for="i in limitCnt"
            :key="i">
            <!-- 묶음처리 -->
            <li
                v-if="(i - 1) % 2 == 0"
                class="floating-wrap d-flex flex-wrap flex-md-nowrap justify-content-between align-items-end mb-2 mb-md-5"
                :data-num="i">
                <FloatingImg
                    v-if="imgList[(i - 1)]"
                    :is-small="(i - 1) % 4 == 0"
                    :img-obj="imgList[(i - 1)]" />
                <FloatingImg
                    v-if="imgList[i]"
                    :is-small="(i - 1) % 4 != 0"
                    :img-obj="imgList[i]" />
            </li>
        </template>
    </ul>
</template>

<script>
import FloatingImg from '~/components/common/FloatingImg'

export default {
    props: {
        limit: {
            type: Number,
            default: 0
        },
        imgList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        FloatingImg,
    },
    data() {
        return {
            observer: null,
            obsOption: {
                root: null,
                threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
            },
        }
    },
    computed: {
        limitCnt() {
            let cnt = this.imgList.length + 1
            if(this.limit > 0) cnt = this.limit
            return cnt
        },
    },
    methods: {
        initObserver(targets){
            // 전달 대상이 없을 경우 함수 종료
            if(!targets || targets.length == 0) return

            // 관찰자 생성
            this.observer = new IntersectionObserver(this.observing, this.obsOption);
            // 관찰 등록
            targets.forEach(target => {
                this.observer.observe(target);
            })
        },
        unObserve(targets) {
            if(!this.observer) return
            targets.forEach(target => {
                this.observer.unobserve(target);
            })
        },
        observing(entries, observer) { // 타겟이 관찰될 때 마다 실행되는 콜백함수
            entries.forEach(entry => {
                const { target, isIntersecting } = entry
                const isShow   = isIntersecting // 화면에 보이는지

                if(isShow) {
                    const { height, top } = target.getBoundingClientRect()
                    const smallChild = target.querySelector('.small-box')

                    // console.log(target, smallChild)
                    if(smallChild) {
                        const space = height - smallChild.clientHeight
                        let move = (height - top) * 0.5
                        if(move > space) move = space
                        if(move < 0) move = 0

                        smallChild.style.transform = `translateY(${ -move }px)`
                    }
                }
            })
        },
    },
    mounted() {
        this.initObserver(document.querySelectorAll('.floating-wrap'))
    },
    beforeUnmount() {
        this.unObserve(document.querySelectorAll('.floating-wrap'));
    }
}
</script>

<style lang="scss" scoped>
.floating-wrap{
    gap: $spacer * 0.5;
}
</style>