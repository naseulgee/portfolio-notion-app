export default {
    namespaced: true,
    state     : () => {
        return {
            isDark: false,
            whiteNav: false,
        }
    },
    mutations : {
        resetTheme(state) {
            state.isDark = false
        },
        updateState(state, payload) {
            for (const key in payload) {
                state[key] = payload[key]
            }
        },
    },
    actions   : {
        // 다크 테마 설정
        setThemeColor(context, { isDark }) {
            if(context.state.isDark == isDark) return

            context.commit('updateState', {
                isDark,
            })
        },
        // 네비게이션 색상 설정
        setNavColor(context, { whiteNav }) {
            if(context.state.whiteNav == whiteNav) return

            context.commit('updateState', {
                whiteNav,
            })
        },
    },
}