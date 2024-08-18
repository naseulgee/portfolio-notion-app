<template>
    <ul class="container">
        <template
            v-for="i in limitCnt"
            :key="i">
            <!-- 묶음처리 -->
            <li
                v-if="(i - 1) % 2 == 0"
                class="floating-wrap d-flex flex-wrap justify-content-between align-items-end mb-5"
                :data-num="i">
                <PortfolioSimple
                    v-if="portfolios[(i - 1)]"
                    class="floating-box"
                    :class="{ 'small-box': (i - 1) % 4 == 0 }"
                    :portfolio="portfolios[(i - 1)]" />
                <PortfolioSimple
                    v-if="portfolios[i]"
                    class="floating-box"
                    :class="{ 'small-box': (i - 1) % 4 != 0 }"
                    :portfolio="portfolios[i]" />
            </li>
        </template>
    </ul>
</template>

<script>
import PortfolioSimple from '~/components/projects/PortfolioSimple'

export default {
    props: {
        limit: {
            type: Number,
            default: 0
        }
    },
    components: {
        PortfolioSimple,
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
            let cnt = this.portfolios.length + 1
            if(this.limit > 0) cnt = this.limit
            return cnt
        },
        portfolios() {
            return this.$store.state.notion.portfolios
        }
    },
    methods: {
        initObserver(targets){
            // 기존 관찰자 제거 -> 테마색상 세팅 관찰자가 있음으로 제거하지 않음
            // if(this.observer != null) this.observer.disconnect()

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
    async mounted() {
        this.$store.dispatch('notion/searchPortfolios')
        console.log(this.portfolios.length)
        this.initObserver(document.querySelectorAll('.floating-wrap'))
    },
    beforeUnmount() {
        this.unObserve(document.querySelectorAll('.floating-wrap'));
    }
}
</script>

<style lang="scss" scoped>
.container{
    .floating-wrap{
        .floating-box{
            $width: 750px;
            width: $width;
            height: $width * 3 * 0.5;
            font-size: 1.5rem;
            &.small-box{ // 큰 사이즈
                $width: 400px;
                width: $width;
                height: $width * 3 * 0.5;
                font-size: 1rem;
            }
        }
    }
}
</style>