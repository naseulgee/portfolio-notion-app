export default {
    namespaced: true,
    state: () => {
        return {
            isLoading: true,
        }
    },
    mutations: {
        updateLoading(state, payload) {
            state.isLoading = payload.isLoading
        },
    },
    actions: {
        changeLoading({ commit }, { isLoading }) {
            commit('updateLoading', {
                isLoading
            })
        }
    }
}