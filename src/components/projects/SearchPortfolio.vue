<template>
    <form
        class="container my-4"
        ref="filterListWrap">
        <button
            class="border-0 bg-transparent text-white fs-4"
            @click="slideDown">
            <font-awesome-icon icon="fa-solid fa-filter" />
            <span class="ms-1">Filter</span>
        </button>
        <div
            class="filterList overflow-hidden"
            :style="{height: filterHeight + 'px'}">
            <ul
                class="m-0 p-1"
                ref="filterList">
                <template
                    v-for="filter in filterList"
                    :key="filter.id">
                    <li
                        class="filter-wrap mb-1"
                        v-for="option in filter.multi_select ? filter.multi_select : filter.select"
                        :key="option.id">
                        <span class="filter-title d-inline-block">
                            {{ filter.name }}
                        </span>
                        <template
                            v-for="val in option"
                            :key="val.id">
                            <input
                                type="checkbox"
                                :id="val.id"
                                class="btn-check"
                                :value="val.id"
                                @click="search"
                                v-model="formData[filter.name]" />
                            <label
                                class="btn btn-outline-primary btn-sm me-1"
                                :for="val.id">
                                <NotionObj :prop="{ type: 'rich_text', rich_text: [{plain_text: val.name}] }" />
                            </label>
                        </template>
                    </li>
                </template>
            </ul>
        </div>
        <p class="mt-1">
            Total ( {{ portfoliosCnt }} )
        </p>
    </form>
</template>

<script>
import NotionObj from '~/components/notion/NotionObj'

export default {
    components: {
        NotionObj
    },
    data() {
        return {
            formData: {},
            filterHeight: 0,
        }
    },
    computed: {
        filterList() {
            const filterList = this.$store.getters['notion/filterWithStack']
            // const sortedList = filterList.sort((a, b) => {
            //     const sortNumA = a.description;
            //     const sortNumB = b.description;
                
            //     if(sortNumA > sortNumB) return 1;
            //     if(sortNumA < sortNumB) return -1;
            //     if(sortNumA === sortNumB) return 0;
            // })
            filterList.forEach(f => {
                this.formData[f.name] = []
            })
            return filterList
        },
        filterH() {
            return this.$refs.filterList.clientHeight
        },
        portfoliosCnt() {
            return this.$store.getters['notion/filteredPortfolios'].length
        }
    },
    methods: {
        search(event) {
            const { target } = event
            if(target.type != 'checkbox') return

            this.$store.dispatch('notion/setFilters', {
                filters: this.formData
            })
        },
        slideDown() {
            this.$refs.filterListWrap.classList.toggle('on')
            if(this.$refs.filterListWrap.classList.contains('on')){
                this.filterHeight = this.filterH
            }else {
                this.filterHeight = 0
            }
        }
    },
    unmounted() {
        // 필터 초기화
        this.$store.dispatch('notion/setFilters', {
            filters: {}
        })
    },
}
</script>

<style lang="scss" scoped>
.container{
    .filterList{
        line-height: 2.5;
        transition: $transition-base;
        .filter-wrap{
            .filter-title{
                width: 90px;
                border-right: 1px dashed #fff;
                margin-right: 20px;
            }
        }
    }
}
</style>