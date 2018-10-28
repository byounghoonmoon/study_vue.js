import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
// import getWeb3 from './getWeb3';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);

const store = new Vuex.Store({
	state,
	mutations,
	actions
})
export default store;