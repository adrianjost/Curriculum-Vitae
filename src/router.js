import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

Vue.use(VueRouter);

function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `./pages/${path}.vue`);
}

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ path: "/nigol", component: loadView("Login") },

		{ path: "/projects", component: loadView("projects"), alias: "/" },
		{ path: "/about", component: loadView("about") },
		{ path: "/contact", component: loadView("contact") },

		{
			path: "/settings/add",
			component: loadView("backend/id"),
			meta: { isPrivate: true },
		},
		{
			path: "/settings/edit/:id",
			component: loadView("backend/id"),
			meta: { isPrivate: true },
		},
	],
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = store.getters["auth/isAuthenticated"];
	if (!isAuthenticated && to.matched.some((record) => record.meta.isPrivate)) {
		return next({
			path: "/nigol",
			query: {
				redirect: to.fullPath,
			},
		});
	} else if (
		isAuthenticated &&
		to.matched.some((record) => record.path === "/nigol")
	) {
		return next({ path: "/" });
	}
	return next();
});

export default router;
