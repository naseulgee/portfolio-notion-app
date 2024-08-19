<template>
    <form @submit="submit">
        <p>
            <font-awesome-icon icon="fa-solid fa-angles-right" />
            Let's Talk
        </p>
        <h1 class="fs-3">
            Get<br />
            In Touch
        </h1>
        <div class="mb-3">
            <label
                class="form-label">제목</label>
            <input
                type="text"
                ref="title"
                class="form-control is-valid"
                placeholder="안녕하세요!"
                required />
            <div class="invalid-feedback">
                필수 입력값 입니다!
            </div>
        </div>
        <div class="mb-3">
            <label
                class="form-label">이메일</label>
            <input
                type="email"
                ref="email"
                class="form-control is-valid"
                placeholder="name@example.com"
                required />
            <div class="invalid-feedback">
                필수 입력값 입니다!
            </div>
        </div>
        <div class="mb-3">
            <label
                class="form-label">문의 내용</label>
            <textarea
                ref="content"
                class="form-control is-invalid"
                rows="3"
                required></textarea>
            <div class="invalid-feedback">
                필수 입력값 입니다!
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button
                type="submit"
                class="btn btn-primary btn-lg"
                @click="submit">
                Submit
            </button>
        </div>
    </form>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        submit() {
            const { title, email, content } = this.$refs
            if(title.value == '') {
                title.classList.remove('is-valid')
                title.classList.add('is-invalid')
            }else {
                title.classList.remove('is-invalid')
                title.classList.add('is-valid')
            }
            if(email.value == '') {
                email.classList.remove('is-valid')
                email.classList.add('is-invalid')
            }else {
                email.classList.remove('is-invalid')
                email.classList.add('is-valid')
            }
            if(content.value == '') {
                content.classList.remove('is-valid')
                content.classList.add('is-invalid')
            }else {
                content.classList.remove('is-invalid')
                content.classList.add('is-valid')
            }
        }
    },
    watch: {
    },
}
</script>