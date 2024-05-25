import {getResource} from "@/apis";

export default {
    namespaced: true,
    state: {
        sectionList: [],
        carouseList: [],
        resourceLoaded: false
    },
    getters: {},
    mutations: {
        setResource(state, resource) {
            if (resource.sectionList) {
                state.sectionList = resource.sectionList;
            }
            if (resource.carouseList) {
                state.carouseList = resource.carouseList;
            }
        }
    },
    actions: {
    }
}
