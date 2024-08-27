<template>
    <!-- Modal -->
    <div
        class="modal vw-100 vh-100 position-fixed top-0 start-0"
        :class="{ on: on }"
        @click.self="closeModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header p-2">
                    <h5 class="modal-title">
                        {{ title.replaceAll('\n', ' ') }}
                    </h5>
                    <button
                        @click="closeModal"
                        class="btn-close"></button>
                </div>
                <div class="modal-body p-2">
                    <img
                        class="mb-1"
                        :src="imgSrc"
                        alt="확대이미지" />
                    <p>{{ dec }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('modal', [
            'on',
            'title',
            'imgSrc',
            'dec',
        ]),
    },
    methods: {
        closeModal() {
            this.$store.dispatch('modal/closeModal')
        }
    }
}
</script>