import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NewBookmark from '@/views/NewBookmark.vue'
import AccountView from '@/views/AccountView.vue'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path:'/register',
    name:'register',
    component: RegisterView
  },
  {
    path:'/newBookmark',
    name:'newBookmark',
    component: NewBookmark
  },
  {
    path:'/favorites',
    name:'favorites',
    meta:{
      component:'appBookmarkList'
    },
    component: AccountView
  },
  {
    path:'/likes',
    name:'likes',
    meta:{
      componentName:'appBookmarkList'
    },
    componentName: AccountView
  },
  {
    path:'/settings',
    name:'settings',
    meta:{
      componentName:'userSettings'
    },
    component: AccountView
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,_,next)=>{
  const authRequiredRoutes = ["home"]
  const authNotRequiredRoutes = ["login","register"]
  const _isAuthenticated = store.getters._isAuthenticated;

  if(authNotRequiredRoutes.indexOf(to.name) >-1 && _isAuthenticated){
    next(false);
  }
  if(authRequiredRoutes.indexOf(to.name) > -1){
    if(_isAuthenticated) next();
    else next({name:"login"})
  }else{
    next();
  }
})

export default router;
