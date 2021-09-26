import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { APP_USER } from "@/services/config";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  let userDetails = null;
  var guestAccessRoutes = ["Login", "Register", "NOTFOUND"];
  var protectedAccessRoutes = ["DASHNOTFOUND"];

  if (localStorage.getItem(APP_USER)) {
    try {
      userDetails = JSON.parse(localStorage.getItem(APP_USER));
    } catch (err) {
      console.log(err);
    }
  }

  // if not logged in, redirect to login page
  if (!userDetails || !userDetails.role) {
    if (guestAccessRoutes.includes(to.name)) return next();
    return next({
      name: "Login"
    });
  }

  switch (userDetails.role) {
    case "ADMIN":
      protectedAccessRoutes = protectedAccessRoutes.concat([
        "Dashboard",
        "Profile",
        "Types",
        "Suppliers",
        "Sites"
      ]);
      break;
    case "SUPPLIER":
      protectedAccessRoutes = [
        ...protectedAccessRoutes,
        "Dashboard",
        "Profile",
        "Types",
        "Suppliers",
        "MySites",
        "Tables",
        "Types",
        "Type",
        "Suppliers",
        "Supplier"
      ];
      break;
    default:
      break;
  }

  console.log(to.name);
  if (!protectedAccessRoutes.includes(to.name))
    next({
      name: "DASHNOTFOUND"
    });
  else next();
});

export default router;
