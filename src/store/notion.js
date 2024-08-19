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
            addImages : [],
            filterList: [], // 속성 목록
            filters   : [], // 속성 필터링 조건 목록
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
                        const propertiesNameList = portfolio.properties[key].multi_select?.map(option => option.name);
                        // console.log("portfolio:::", propertiesNameList)

                        if(propertiesNameList?.includes(filterString)) {
                            filteredPortfolios[portfolio.id] = portfolio
                        }
                    }
                }
            }
            console.log("filteredPortfolios::::", filteredPortfolios)
            return Object.values(filteredPortfolios)
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
        resetFilters(state) {
            state.filters = []
        },
        resetAddImages(state) {
            state.addImages = []
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
            // 이미 데이터를 받아온 경우 재요청 방지(자주 안바뀔거라)
            if(context.state.portfolios.length != 0) return

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
                const res = await _fetchNotion({
                    isTable: true
                })
                // console.log("searchFilterList:::res:::", res.data.properties)

                const setfilters = [
                    '분류',
                    '담당분야',
                    'stack-Design',
                    'stack-Front',
                    'stack-Back',
                    'stack-DB',
                    'stack-Test',
                    'stack-IDE',
                    'stack-Server'
                ]
                const filterList = Object.values(res.data.properties).filter(pp => {
                    if(setfilters.includes(pp.name)) return pp
                })
                console.log("searchFilterList:::filtered:::", filterList)
                context.commit('updateState', {
                    filterList
                })
            } catch (error) {
                console.log(error)
                context.commit('resetFilterList')
            }
        },
        // 포트폴리오 필터링
        setFilters(context, payload) {
            context.commit('updateState', {
                ...payload
            })
        },
        // 첨부 이미지 목록 검색
        async searchAddImages(context, payload) {
            // 로딩 상태일 경우 반복 요청 방지
            if(context.state.loading) return

            context.commit('updateState', {
                loading: true,
            })

            try {
                const { database_id, type } = payload
                // [참고] https://developers.notion.com/reference/property-object
                const res = await _fetchNotionAddImages({
                    ...payload,
                    filter: {
                        and: [
                            {
                                property: "Project API",
                                relation: { contains: database_id }
                            },
                            {
                                property: "type",
                                select: { equals: type }
                            },
                        ]
                    }
                })
                console.log("searchAddImages:::", res.data)

                context.commit('updateState', {
                    // 갱신할 데이터 : 전달할 데이터
                    addImages: res.data.results.map(el => {
                        return {
                            id: el.id,
                            ...el.properties
                        }
                    }),
                    loading: false,
                })
            } catch (error) {
                console.log(error)
                context.commit('resetAddImages')
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