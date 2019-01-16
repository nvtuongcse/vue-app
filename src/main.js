/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import jwt from "jsonwebtoken";
import Explore from "./components/Explore.vue";
import Login from "./components/Login.vue";
import Account from "./components/Account.vue";
import NewPost from "./components/NewPost.vue";
import FindFriends from "./components/FindFriends.vue";
import ViewAccount from "./components/ViewAccount.vue";
import ViewPost from "./components/ViewPost.vue";
import WorkBook from "./components/xlsx/workbook.vue";
import store from "./store";
import VueLS from "vue-localstorage";
import VueToasted from "vue-toasted";
const JWTSECRETKEY = "vueappjwtkey";



Vue.config.productionTip = false;
Vue.use(VueToasted, {
  duration: 5000
});
Vue.use(VueRouter);
Vue.use(VueLS);

const user = Vue.localStorage.get("user", { token: null }, Object);
try {
  jwt.verify(user.token, JWTSECRETKEY);
  store.state.user = user;
} catch (error) {
  store.state.user = { token: null };
}

const router = new VueRouter({
  routes: [
    { path: "/test", component: WorkBook },
    { path: "/", component: Explore, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
    {
      path: "/post/:postId",
      component: ViewPost,
      meta: { requiresAuth: true }
    },
    {
      path: "/account",
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: "/account/:profileId",
      component: ViewAccount,
      meta: { requiresAuth: true }
    },
    { path: "/new-post", component: NewPost, meta: { requiresAuth: true } },
    {
      path: "/find-friends",
      component: FindFriends,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (
    !store.state.user.token &&
    to.matched.some(route => route.meta.requiresAuth)
  ) {
    next({ path: "/login" });
  } else if (
    store.state.user.token &&
    to.path.toLocaleLowerCase() === "/login"
  ) {
    next({ path: "/" });
  } else {
    next();
  }
});

new Vue({
  localStorage: {
    user: {
      type: Object,
      default: {
        token: null
      }
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
