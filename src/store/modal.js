export default {
    namespaced: true,
    state     : () => {
        return {
            on: false,
            title: '',
            imgSrc: '',
            dec: ''
        }
    },
    mutations : {
        resetModal(state) {
            state.on = false,
            state.title = '',
            state.imgSrc = '',
            state.dec = ''
        },
        updateState(state, payload) {
            for (const key in payload) {
                state[key] = payload[key]
            }
        },
    },
    actions   : {
        showModal({ commit }, payload) {
            commit('updateState', {
                on: true,
                ...payload,
            })
        },
        closeModal({ commit }) {
            commit('resetModal')
        },
    },
}