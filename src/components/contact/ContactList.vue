<template>
    <ul class="contact-list d-flex flex-wrap justify-content-between p-0">
        <li
            v-for="(value, key) in list"
            :key="key">
            <LinkBtn>
                <a
                    class="text-decoration-none"
                    :href="value.content"
                    target="_blank">
                    <font-awesome-icon
                        class="p-0"
                        :icon="value.icon" />
                    {{ key }}
                </a>
            </LinkBtn>
        </li>
    </ul>
</template>

<script>
import LinkBtn from '~/components/common/buttons/LinkBtn'

export default {
    components: {
        LinkBtn,
    },
    computed: {
        list() {
            return this.$store.state.about.contact
        }
    },
}
</script>

<style lang="scss" scoped>
.contact-list{
    gap: $spacer;
}
</style>