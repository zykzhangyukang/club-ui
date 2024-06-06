export default {
    namespaced: true,
    state: {
        sectionList: [],
        carouseList: [],
        resourceLoaded: false
    },
    getters: {},
    mutations: {
        setSectionList(state, sectionList) {
            state.sectionList = sectionList;
        }
    },
    actions: {
    }
}
