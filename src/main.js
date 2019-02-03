import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

export default new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
