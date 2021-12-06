import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/logIn',
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/user/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/user/userInfo',
    name: 'userInfo',
    component: UserInfo
  }, {
    path: '/post/',
    name: 'post',
    component: Post
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
