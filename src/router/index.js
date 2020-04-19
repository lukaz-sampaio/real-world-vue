import Vue from "vue";
/**
 * Importando o módulo de rotas. Deve instalar
 * com o npm ou ao criar o projeto via Vue CLI.
 */
import VueRouter from "vue-router";
// import EventCreate from '../views/EventCreate.vue'
// import EventShow from '../views/EventShow.vue'
import EventList from "../views/EventList.vue";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import NProgress from "nprogress";
import store from "@/store/index.js";

/**
 * Informando ao Vue que vai usar o módulo de rotas
 */
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "event-show",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventShow.vue"),
    /**
     * ativando a passagem de propriedades. Pra poder passar
     * a propriedade ":id" via parametro;
     */
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("event/fetchEvent", routeTo.params.id)
        .then(event => {
          routeTo.params.event = event;
          next();
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({
              name: "404",
              params: { resource: "event" }
            });
          } else {
            next({ name: "network-issue" });
          }
        });
    }
  },
  {
    path: "/event/create",
    name: "event-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventCreate.vue")
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue
  },
  /**
   * Essa rota está sendo criada pra quando um outra
   * rota qualquer não existir, então, será redirecionado
   * para a página 404 - NotFound.
   */
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }
  }
];

const router = new VueRouter({
  /**
   * "history mode" serve pra tirar o "#" da URL quando o
   * projeto está em modo de desenvolvimento.
   */
  mode: "history",
  base: process.env.BASE_URL,
  // Adicionando as rotas criadas ao vue-router.
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
