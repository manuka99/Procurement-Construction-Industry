import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Dashboard.vue")
      },
      {
        path: "/types",
        name: "Types",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/ProductType/ProductTypes.vue"
          )
      },
      {
        path: "/types/:id",
        name: "Type",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/ProductType/ProductType.vue"
          )
      },
      {
        path: "/suppliers",
        name: "Suppliers",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Supplier/Suppliers.vue"
          )
      },
      {
        path: "/suppliers/:id",
        name: "Supplier",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Supplier/Supplier.vue"
          )
      },
      {
        path: "/products",
        name: "Products",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Product/Products.vue")
      },
      {
        path: "/products/:id",
        name: "Product",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Product/Product.vue")
      },
      {
        path: "/profile",
        name: "Profile",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
          )
      },
      {
        path: "/sites",
        name: "Sites",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Site/Sites.vue")
      },
      {
        path: "/sites/:id",
        name: "Site",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Site/Site.vue")
      },
      {
        path: "/orders",
        name: "Orders",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/SupplierOrders/SupplierOrders.vue"
          )
      },
      {
        path: "/orders/:id",
        name: "Order",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/SiteOrder/Order.vue")
      },
      {
        path: "/maps",
        name: "maps",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/GoogleMaps.vue")
      },
      {
        path: "/tables",
        name: "Tables",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/RegularTables.vue")
      },
      { path: "/403", name: "DASHNOTFOUND", component: NotFound }
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
      },
      {
        path: "/register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Register.vue")
      },
      { path: "/:pathMatch(.*)*", name: "NOTFOUND", component: NotFound }
    ]
  }
];

export default routes;
