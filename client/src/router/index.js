import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    alias: "/",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/registry",
    name: "Registry",
    component: () => import("../views/Registry.vue"),
  },
  {
    path: "/group",
    name: "Group",
    component: () => import("../views/Group/Group.vue"),
    redirect: (to) => {
      return { path: "/" };
    },
    children: [
      {
        path: ":groupId(\\d+)",
        name: "ChatGroup",
        component: () => import("../views/Group/RoomGroup.vue"),
      },
      {
        path: "create",
        component: () => import("../views/Group/AddGroup.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    redirect: (to) => {
      return { path: "/" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
