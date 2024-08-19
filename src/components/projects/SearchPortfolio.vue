<template>
    <form
        ref="filterList"
        class="container">
        <!-- {{ console.log(filterList) }} -->
        <template
            v-for="filter in filterList"
            :key="filter.id">
            <div
                v-for="option in filter.multi_select"
                :key="option.id">
                <label
                    v-for="val in option"
                    :key="val.id"
                    @click="search">
                    <input
                        type="checkbox"
                        :value="val.name"
                        v-model="formData[filter.name]" />
                    <NotionObj :prop="{ type: 'rich_text', rich_text: [{plain_text: val.name}] }" />
                </label>
            </div>
        </template>
        <hr />
        {{ formData }}
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
        }
    },
    computed: {
        filterList() {
            const { filterList } = this.$store.state.notion
            const sortedList = filterList.sort((a, b) => {
                const sortNumA = a.description;
                const sortNumB = b.description;
                
                if(sortNumA > sortNumB) return 1;
                if(sortNumA < sortNumB) return -1;
                if(sortNumA === sortNumB) return 0;
            })
            sortedList.forEach(f => {
                this.formData[f.name] = []
            })
            return sortedList
        },
    },
    methods: {
        search(event) {
            const { target } = event
            if(target.type != 'checkbox') return

            this.$store.dispatch('notion/setFilters', {
                filters: this.formData
            })
        }
    },
    watch: {
        formData(val) {
            console.log(val)
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