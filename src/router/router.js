import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store.js";
import { firebase } from "@firebase/app";
import "@firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/legal",
      name: "legal",
      component: () => import("@/views/Legal.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Signup.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/analyze",
      name: "analyze",
      component: () => import("@/views/Analyze.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/analyze/:survey/:feature",
          name: "analyzeSurvey",
          component: () => import("@/components/analyze/AnalyzeSurvey.vue"),
          props: true
        }
      ]
    },
    {
      path: "/create/overview",
      name: "createOverview",
      alias: "/create",
      component: () => import("@/views/Create.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/create/basics",
      name: "createBasics",
      component: () => import("@/views/Basics.vue"),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/create/questions",
      name: "createQuestions",
      component: () => import("@/views/Questions.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/create/questions/new-question",
          name: "createNewQuestion",
          component: () => import("@/components/create/NewQuestion.vue"),
          props: true,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/create/preview",
      name: "createPreview",
      component: () => import("@/views/Preview.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ],
  //saves the scroll position if the user uses the back button
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash, offset: { x: 0, y: 0 } };
    }
    return { x: 0, y: 0 };
  }
});

export default router;

//navigaitonal guard for auth users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth) {
    if (currentUser) {
      next();
      return;
    }
    //handles reloads
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //if the user is logged in after reload, his data is restored
        store
          .dispatch("authModule/AUTH_PageReload", user)
          .then(() => {
            //and the surveys are being downloaded again
            store.dispatch("surveyModule/DATA_getSurveys");
          })
          .then(() => {
            next();
          });
      } else {
        //if the user is not logged in anymore, he is taken to the login screen
        next({ name: "login" });
      }
      return;
    });
  }
  next();
});
