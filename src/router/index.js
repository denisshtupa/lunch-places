import Vue from "vue";
import VueRouter from "vue-router";
import LunchPlOverview from "../views/LunchPlacesOverview.vue";
import AddPl from "../views/AddPlace.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LunchPlOverview
  },
  {
    path: "/lunch-place",
    name: "LunchPlaceOverview",
    component: LunchPlOverview
  },
  {
    path: "/lunch-place-add",
    name: "AddPlace",
    component: AddPl
  },
  {
    path: "/lunch-place-detail/:placeId",
    name: "LunchPlaceDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LunchPlaceDetail.vue")
  },
  {
    path: "**",
    component: AddPl
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
