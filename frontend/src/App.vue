<template>
  <div id="appold" class="app">
    <div>
      <header class="header">
        <div id="encabezado">
          <div id="logo">
            <img
              v-on:click="loadMainPage"
              src="@/assets/mintagram.png"
              alt=""
              style="cursor: pointer"
            />
          </div>
          <div id="buscar" style="width: 33%; float: left">
            <form v-on:submit.prevent="searchUsers">
              <input
                id="searchUserInputField"
                type="text"
                placeholder="Buscar usuarios..."
                required
                autocomplete="off"
                style="font-size: 17px; padding: 15px auto"
              />
              <a v-on:click="searchUsers()" style="cursor: pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-search ml-2 mb-2"
                  viewBox="0 0 16 16"
                  style="color: #440080"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </a>
            </form>
          </div>
          <div id="menu">
            <ul>
              <li>
                <a v-on:click="loadMainPage" class="enlace">
                  <i class="fas fa-home"> Inicio</i></a
                >
              </li>
              <li @click="showwindow = true" v-if="is_auth">
                <a v-on:click="loadCreatePost" class="enlace">
                  <i class="fas fa-plus-square">Post</i></a
                >
              </li>
              <li v-if="is_auth">
                <a v-on:click="loadChatsPage()" class="enlace">
                  <i class="fas fa-comments"> Chats</i></a
                >
              </li>
              <!-- <li v-if="is_auth"> -->
                <li>
                <a v-on:click="loadUserProfilePage" class="enlace"
                  ><i class="fas fa-user"> Mi perfil</i></a
                >
              </li>
              <!-- <li v-if="is_auth"> -->
                <li>
                <a v-on:click="logOut" class="enlace">
                  <i class="fas fa-sign-out-alt"> Salir</i></a
                >
              </li>
              <!-- <li v-if="!inSignUp && !is_auth"> -->
                <li>
                <a v-on:click="loadSignUpPage" class="enlace"
                  ><i class="fas fa-user-plus"> Registrarse</i></a
                >
              </li>
              <!-- <li v-if="inSignUp && !is_auth"> -->
                <li>
                <a v-on:click="loadLogInPage" class="enlace"
                  ><i class="fas fa-user-circle"> Iniciar sesión</i></a
                >
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:is_inSignUp="is_inSignUp"
      >
      </router-view>
    </div>

    <footer>
      Desarrollado por: Wilinton Ascanio, Alejandro Gutiérrez, Steven Mendez,
      David Nuñez, Diego Sánchez.
      <br />
      Copyright @ 2021 Mintagram | Todos los derechos reservados.
    </footer>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Post from "./components/Post.vue";
import PostByUsername from "./components/PostByUsername.vue";
import jwt_decode from "jwt-decode";

export default {
  name: "App",

  computed: {
    is_auth: {
      get: function () {
        return this.$route.meta.requiresAuth;
      },
      set: function () {},
    },
  },

  components: {
    Post,
    PostByUsername,
  },

  data: function () {
    return {
      inSignUp: false,
      //userId = jwt_decode(localStorage.getItem("token_refresh")).user_id,

      //showwindow: false,
      //username: "",  
    };
  },
  

  methods: {
    completedLogIn: function (dataLogIn) {
      //localStorage.setItem("username", dataLogIn.username);
      localStorage.setItem("token_access", dataLogIn.token_access);
      localStorage.setItem("token_refresh", dataLogIn.token_refresh);
      this.$router.push({ name: "post" });
    },

    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
    is_inSignUp: function (data) {
      this.inSignUp = data;
    },

    logOut: function () {
      localStorage.clear();
      this.loadLogInPage();
    },

    loadMainPage: function () {
      // this.verifyAuth();
      this.$router.push({ name: "post" });
    },

    loadLogInPage: function () {
      this.$router.push({ name: "logIn" });
      this.inSignUp = false;
    },

    loadSignUpPage: function () {
      this.$router.push({ name: "signUp" });
    },

    loadUserProfilePage: function () {
      this.$router.push({ name:"userInfo"})
    },
    loadCreatePost: function () {
      this.$router.push({ name: "agregarpost"});
    },
    
    
    /*loadCreatePost: function (id) {
      this.$router.push({ name: "agregarpost", params: { id: id }  });
    },*/

    loadChatsPage: function () {
      this.$router.push({ name: "chats" });
    },
    searchUsers: function (user) {
      let user2searchInput = document.getElementById("searchUserInputField");
      if (user2searchInput.value != null && user2searchInput.value != "") {
        alert("query to search user!!");
      } else {
        user2searchInput.focus();
      }
    },
  },
  created: function () {
    //this.$apollo.queries.postAll.refetch();
  },
};
</script>

<style>
body {
  margin: 0 0 0 0;
}
.header {
  background: #68a3e7; 
  /*background: #eeebebe8;*/
  width: 100%;
  height: 9vh;
  /*box-shadow: 0px 0px 9px #a4a4a4;*/
  border-bottom-style: solid;
  /* border-bottom-color: #01a9dc; */
  border-bottom-color: #68a3e7;
  border-bottom-width: 2px;
}

#encabezado {
  /* width: 80%;
  height: 30px;
  margin: auto;*/
  display: flex;
  align-content: space-between;
}
#logo img {
  /* width: 33%; */
  /* height: fit-content; */
  /* overflow: hidden; */
  width: 60%;
  height: auto;
  /* float: left;
  color: #fff;
  font-size: 30px;
  align-items: center; */
}
#logo{
  width: 400px;
}

#menu {
  /* width: 30%; */
  /* height: 10px; */
  float: right;
  text-align: right;
  margin-top: 10px;

  /* margin-bottom: 0px; */
}

#menu ul li {
  /* list-style: none; */
  display: inline-block;
  align-items: center;
}

#menu ul li .enlace {
  display: inline-block;
  color: white;
  /* text-decoration: none; */
  padding: 10px;
  /* font-size: 16px; */
  cursor: pointer;
}

/*accion cuando pasa el cursor sobre el enlace del menu*/
#menu ul li .enlace:hover {
  /* background: #026685; */
  background: #3d066d;
  color: #fff;
  border-radius: 5px 5px 5px 5px;
}

/*--------------buscador de usuarios-----------------------*/
#buscar {
  padding: 5px;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  height: fit-content;
}
#buscar input {
  width: 70%;
  height: 30px;
  font-size: 18px;
  color: black;
  outline: none;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px #ccc inset;
  border-radius: 10px;
}
#buscar .btn {
  background: #440080;
  /* width: 55px;
  height: 32px; */
  text-align: center;
  color: white;
  /* font-size: 20px; */
  border-radius: 10px;
  cursor: pointer;
  border: none;
}
#buscar .btn:hover {
  text-decoration: underline;
  background: #8200f3;
}
.main-component {
  /* height: 80vh; */
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}

footer {
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: space-evenly;

  color: black;
  margin-top: 30px;
  padding: 25px 5px 25px 5px;
  background-color: #afa1a1e8;

  border-top-style: solid;
  border-top-color: #440080;
  border-top-width: 1px;

  width: 100%;
  height: 10vh;
  min-height: 50px;
  bottom: 0;
  left: 0;
  margin-top: 10%;
}
</style>
