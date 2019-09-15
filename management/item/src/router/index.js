import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const login = r => require.ensure([], () => r(require('@/components/login/index')), 'login');
const Userlist = r => require.ensure([], () => r(require('@/components/manage/uerlist')), 'Userlist');
const shopList = r => require.ensure([], () => r(require('@/components/manage/shopList')), 'shopList');
 import Conent from "@/components/content/index";
 import foodList from "@/components/manage/footlist";
 import orderList from "@/components/manage/orderlist";
 import adminList from "@/components/manage/controller";
import Addshop from '@/components/addShop/addShop'
import Addfood from '@/components/addShop/addfood'
import Visitor from '@/components/content/chart/chart'
import Compile from '@/components/content/compile/compile'
import Explain from '@/components/content/explain/explain'
import Set from '@/components/content/set/set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      
    },{
      path: '/manage',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path: '/',
          name: 'Conent',
          component:Conent 
        },
        {
          path: '/manage/Userlist',
          name: 'Userlist',
          component: Userlist
        },{
          path: '/manage/shopList',
          name: 'shopList',
          component: shopList
        },{
          path: '/manage/foodList',
          name: 'foodList',
          component: foodList
        },{
          path: '/manage/orderList',
          name: 'orderList',
          component: orderList
        },{
          path: '/manage/adminList',
          name: 'adminList',
          component: adminList
        },{
          path: '/addShop',
          name: 'Addshop',
          component: Addshop,
        },{
          path: '/addFood/:id',
          name: 'Addfood',
          component: Addfood,
        },{
          path: '/visitor',
          name: 'Visitor',
          component: Visitor, 
        }, {
          path: '/vueEdit',
          name: 'Compile',
          component: Compile, 
        },{
          path: '/set',
          name: 'Set',
          component: Set, 
        },{
          path: '/explain',
          name: 'Explain',
          component: Explain, 
        }
      ]

    },
  ]
})
