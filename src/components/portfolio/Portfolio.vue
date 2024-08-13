<template>
    <article>
        <p>icon: {{ icon }}</p>
        <!-- <p>public_url: {{ portfolio.public_url }}</p> -->
        <hr />
    </article>
</template>

<script>
export default {
    // 부모 컴포넌트에게 전달받을 속성 정의
    props: {
        portfolio: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    data() {
        return {
        }
    },
    computed: {
        icon() {
            const { icon } = this.portfolio
            if(!icon) return ''
            if(icon.emoji) return icon.emoji
            return this.getImgUrl(icon)
        },
    },
    methods: {
        getImgUrl(obj) {
            if(!obj)         return ''
            if(obj.file)     return obj.file.url
            if(obj.external) return obj.external.url
            return ''
        },
    },
    mounted(){
        // console.log(this.portfolio.cover)
        // console.log(this.portfolio.icon)
    }
}
</script>