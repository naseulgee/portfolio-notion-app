<template>
    <footer>
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

export default {
    components: {
        Logo,
    }
}
</script>