import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import UserInfo from './components/UserInfo.vue'
import Post from './components/Post.vue'
import Chats from './components/Chats.vue'

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
  },
  {
    path: '/post/',
    name: 'post',
    component: Post
  },
  {
    path: '/chats',
    name: 'chats',
    component: Chats
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
