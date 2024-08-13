/** NOTE: 노션 객체 유형에 따른 결과값 처리 플러그인
 * [참고] https://developers.notion.com/reference/property-object
 */
export default {
    install(app) {
        app.config.globalProperties.$notionDBObj = obj => {
            if(!obj) return ''

            const { type } = obj
            if(!type) return ''

            // 체크박스
            if(type == "checkbox") return obj.checkbox

            // 선택
            if(type == "select")       return obj.select.name
            if(type == "multi_select") return obj.multi_select.map(el => el.name)
            if(type == "status")       return obj.status.name

            // 날짜
            if(type == "date")             return obj.date
            if(type == "created_time")     return new Date(type.created_time)
            if(type == "last_edited_time") return new Date(type.last_edited_time)

            // 이미지 및 파일
            if(type == "emoji")    return obj.emoji
            if(type == "external") return obj.external.url
            if(type == "file")     return obj.file.url
            if(type == "files") {
                if(obj.files.length == 0) return ''
                return obj.files.map(el => el[el.type].url)
            }

            // 숫자
            if(type == "number")       return obj.number
            if(type == "phone_number") return obj.phone_number

            // 수식
            if(type == "formula") return obj.formula[obj.formula.type]

            // 텍스트
            if(type == "title" || type == "rich_text") {
                if(obj[type].length == 0) return ''
                return obj[type][0].plain_text.replaceAll("\n", "<br>")
            }
            if(type == "email")     return obj.email

            // 링크
            if(type == "url")      return obj.url
            // if(type == "relation") return obj.relation
            // if(type == "rollup")   return obj.rollup

            // 사람
            if(type == "people")         return obj.people.id
            if(type == "created_by")     return obj.created_by.id
            if(type == "last_edited_by") return obj.last_edited_by.id

            return "Cannot translate object"
        }
    }
}