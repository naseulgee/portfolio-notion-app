<template>
    <div class="title-wrap container mb-4">
        <h1 class="title fs-4">
            Performance analysis
        </h1>
        <p class="dec opacity-50">
            제가 개발한 것들이 비즈니스적으로 어떤 파급효과가 있었는지 살펴보기 위해 분석했습니다.
        </p>
    </div>
    <ul class="d-flex justify-content-between m-0 p-1">
        <li
            class="hover-box"
            @click="showModal">
            <div class="cover w-100 h-100">
                <img
                    class="hover-box-img"
                    src="~assets/images/projects/performance-01.jpg"
                    alt="cover" />
            </div>
            <div class="hover-box-info">
                <ArrowBottomBtn color="#fff">
                    <h2 class="subtitle fs-4">
                        노출위치 개선
                    </h2>
                </ArrowBottomBtn>
                <p class="dec ellipsis ellipsis-2 opacity-50 fs-6">
                    적절한 SEO 세팅과 웹 표준, 접근성을 지킨 마크업, 이미지 대신 텍스트 타이핑을 통한<br />
                    SNS 공유 이미지와 네이버 서브 링크, 검색 노출 위치 등 검색결과 개선
                </p>
            </div>
        </li>
        <li
            class="hover-box"
            @click="showModal">
            <div class="cover w-100 h-100">
                <img
                    class="hover-box-img"
                    src="~assets/images/projects/performance-02.jpg"
                    alt="cover" />
            </div>
            <div class="hover-box-info">
                <ArrowBottomBtn color="#fff">
                    <h2 class="subtitle fs-4">
                        느린 로딩을 통한<br />
                        상세페이지 속도 개선
                    </h2>
                </ArrowBottomBtn>
                <p class="dec ellipsis ellipsis-2 opacity-50 fs-6">
                    특정 기준 위치보다 아래에 있는 객체는 스크롤에 반응하여 로딩되기 때문에 로딩 완료까지의 시간이 증가했으나,<br />
                    사용자가 첫 접속 시 한꺼번에 로딩되는 객체의 양이 줄었기 때문에 보다 쾌적함을 제공함
                </p>
            </div>
        </li>
        <li
            class="hover-box"
            @click="showModal">
            <div class="cover w-100 h-100">
                <img
                    class="hover-box-img"
                    src="~assets/images/projects/performance-03.jpg"
                    alt="cover" />
            </div>
            <div class="hover-box-info">
                <ArrowBottomBtn color="#fff">
                    <h2 class="subtitle fs-4">
                        이탈율 감소
                    </h2>
                </ArrowBottomBtn>
                <p class="dec ellipsis ellipsis-2 opacity-50 fs-6">
                    속도 개선을 통한<br />이탈률과 종료율 감소
                </p>
            </div>
        </li>
    </ul>
    <!-- Modal -->
    <div
        ref="modal"
        class="modal"
        @click.self="closeModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header p-2">
                    <h5
                        ref="modalTitle"
                        class="modal-title">
                        Modal title
                    </h5>
                    <button
                        @click="closeModal"
                        class="btn-close"></button>
                </div>
                <div class="modal-body p-2">
                    <img
                        ref="modalImg"
                        class="mb-1"
                        src=""
                        alt="" />
                    <p ref="modalDec"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArrowBottomBtn from '~/components/common/buttons/ArrowBottomBtn'

export default {
    components: {
        ArrowBottomBtn,
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        showModal(event) {
            this.$refs.modal.classList.toggle('on')

            let { target } = event
            if(!target.classList.contains('hover-box')) target = target.closest('.hover-box')

            this.$refs.modalTitle.innerText = target.querySelector('.subtitle')?.innerText.replaceAll('\n', ' ')
            this.$refs.modalImg.src = target.querySelector('.hover-box-img')?.src
            this.$refs.modalDec.innerText = target.querySelector('.dec')?.innerText
        },
        closeModal() {
            this.$refs.modal.classList.toggle('on')
        }
    },
}
</script>

<style lang="scss" scoped>
ul{
    .hover-box{
        width: 32.5%;
        height: 400px;
        font-size: 1.5rem;
    }
}
</style>