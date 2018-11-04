import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      redirect: (to) => {
        return '/list';
      }
    },
    {
      path: '/list',
      name: 'prevList',
      meta: {
        title : '商品列表'
      },
      component: (resolve)=>require(['@/shooping/views/list.vue'],resolve)
    },
    {
      path: '/product/:id',
      name: 'product',
      meta: {
        title : '商品详情'
      },
      component: (resolve)=>require(['@/shooping/views/product.vue'],resolve)
    },
    {
      path: '/cart',
      name: 'Cart',
      meta: {
        title : '购物车'
      },
      component: (resolve)=>require(['@/shooping/views/cart.vue'],resolve)
    }
  ]
})

router.beforeEach((to,from,next)=>{
  window.document.title=to.meta.title;

  next();
})

router.afterEach((to,from)=>{
  window.scrollTo(0,0);
});

export default router; 
