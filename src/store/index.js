import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const state = {
  isIndex:true,
  token: null,
  adminInfo: {
    id:'',
    level:'',
  },
  orderList:[
   {id:10001,grand:'华帝',category:'抽油烟机',name:'CXW-228',tag:'T型机/自动清洗',size:'895x647x517mm',packageSize:'965x700x577mm',power:'250W',weight:'24kg',price:'2699',sales:'10'}, 
   {id:10002,grand:'华帝',category:'抽油烟机',name:'CXW-228',tag:'T型机/自动清洗',size:'895x647x517mm',packageSize:'965x700x577mm',power:'250W',weight:'24kg',price:'2699',sales:'10'},
   {id:10003,grand:'华帝',category:'抽油烟机',name:'CXW-228',tag:'T型机/自动清洗',size:'895x647x517mm',packageSize:'965x700x577mm',power:'250W',weight:'24kg',price:'2699',sales:'10'},
   {id:10004,grand:'华帝',category:'抽油烟机',name:'CXW-228',tag:'T型机/自动清洗',size:'895x647x517mm',packageSize:'965x700x577mm',power:'250W',weight:'24kg',price:'2699',sales:'10'},
   {id:10005,grand:'华帝',category:'抽油烟机',name:'CXW-228',tag:'T型机/自动清洗',size:'895x647x517mm',packageSize:'965x700x577mm',power:'250W',weight:'24kg',price:'2699',sales:'10'},
   {id:10006,grand:'华帝',category:'抽油烟机',name:'CXW-228',tag:'T型机/自动清洗',size:'895x647x517mm',packageSize:'965x700x577mm',power:'250W',weight:'24kg',price:'2699',sales:'10'}
  ]
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
  },
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
