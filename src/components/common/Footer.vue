<template>
    <footer>
        <div>
            <Logo />
            <p>(c) {{ new Date().getFullYear() }} SeulGee All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
import Logo from "~/components/common/Logo"

export default {
    components: {
        Logo
    },
}
</script>