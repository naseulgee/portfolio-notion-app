<template>
    <span
        :class="classNm"
        v-if="tagType == 'text'"
        v-html="getText(prop.type)"></span>

    <a
        :class="classNm"
        v-if="tagType == 'link'"
        :href="getCommonVal(prop.type)"
        target="_blank">바로가기</a>

    <input
        :class="classNm"
        v-if="tagType == 'checkbox'"
        type="checkbox"
        :name="dec"
        :checked="prop.checkbox" />

    <ul
        :class="classNm"
        v-if="tagType == 'list'">
        <li
            :class="childClass"
            v-for="(item, idx) in getList(prop.type)"
            :key="idx">
            {{ item }}
        </li>
    </ul>

    <div
        v-if="tagType == 'image'"
        class="img-wrap w-100 h-100 position-relative">
        <Loader
            v-if="imageLoading[0]"
            position="absolute"
            :size="3" />
        <img
            :class="classNm"
            :src="getImgURL(prop.type)"
            :alt="prop.name ? prop.name : dec" />
    </div>

    <ul
        :class="classNm"
        v-if="tagType == 'images'">
        <li
            class="img-wrap"
            :class="childClass"
            v-for="(item, idx) in getImgsUrl(prop.type)"
            :key="idx">
            <Loader
                v-if="imageLoading[idx]"
                position="absolute"
                :size="3" />
            <img
                :src="item.url"
                :alt="item.name ? item.name : dec" />
        </li>
    </ul>

    <!-- 파일일 경우 -->
</template>

<script>
import Loader from '~/components/common/Loader'

/** NOTE: 실행 순서
 * 템플릿에 출력할 태그 타입 분류
 * -> template 조건 실행
 * -> 태그 생성
 * -> 타입에 맞는 값 추출
 */
export default {
    props: {
        prop: {
            type: Object,
            default: null
        },
        dec: { // 이미지 설명 및 체크박스 name 용
            type: String,
            default: ''
        },
        classNm: {
            type: String,
            require: false
        },
        childClass: {
            type: String,
            require: false
        }
    },
    components: {
        Loader
    },
    data() {
        return {
            imageLoading: [true],
        }
    },
    computed: {
        // 템플릿에 출력할 태그 타입 분류
        // [참고] https://developers.notion.com/reference/property-object
        tagType(){
            if(!this.prop) return
            const { type } = this.prop
            const typeValue = this.prop[type]
            if(!type) return ''

            // 체크박스
            if(type == "checkbox") return 'checkbox'

            if(!typeValue || typeValue.length == 0) return '' // 체크박스일 경우 값이 false 를 갖을 수 있기 때문에 위치 변경

            const text = /(title|rich_text|emoji|email|people|created_by|last_edited_by|number|phone_number|formula|date|created_time|last_edited_time)$/
            const list = /(select|multi_select|status)$/
            const file = /(file|external)$/
            const img  = /(jpe?g|ico|png|gif|webp|svg|bmp)$/

            // 텍스트
            if(text.test(type))    return 'text'
            // 링크
            if(type == "url")      return 'link'
            // 리스트
            if(list.test(type))    return 'list'
            // 파일
            if(file.test(type)) {
                if(img.test(this.fileExt(typeValue.url))) return 'image'
                return 'file'
            }
            // 파일 리스트
            if(type == "files" && typeValue.length > 0) {
                if(img.test(this.fileExt(typeValue[0][typeValue[0].type].url))) return 'images'
                return 'files'
            }

            return type
        },
    },
    methods: {
        // 파일 확장자 추출
        fileExt(url){
            const dotArr = url.split('?')[0].split('.')
            return dotArr[dotArr.length - 1]
        },
        // 타입과 키가 같은 값 추출
        getCommonVal(propType) {
            const typeValue = this.prop[propType]
            return typeValue
        },
        // 텍스트 타입 값 추출
        getText(propType) {
            const typeValue = this.prop[propType]

            // 텍스트
            if(["title", "rich_text"].includes(propType))
                return typeValue[0].plain_text.replaceAll("\n", "<br>")
            // 사람
            if(["people", "created_by", "last_edited_by"].includes(propType))
                return typeValue.id
            // 날짜
            if(propType == "date")
                return typeValue.start + (typeValue.end ? ' ~ ' + typeValue.end : '')
            if(["created_time", "last_edited_time"].includes(propType))
                return typeValue.split('T')[0]
            // 수식
            if(propType == "formula")
                return typeValue[typeValue.type]

            // 이모지, 이메일, 숫자
            return typeValue
        },
        // 선택 타입 값 추출
        getList(propType) {
            const typeValue = this.prop[propType]

            if("multi_select" == propType)
                return typeValue.map(el => el.name)

            return [ typeValue.name ]
        },
        // URL 값 추출
        getImgURL(propType) {
            const typeValue = this.prop[propType]
            this.setImageLoading(typeValue.url)
            return typeValue.url
        },
        // 파일 목록 URL 값 추출
        getImgsUrl(propType) {
            const typeValue = this.prop[propType]

            return [
                ...typeValue.map((el, i) => {
                    this.imageLoading[i] = true
                    this.setImageLoading(el[el.type].url, i)
                    return {
                        url: el[el.type].url,
                        name: el.name
                    }
                })
            ]
        },
        setImageLoading(url, index = 0) {
            this.$loadImage(url)
                .then(() => { // 메모리상 이미지가 로딩이 완료될 때 까지 대기 후
                })
                .catch(error => { // 이미지가 없는 경우 예외처리
                    console.error(error)
                })
                .finally(() => {
                    this.imageLoading[index] = false // 로딩 종료
                })
        }
    },
}
</script>