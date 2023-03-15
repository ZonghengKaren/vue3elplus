
const state = () => ({
    title: '55555',
    loading: false,     // iframe 的loading
    status: 1,      // 登录过的值为2
    travelWebPath: '',
});

const mutations = {
    SET_TRAVEL_TITLE: (state, data) => {
        state.title = data
    },
    SET_TRAVEL_WEBPATH: (state, travelWebPath) => {
        state.travelWebPath = travelWebPath
    },
    SET_TRAVEL_STATUS: (state, status) => {
        state.status = status
    },
    SET_TRAVEL_LOADING: (state, loading) => {
        state.loading = loading
    }
}
const actions = {
    setTravelWebPath({ commit }, travelWebPath) {
        commit('SET_TRAVEL_WEBPATH', travelWebPath);
    },
    setTravelStatus({ commit }, status) {
        commit('SET_TRAVEL_STATUS', status);
    },
    setTravelLoading({ commit }, loading) {
        commit('SET_TRAVEL_LOADING', loading);
    }
};

export default {
    state,
    mutations,
    actions,
}