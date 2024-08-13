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
            portfolios: [],
            loading   : false,
            addImages    : [],
        }
    },
    // 계산된 데이터. computed와 유사
    // ★호출(사용): this.$store.getters['모듈명/함수명', 전달 인수]
    getters   : {
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
            try {
                // 로딩 상태일 경우 반복 요청 방지
                if(context.state.loading) return

                context.commit('updateState', {
                    loading: true,
                })

                // [참고] https://developers.notion.com/reference/property-object
                const res = await _fetchNotion({
                    filter: {
                        property: "hide",
                        // rich_text: {
                        //     is_not_empty: true
                        // },
                        checkbox: {
                            equals: false,
                        },
                        // number: {
                        //     greater_than_or_equal_to: 2,
                        // },
                        // "contains": "A",
                    },
                    sorts: [
                        {
                            property: '기간',
                            direction: 'descending', // ascending
                        },
                    ],
                })
                console.log("searchPortfolios:::", res.data)

                context.commit('updateState', {
                    // 갱신할 데이터 : 전달할 데이터
                    portfolios: res.data.results
                })
            } catch (error) {
                console.log(error)
                context.commit('updateState', {
                    portfolios: [],
                })
            } finally {
                context.commit('updateState', {
                    loading: false,
                })
            }
        },
        // 첨부 이미지 목록 검색
        async searchAddImages(context, payload) {
            try {
                // 로딩 상태일 경우 반복 요청 방지
                if(context.state.loading) return

                context.commit('updateState', {
                    loading: true,
                })

                const { database_id, type } = payload
                // [참고] https://developers.notion.com/reference/property-object
                const res = await _fetchNotionAddImages({
                    ...payload,
                    filter: {
                        and: [
                            {
                                property: "Project API",
                                relation: {
                                    contains: database_id
                                }
                            },
                            {
                                property: "type",
                                select: {
                                    equals: type
                                }
                            },
                        ]
                    }
                })
                console.log("searchAddImages:::", res.data)

                context.commit('updateState', {
                    // 갱신할 데이터 : 전달할 데이터
                    addImages: res.data.results.map(el => el.properties)
                })
            } catch (error) {
                console.log(error)
                context.commit('updateState', {
                    addImages: [],
                })
            } finally {
                context.commit('updateState', {
                    loading: false,
                })
            }
        },
    },
}

// 내부에서만 사용한다는 의미로 함수명 앞에 언더바(_) 추가
async function _fetchNotion(payload) {
    // API KEY 를 포함하여 요청하는 로직은 서버리스 함수로 이동
    return await axios.post('/.netlify/functions/notion', payload)
}

async function _fetchNotionAddImages(payload) {
    // API KEY 를 포함하여 요청하는 로직은 서버리스 함수로 이동
    return await axios.post('/.netlify/functions/notionAddImg', payload)
}