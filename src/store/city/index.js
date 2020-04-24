const state = {
    nm:window.localStorage.getItem("newNm") || "北京",
    id:window.localStorage.getItem("newId") || 1
}
const mutations = {
    CITY_INFO(state,params){
        state.nm = params.nm;
        state.id = params.id;
    }
}
const actions = {

}
export default {
    // namespaced : true,
    state,
    mutations,
    actions,
}