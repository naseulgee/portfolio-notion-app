<template>
    <h2
        class="title container mb-3"
        :class="[...classObj.titleClass]">
        Work Point
    </h2>
    <ul
        class="container d-flex flex-wrap align-content-start justify-content-center align-items-start"
        :class="[...classObj.containerClass, { iconOff }]">
        <li>
            <span :class="[...classObj.iconClass]">
                <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-icons"
                    bounce />
            </span>
            <strong :class="['subtitle', ...classObj.subtitleClass]">
                다양한 환경
            </strong>
            <p :class="['dec', ...classObj.decClass]">
                환경에 영향을 받지 않고 동일한 정보를 전달하도록 개발합니다.
            </p>
        </li>
        <li>
            <span :class="[...classObj.iconClass]">
                <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-gauge-high"
                    bounce />
            </span>
            <strong :class="['subtitle', ...classObj.subtitleClass]">
                속도 개선
            </strong>
            <p :class="['dec', ...classObj.decClass]">
                사용자가 사이트에 집중할 수 있도록 속도 개선에 대해 끊임 없이 고민하며 불필요한 인터렉션을 최소화 하기 위해 노력합니다.
            </p>
        </li>
        <li>
            <span :class="[...classObj.iconClass]">
                <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-magnifying-glass-chart"
                    bounce />
            </span>
            <strong :class="['subtitle', ...classObj.subtitleClass]">
                데이터 기반
            </strong>
            <p :class="['dec', ...classObj.decClass]">
                사용자의 행동 경로와 A/B 테스트 등의 통계를 기반으로 개발합니다.
            </p>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        classObj: {
            type: Object,
            default: () => {
                return {
                    containerClass: [],
                    titleClass: [],
                    subtitleClass: [],
                    iconClass: [],
                    decClass: [],
                }
            }
        },
        iconOff: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    gap: $spacer;
    li{
        flex: 1;
        flex-shrink: 0;
        min-width: 200px;
        .icon{
            display: inline-block;
            color: $primary;
            font-size: $h3-font-size;
            --fa-bounce-start-scale-x: 1;
            --fa-bounce-start-scale-y: 1;
            --fa-bounce-jump-scale-x: 1;
            --fa-bounce-jump-scale-y: 1;
            --fa-bounce-land-scale-x: 1;
            --fa-bounce-land-scale-y: 1;
            --fa-animation-duration: 2s;
        }
        &:nth-child(2) .icon{
            --fa-animation-delay: 0.2s;
        }
        &:nth-child(3) .icon{
            --fa-animation-delay: 0.5s;
        }
        .subtitle{
            display: block;
            margin: $spacer auto ($spacer * .5);
        }
    }
}
</style>