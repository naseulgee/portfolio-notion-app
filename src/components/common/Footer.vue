<template>
    <footer>
        <h1>Footer</h1>
        <div class="slogan-wrapper">
            <template v-if="this.$route.meta.next == 'Projects'">
                <PjtSlogan
                    v-for="i in 2"
                    :key="i" />
            </template>
            <template v-if="this.$route.meta.next == 'About Me'">
                <AboutSlogan
                    v-for="i in 2"
                    :key="i" />
            </template>
            <template v-if="this.$route.meta.next == 'Contact'">
                <ContactSlogan
                    v-for="i in 2"
                    :key="i" />
            </template>
        </div>
        <div class="container py-1 text-center">
            <Logo />
            <p class="m-0">
                (c) {{ new Date().getFullYear() }} SeulGee All rights reserved.
            </p>
        </div>
    </footer>
</template>

<script>
import Logo from "~/components/common/Logo"
import PjtSlogan from "~/components/projects/Slogan";
import AboutSlogan from "~/components/about/Slogan";
import ContactSlogan from "~/components/contact/Slogan";

export default {
    components: {
        Logo,
        PjtSlogan,
        AboutSlogan,
        ContactSlogan,
    }
}
</script>