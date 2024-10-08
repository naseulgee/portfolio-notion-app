/** NOTE: store 를 이용하여 상태를 관리하는 모듈 파일
 * [참고] https://vuex.vuejs.org/
 * [참고] https://lodash.com/docs/4.17.15
 * 내보내지는 모듈 -> index.js 플러그인 에서 사용된다.
 */
import axios from 'axios'

export default {
    // 해당 js 파일이 모듈화 되어 사용됨을 선언
    namespaced: true,
    // 모듈에서 취급할 data
    // ★호출(사용): this.$store.state.모듈명.함수명
    state     : () => {
        return {
            loading   : false,
            portfolios: [],
            addImages : {},
            filterList: [], // 속성 목록
            filters   : {}, // 속성 필터링 조건 목록
            stackList : {},
            stackFList: [], // 필터용 스택 목록
            filterNames: {}, // 관계형 속성 이름 꺼내기
        }
    },
    // 계산된 데이터. computed와 유사
    // ★호출(사용): this.$store.getters['모듈명/함수명', 전달 인수]
    getters   : {
        // NOTE: API 를 이용하여 필터링한 데이터를 받을 수 도 있지만, getters 연습과 네트워크 사용을 줄여보기 위해 getters로 작성함
        filteredPortfolios: state => {
            const { portfolios, filters } = state
            // 선택된 필터링 조건이 없으면 포트폴리오 전체 리스트 전달
            if(!filters || Object.values(filters).join('').length == 0) return portfolios
            // console.log("filters:::", filters)

            const filteredPortfolios = {}
            // NOTE: 필터링 조건이 포폴에 작성값 개수보다 작을 확률이 높음으로 필터조건 -> 포폴속성 순으로 반복
            for (const key in filters) {
                const filterValues = filters[key] // 선택된 분류별 필터 값 목록
                // console.log("filterValues:::", filterValues)
                if(!filterValues || filterValues.length == 0) continue

                for (let j = 0; j < filterValues.length; j++) {
                    const filterString = filterValues[j]; // 속성값
                    // console.log("filterString:::", filterString)

                    for (let k = 0; k < portfolios.length; k++) {
                        const portfolio = portfolios[k] // 포트폴리오
                        const { relation } = portfolio.properties[key]
                        // console.log("portfolio:::", portfolio, relation)

                        let propertiesNameList = relation?.map(rel => rel.id)
                        // console.log("propertiesNameList:::", propertiesNameList)

                        if(filterString.includes(',')) {
                            filterString.split(',').forEach(fs => { // id 가 여러개일 수 있음(버전이 여러개라)
                                if(propertiesNameList?.includes(fs)) {
                                    filteredPortfolios[portfolio.id] = portfolio
                                }
                            })
                        } else {
                            if(propertiesNameList?.includes(filterString)) {
                                filteredPortfolios[portfolio.id] = portfolio
                            }
                        }
                    }
                }
            }
            console.log("filteredPortfolios::::", filteredPortfolios)
            return Object.values(filteredPortfolios)
        },
        // 포트폴리오 상세 조회
        portfolio: state => id => {
            const { portfolios } = state
            if(portfolios.length == 0) return null
            if(!id) return portfolios[0]

            for (const el of portfolios) {
                if(el.id == id) {
                    console.log("portfolio:::", el)
                    return el
                }
            }
        },
        filterWithStack(state) {
            return [
                ...state.filterList,
                ...state.stackFList,
            ]
        }
    },
    /** NOTE: state의 데이터를 수정 할 수 있다. (setter)
     * ★호출(사용): commit 으로 호출된다.
     *  - this.$store.commit('모듈명/함수명', 전달 인수)
    */
    mutations : {
        resetPortfolios(state) {
            state.portfolios = []
            state.loading = false
        },
        resetAddImages(state) {
            state.addImages = {}
            state.loading = false
        },
        updateState(state, payload) {
            for (const key in payload) {
                state[key] = payload[key]
            }
        },
    },
    /** NOTE: method와 유사.
     * ★호출(사용): dispatch 로 호출된다.
     *  - this.$store.dispatch('모듈명/함수명', 전달 인수)
     * ★비동기로 동작한다
     * context: 첫 번째 매개변수로, 모듈 내 선언된 데이터를 활용하기 위해 받는다.
     * payload: 두 번째 매개변수로, actions를 호출 할 때 전달하는 인수를 받는다.
     */
    actions   : {
        // 포트폴리오 목록 검색
        async searchPortfolios(context) {
            // 로딩 상태일 경우 반복 요청 방지
            if(context.state.loading) return

            context.commit('updateState', {
                loading: true,
            })

            try {
                // [참고] https://developers.notion.com/reference/property-object
                const res = await _fetchNotion({
                    filter: {
                        property: "hide",
                        checkbox: { equals: false },
                    },
                    sorts: [
                        {
                            property: 'fixed',
                            direction: 'descending', // ascending
                        },
                        {
                            property: '기간',
                            direction: 'descending', // ascending
                        },
                    ],
                })
                console.log("searchPortfolios:::res:::", res.data)

                context.commit('updateState', {
                    portfolios: res.data.results,
                    loading: false,
                })
            } catch (error) {
                console.log(error)
                context.commit('resetPortfolios')
            }
        },
        // 포트폴리오 필터 목록 검색
        async searchFilterList(context) {
            // 이미 데이터를 받아온 경우 재요청 방지(자주 안바뀔거라)
            if(context.state.filterList.length != 0) return

            try {
                // [24.09.22] 포트폴리오 관련 갯수를 설정하기 위해 타입을 relation 으로 변경
                // select, multi_select 타입일 경우
                // // 일반 필터 조회
                // const res = await _fetchNotion({
                //     isTable: true
                // })
                // // console.log("searchFilterList:::res:::", res.data.properties)

                // const filterList = Object.values(res.data.properties).filter(pp => {
                //     if(pp.name == '분류' || pp.name == '담당분야') return pp
                // })

                // relation 타입일 경우
                const pjtTypeRes = await _fetchNotionPjtType({
                    sorts: [
                        {
                            property: 'order',
                            direction: 'descending',
                        },
                    ],
                })
                const partRes = await _fetchNotionPartPosition({
                    sorts: [
                        {
                            property: 'order',
                            direction: 'ascending',
                        },
                    ],
                })
                console.log("pjtTypeRes:::", pjtTypeRes.data.results)
                console.log("partRes:::", partRes.data.results)

                // multi_select 타입 형식 맞추기
                const filterNames = {} // 포트폴리오 목록 표기 시 이름을 빨리 찾기 위한 설정
                const filterList = [
                    { name: '분류', type: 'multi_select', multi_select: { options: [] } },
                    { name: '담당분야', type: 'multi_select', multi_select: { options: [] } },
                ]
                pjtTypeRes.data.results.forEach(part => {
                    const id = part.id
                    const name = part.properties.name.title[0].plain_text
                    const relatedCnt = part.properties.relPage.relation.length
                    filterNames[id] = name

                    filterList[0].multi_select.options.push({ id, name, relatedCnt })
                })
                partRes.data.results.forEach(part => {
                    const id = part.id
                    const name = part.properties.name.title[0].plain_text
                    const relatedCnt = part.properties.relPage.relation.length
                    filterNames[id] = name

                    filterList[1].multi_select.options.push({ id, name, relatedCnt })
                })

                console.log("searchFilterList:::filtered:::", filterList)

                context.commit('updateState', {
                    filterList,
                    filterNames,
                })
            } catch (error) {
                console.log(error)
                context.commit('updateState', {
                    filterList: [],
                    filterNames: {},
                })
            }
        },
        // 포트폴리오 필터링
        setFilters(context, payload) {
            context.commit('updateState', {
                ...payload
            })
        },
        // 첨부 이미지 목록 검색
        async searchAddImages({ commit }, payload) {
            try {
                const { database_id } = payload
                // [참고] https://developers.notion.com/reference/property-object
                const res = await _fetchNotionAddImages({
                    ...payload,
                    filter: {
                        property: "Project API",
                        relation: { contains: database_id }
                    },
                    sorts: [
                        {
                            property: 'pagetype',
                            direction: 'ascending', // descending
                        },
                    ],
                })
                // console.log("searchAddImages:::", res.data)

                const imgList = {}
                res.data.results.forEach(el => {
                    const { type, img, pagedec, pagetype, point } = el.properties
                    const typeName = type.select.name
                    const url = img.files[0].file.url
                    const imgName = img.files[0].name
                    const pagedecText = pagedec.rich_text[0]?.plain_text

                    if(!imgList[typeName] || imgList[typeName].length == 0) imgList[typeName] = []
                    imgList[typeName].push({
                        url,
                        pagedec: pagedecText ? pagedecText : imgName,
                        pagetype: pagetype.select?.name,
                    })
                    if(point.checkbox) imgList.point = { url, pagedec: imgName }
                })
                console.log("searchAddImages:::imgList:::", imgList)

                commit('updateState', {
                    // 갱신할 데이터 : 전달할 데이터
                    addImages: imgList,
                })
            } catch (error) {
                console.log(error)
                commit('resetAddImages')
            }
        },
        // 문의 등록
        async addContact(context, payload) {
            try {
                const res = await _fetchNotionContact(payload)
                console.log("addContact:::", res.data)
            } catch (error) {
                console.log(error)
            }
        },
        // 스택 목록 검색
        async searchStackList(context) {
            // 이미 데이터를 받아온 경우 재요청 방지(자주 안바뀔거라)
            if(context.state.stackFList.length != 0) return

            try {
                const res = await _fetchNotionStacks({
                    sorts: [
                        {
                            property: 'type',
                            direction: 'ascending', // descending
                        },
                        {
                            property: 'order',
                            direction: 'ascending', // descending
                        },
                    ],
                })
                // console.log("searchStackList:::res:::", res.data.results)

                const stackList = {}
                const multiStackList = {} // 참조형 필터 추가(스택)
                res.data.results.forEach(stack => {
                    stackList[stack.id] = stack

                    // multi_select 타입 형식 맞추기
                    const { type, name, hide } = stack.properties
                    // 그룹핑
                    const pid   = type.select.id
                    const pname = type.select.name
                    // 그룹핑 객체가 없으면 생성
                    if(!multiStackList[pname]) multiStackList[pname] = { id: pid, name: pname, type: "multi_select", "multi_select": { options: [] } }

                    // 스택
                    const { id, icon } = stack
                    const stackName = name.title[0].plain_text.split(' ')[0]
                    // 관련 프로젝트 개수 세팅
                    let relatedCnt = 0
                    Object.values(stack.properties).forEach(pp => {
                        if(pp.type == "relation") relatedCnt += pp.relation.length
                    })

                    // 실제 값 넣기
                    const optionList = multiStackList[pname].multi_select.options
                    const beforeOp = optionList[optionList.length - 1]
                    if(beforeOp?.name == stackName){ // 만약 이전 스택명과 이름이 같다면(버전만 다르다면)
                        beforeOp.id         = beforeOp.id + ',' + id
                        beforeOp.relatedCnt = beforeOp.relatedCnt + relatedCnt
                    } else {
                        optionList.push({ id, name: stackName, icon, hide: hide.checkbox, relatedCnt })
                    }
                })
                console.log("searchStackList:::stackList:::", stackList)
                console.log("searchStackList:::multiStackList:::", multiStackList)

                context.commit('updateState', {
                    stackList,
                    stackFList: Object.values(multiStackList)
                })
            } catch (error) {
                console.log(error)
                context.commit('updateState', {
                    stackList: {},
                    stackFList: []
                })
            }
        },
    },
}

// 노션 데이터 요청
async function _fetchNotion(payload) {
    return await axios.post('/.netlify/functions/notion', payload)
}
async function _fetchNotionAddImages(payload) {
    return await axios.post('/.netlify/functions/notionAddImg', payload)
}
async function _fetchNotionContact(payload) {
    return await axios.post('/.netlify/functions/notionContact', payload)
}
async function _fetchNotionPartPosition(payload) {
    return await axios.post('/.netlify/functions/notionPartPosition', payload)
}
async function _fetchNotionPjtType(payload) {
    return await axios.post('/.netlify/functions/notionPjtType', payload)
}
async function _fetchNotionStacks(payload) {
    return await axios.post('/.netlify/functions/notionStacks', payload)
}