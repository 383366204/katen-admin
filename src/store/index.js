import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config/config'

Vue.use(Vuex)
const state = {
  isIndex:true,
  token: null,
  adminInfo: {
    id:'',
    level:'',
  },
  adminList:[],
  baseUrl:config.baseURL
}

const getters = {

}

const actions = {

}

const mutations = {
  setIndexTrue(state) {
    state.isIndex = true;
  },
  setIndexFalse(state) {
    state.isIndex = false;
  },
  setAdminInfo(state, data){
    state.userInfo.id = data.id;
    state.userInfo.level = data.level;
  },
  login(state, data) {
    state.token = data.token;
    state.adminInfo.id = data.id;
    state.adminInfo.level = data.level;
    // 设置头部
    Vue.prototype.$ajax.defaults.headers.common['Authorization'] = state.token;
  }
  ,
  logout(state, router) {
    state.token = null;
    router.push({
      path: '/'
    });
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
