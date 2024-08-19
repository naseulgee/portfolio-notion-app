<template>
    <!-- s: intro -->
    <section class="container py-5">
        <ArrowBottomBtn>
            Contact
        </ArrowBottomBtn>
        <h1>
            Hello<br />
            Leader
        </h1>
    </section>
    <!-- e: intro -->
    <!-- s: 문의 -->
    <section class="container my-4">
        <ContactForm />
    </section>
    <!-- e: 문의 -->
    <!-- s: FIXME: 연락처 리스트 -->
    <section class="container my-4">
        <ul class="p-0">
            <li>리스트</li>
        </ul>
    </section>
    <!-- e: 연락처 리스트 -->
    <!-- s: 풋터 슬로건 -->
    <section class="overflow-hidden">
        <RouterLink
            class="text-hover-none text-decoration-none"
            to="/about-me">
            <div class="container mt-4">
                <ArrowBottomBtn>
                    About Me
                </ArrowBottomBtn>
            </div>
            <SloganSlide />
        </RouterLink>
    </section>
    <!-- e: 풋터 슬로건 -->
</template>

<script>
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'
import SloganSlide from '~/components/common/SloganSlide'
import ContactForm from '~/components/contact/ContactForm'

export default {
    components: {
        ArrowBottomBtn,
        SloganSlide,
        ContactForm,
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
}
</script>