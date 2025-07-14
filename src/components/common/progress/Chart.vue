<template>
    <div>
        <canvas
            ref="chart"
            class="chart w-100">
        </canvas>
    </div>
</template>

<script>
import { shallowRef } from 'vue'
import Chart from 'chart.js/auto'

export default {
    data() {
        return {
            chart: null,
            options: {},
        }
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        titleSize: {
            type: Number,
            default: 14
        },
        chartType: {
            type: String,
            default: 'doughnut',
        },
        labels: {
            type: Array,
            default: () => [],
        },
        labelDatas: {
            type: Array,
            default: () => [],
        },
        areaDatas: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        datasets() {
            const datasets = []
            this.labelDatas.map(data => {
                const color = data.map(() => this.$randomColor(100, 40, 0.7))
                datasets.push({
                    data,
                    backgroundColor: color,
                    borderColor: color,
                    fill: true,
                    borderWidth: 3,
                    borderJoinStyle: 'round',
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                    hitRadius: 100,
                    hoverRadius: 10,
                    pointBackgroundColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                })
            })
            this.areaDatas.map(data => {
                const color = this.$randomColor(50, 50, 0.3)
                datasets.push({
                    data,
                    backgroundColor: color,
                    borderColor: color,
                    pointRadius: 0,
                })
            })

            return datasets
        }
    },
    watch: {
        labels(newLabels) {
            this.chart.data.labels = newLabels
            this.chart.update()
        },
        labelDatas(newDatas) {
            this.chart.data.datasets.forEach((dataset, i) => {
                dataset.data = newDatas[i]
            })
            this.chart.update()
        }
    },
    methods: {
        createChart() {
            if(this.labels.length == 0)  return
            if(this.labelDatas.length == 0)  return

            this.initChartOp()

            this.chart = shallowRef(new Chart(this.$refs.chart, {
                type: this.chartType,
                data: {
                    labels: this.labels,
                    datasets: this.datasets
                },
                options: this.options,
            }))
        },
        initChartOp() {
            const titleOp = this.title == '' ? {} : {
                display: true,
                padding: 20,
                text: this.title,
                font: { size: this.titleSize },
                align: 'start',
            }
            this.options.responsive = true
            this.options.aspectRatio = 1
            this.options.plugins = { title: titleOp, legend: { align: 'start' } }

            switch (this.chartType) {
                case 'radar':
                    this.options.plugins.legend.display = false
                    this.options.scales = {
                        r: {
                            angleLines: {color: '#00000080'},
                            grid: {color: '#00000080'},
                            ticks: {
                                color: '#000',
                                stepSize: 2,
                                backdropPadding: { x: 5, top: 2 },
                                z: 1
                            }
                        }
                    }
                    break;
            }
        },
    },
    mounted() {
        this.createChart()
    },
    beforeUnmount() {
        if(this.chart) {
            this.chart.destroy()
        } 
    }

}
</script>