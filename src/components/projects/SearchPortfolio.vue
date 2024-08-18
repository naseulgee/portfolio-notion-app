<template>
    <form
        ref="filterList"
        class="container">
        <template
            v-for="filter in filterList"
            :key="filter.id">
            <template
                v-for="option in filter.multi_select"
                :key="option.id">
                <label
                    v-for="val in option"
                    :key="val.id"
                    @click="search">
                    <input
                        type="checkbox"
                        :name="filter.name" />
                    <NotionObj :prop="{ type: 'rich_text', rich_text: [{plain_text: val.name}] }" />
                </label>
            </template>
        </template>
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
            checkedType: [],
            checkedStack: [],
        }
    },
    computed: {
        filterList() {
            return this.$store.state.notion.filterList
        }
    },
    methods: {
        search(event) {
            const { target } = event
            if(target.type != 'checkbox') return
            
            // Form 데이타를 말아서 스토어 게터 호출해야함!
            // this.$store.getters['notion/filteredPortfolios']()
            // if(target.name == '분류') checkedType
            // console.log(formData, this.$refs.filterList)
        }
    },
    mounted() {
        this.$store.dispatch('notion/searchFilterList')
    }
}
</script>

<style lang="scss" scoped>
.container{
    label{
        input{}
    }
}
</style>