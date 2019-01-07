import VueX from "vuex";
import Vue from "vue";
import mutations from "./mutations";
import actions from './action';

Vue.use(VueX);

const store = new VueX.Store({
  state: {
    user: {
    },
  },
  mutations,
  actions
});

export default store;
