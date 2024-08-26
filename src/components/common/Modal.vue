<template>
    <!-- Modal -->
    <div
        class="modal"
        :class="{ on: modal.on }"
        @click.self="$emit('closeModal')">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header p-2">
                    <h5 class="modal-title">
                        {{ modal.title.replaceAll('\n', ' ') }}
                    </h5>
                    <button
                        @click="$emit('closeModal')"
                        class="btn-close"></button>
                </div>
                <div class="modal-body p-2">
                    <img
                        class="mb-1"
                        :src="modal.imgSrc"
                        alt="확대이미지" />
                    <p>{{ modal.dec }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: [
        'closeModal',
    ],
    props: {
        modal: {
            type: Object,
            default: () => {}
        },
    },
}
</script>