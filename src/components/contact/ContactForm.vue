<template>
    <form
        @submit="validate"
        noValidate>
        <p>
            <font-awesome-icon icon="fa-solid fa-angles-right" />
            Let's Talk
        </p>
        <h1 class="mt-3 mb-4 fs-3">
            Get<br />
            In Touch
        </h1>
        <div class="mb-3">
            <label
                class="form-label">제목</label>
            <input
                type="text"
                ref="title"
                class="form-control"
                placeholder="메일 제목을 입력해 주세요."
                autocomplete="off"
                required />
            <div class="invalid-feedback">
                {{ invalidMsg }}
            </div>
        </div>
        <div class="mb-3">
            <label
                class="form-label">성함</label>
            <input
                type="text"
                ref="name"
                class="form-control"
                placeholder="홍길동"
                autocomplete="off"
                required />
            <div class="invalid-feedback">
                {{ invalidMsg }}
            </div>
        </div>
        <div class="mb-3">
            <label
                class="form-label">이메일</label>
            <input
                type="email"
                ref="email"
                class="form-control"
                placeholder="name@example.com"
                autocomplete="off"
                required
                pattern="email" />
            <div class="invalid-feedback">
                {{ invalidMsg }}
            </div>
        </div>
        <div class="mb-3">
            <label
                class="form-label">문의 내용</label>
            <textarea
                ref="content"
                class="form-control"
                placeholder="문의 내용을 입력해 주세요."
                autocomplete="off"
                rows="3"
                required></textarea>
            <div class="invalid-feedback">
                {{ invalidMsg }}
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
    data() {
        return {
            pattern: {
                email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
            },
            invalidMsg: '',
            msgList: {
                req: '필수 입력값 입니다!',
                email: 'xxx@xxx.xxx 형식으로 입력해 주세요.',
                complete: '문의가 등록되었습니다.\n감사합니다.',
            },
        }
    },
    methods: {
        resetForm() {
            Object.values(this.$refs).forEach(ref => {
                ref.value = ''
                ref.classList.remove('is-invalid')
                ref.classList.remove('is-valid')
            })
        },
        submitForm(payload) {
            this.$store.dispatch('notion/addContact', payload)
            alert(this.msgList.complete)
            this.resetForm()
            return true
        },
        validate() { // 유효성 검사
            const payload = {}
            for (const key in this.$refs) {
                const ref = this.$refs[key]

                if(key == 'form') continue

                // 앞뒤 공백 제거
                ref.value = ref.value.trim()

                // 필수값 체크
                if(ref.required && ref.value == '') {
                    return this.invalid(ref, 'req')
                }
                
                // 패턴 체크
                if(ref.pattern && !this.pattern[ref.pattern].test(ref.value)) {
                    return this.invalid(ref, 'email')
                }

                payload[key] = ref.value
                ref.classList.remove('is-invalid')
                ref.classList.add('is-valid')
            }

            return this.submitForm(payload)
        },
        invalid(target, msgKey) { // 유효성 검사 실패
            this.invalidMsg = this.msgList[msgKey]
            target.classList.remove('is-valid')
            target.classList.add('is-invalid')
            target.focus({ focusVisible: true })
            return false
        }
    },
}
</script>