<template>
    <h1 class="title fs-4">
        Character Analysis
    </h1>
    <p class="dec opacity-50">
        핵심을 빠르게 파악할 수 있도록,<br />
        저에 대해 간략하게 표로 요약해 보았습니다.
    </p>
    <div class="chart-wrap d-flex flex-wrap flex-md-nowrap justify-content-center align-item-center gap-3 p-1 rounded overflow-hidden">
        <Chart
            class="w-100"
            title="Competency Chart"
            chart-type="radar"
            :labels="competency.labels"
            :label-datas="competency.datas"
            :area-datas="competency.area" />
        <Chart
            class="w-100"
            title="Experience Chart"
            :labels="experience.labels"
            :label-datas="experience.datas" />
    </div>
</template>

<script>
import Chart from '~/components/common/progress/Chart'

export default {
    components: {
        Chart,
    },
    data() {
        return {
            competency: {
                labels: ['개발력', '학습 능력', '일정 관리', '협업 능력', '성실성', '적극성'],
                datas: [[7, 8, 6, 7, 8, 6]],
                area: [[10, 10, 10, 0, 0, 0], [0, 0, 10, 10, 10, 0], [10, 0, 0, 0, 10, 10]],
            },
            experience: {
                labels: ['Design', 'Front-end', 'Back-end'],
                datas: [[3, 9, 5]],
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.chart-wrap {
    background-color: rgba(255, 255, 255, 0.7);
}
</style>