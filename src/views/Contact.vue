<template>
    <!-- s: intro -->
    <section class="container py-5">
        <Intro />
    </section>
    <!-- e: intro -->
    <!-- s: 문의 -->
    <section class="container my-4">
        <ContactForm class="mb-5" />
        <!-- s: 연락처 리스트 -->
        <ContactList />
        <!-- e: 연락처 리스트 -->
    </section>
    <!-- e: 문의 -->
    <!-- s: 풋터 슬로건 -->
    <section class="overflow-hidden">
        <RouterLink
            class="text-hover-none text-decoration-none"
            to="/about-me">
            <div class="container mt-5">
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
import Intro from '~/components/contact/Intro'
import ContactForm from '~/components/contact/ContactForm'
import ContactList from '~/components/contact/ContactList'

export default {
    components: {
        ArrowBottomBtn,
        SloganSlide,
        Intro,
        ContactForm,
        ContactList,
    },
}
</script>