import gql from "graphql-tag";
import { createRouter, createWebHashHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import App from './App.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import UserInfo from './components/UserInfo.vue'
import Post from './components/Post.vue'
import Chats from './components/Chats.vue'
import PostDetail from './components/PostDetail.vue'
import PostByUsername from './components/PostByUsername.vue'
import PostByCategory from './components/PostByCategory.vue'
import CreatePost from './components/CreatePost.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App,
    meta: { requiresAuth: true}
  },
  {
    path: '/user/logIn',
    name: 'logIn',
    component: LogIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/signUp',
    name: 'signUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/userInfo',
    name: 'userInfo',
    component: UserInfo,
    meta: { requiresAuth: true }
  },
  {
    path: '/muro',
    name: 'post',
    component: Post,
    meta: { requiresAuth: false }
  },
  {
    path: '/postbyusername',
    name: 'postbyusername',
    component: PostByUsername,
    meta: { requiresAuth: true }
  },
  {
    path: '/postbycategory',
    name: 'postbycategory',
    component: PostByCategory,
    meta: { requiresAuth: true }
  },
  {
    path: '/postdetail',
    name: 'postDetail',
    component: PostDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/agregarpost',
    name: 'agregarpost',
    component: CreatePost,
    meta: { requiresAuth: true }
  },
  {
    path: '/chats',
    name: 'chats',
    component: Chats,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: 'https://mintagram-apigateway.herokuapp.com' }),
  cache: new InMemoryCache()
})

async function isAuth() {
  if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
    return false;
  }
  try {
    var result = await apolloClient.mutate({
      mutation: gql`
        mutation ($refresh: String!) {
          refreshToken(refresh: $refresh) {
            access
          }
        }
      `,
      variables: {
        refresh: localStorage.getItem("token_refresh"),
      },
    })

    localStorage.setItem("token_access", result.data.refreshToken.access);
    return true;

  } catch {
    localStorage.clear();
    alert("Sesión expirada, vuelve a iniciar sesión");

    return false;
  }
}

router.beforeEach(async (to, from) => {
  var is_auth = await isAuth();

  if (is_auth || !to.meta.requiresAuth) 
    return true;

  return { name: "logIn" };

})

export default router;
