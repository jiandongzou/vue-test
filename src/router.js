import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router= new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: resolve => require(['./components/home.vue'],resolve)
     
    },{
      path: "/http",
      name: "http",
      component: resolve => require(['./components/http.vue'],resolve),
        beforeEnter: (to, from, next) => {
          // console.log(to);
          next();
          // console.log(from);
          // console.log(next);
      }
    }
    ,{
      path: "/login",
      name: "login",
      component: resolve => require(['./components/test.vue'],resolve) 
    }

  ]
});
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login') {
//       alert("登录");
//     next({ name: 'login',path:'/login'});
//   }else{
//     console.log("登录成功");
//      next();
//   }
  
// })
export default router
