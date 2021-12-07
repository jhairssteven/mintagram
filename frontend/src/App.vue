<template>
  <div id="app" class="app">
    <header class="header">
      <div id="encabezado">
        <div id="logo" style="width: 33%; float: left">Mintagram</div>
        <div id="buscar" style="width: 33%; float: left">
          <form>
            <input type="text" placeholder="Buscar usuarios..." required />
            <button class="btn"><i class="fas fa-search"></i></button>
          </form>
        </div>
        <div id="menu" style="width: 33%; float: left">
          <ul>
            <li>
              <a  v-if="is_auth" v-on:click="loadPost" class="enlace"
                ><i class="fas fa-home"></i>Muro</a
              >
            </li>
            <li>
              <a v-if="is_auth" v-on:click="loadUserInfo" class="enlace"
                ><i class="fas fa-user"></i>Perfil</a
              >
            </li>
            <li>
              <a  v-if="!is_auth" v-on:click="loadLogIn" class="enlace"
                ><i class="fas fa-home"></i>Ingresar</a
              >
            </li>
            <li>
              <a  v-if="!is_auth" v-on:click="loadSignUp" class="enlace"
                ><i class="fas fa-home"></i>Registrarse</a
              >
            </li>
            <li>
              <a v-if="is_auth" v-on:click="logOut" class="enlace"
                ><i class=""></i>Salir</a
              >
            </li>
          </ul>
        </div>
      </div>
    </header>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
      >
      </router-view>
    </div>

    <footer>
      Copyright @2021 Mintagram. Todos los derechos reservados
      <br />
      Desarrollado por: Wilinton Ascanio,Alejandro Gutiérrez, Steven Mendez,
      David Nuñez, Diego Sánchez.
    </footer>
  </div>
</template>

<script>
import Post from "./components/Post.vue";
export default {
  name: "App",
  components: {
    Post,
  },
  data: function () {
    return {
      is_auth: false,
    };
  },
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false)
         this.$router.push({ name: "post" });
       else
        this.$router.push({ name: "post" });
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
     loadPost: function() {
      this.$router.push({ name: "post" });
    },
    loadUserInfo: function() {
      this.$router.push({ name: "userInfo" });
    },
    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth()
       },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
  },

  created: function () {
    this.verifyAuth();
  },
};
</script>

<style>
body {
  margin: 0 0 0 0;
}
.header {
  background: #01a9dc;
  width: 100%;
  height: 50px;
   padding: 0;
  box-shadow: 0px 0px 30px #a4a4a4;
  border-bottom-style: solid;
  border-bottom-color: #01a9dc;
  border-bottom-width: 5px;
}

#encabezado {
  width: 80%;
  height: 30px;
  margin: auto;
  display: flex;
}
#logo {
  width: 33%;
  height: fit-content;
  overflow: hidden;
  float: left;
  color: #fff;
  font-size: 30px;
  margin-top: 10px;
}

#menu {
  width: 30%;
  height: fit-content;
  float: right;
  text-align: right;
  margin-top: 10px;
}

#menu ul li {
  list-style: none;
  display: inline-block;
  margin-top: 10px;
}

#menu ul li .enlace {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  font-size: 20px;
}

.enlace-sidebar{
    width: 100%;
    display: inline-block;
    text-decoration: none;
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
    color: #848484;
}
.enlace-sidebar:hover{
    background: #f2f2f2;
}

/*accion cuando pasa el cursor sobre el enlace del menu*/
#menu ul li .enlace:hover {
  background: #026685;
  color: #fff;
  border-radius: 5px 5px 0px 0px;
}

.app footer {
  background: #01a9dc;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0px 0px 30px #a4a4a4;
  border-bottom-style: solid;
  border-bottom-color: #01a9dc;
  border-bottom-width: 5px;
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
  width: 55px;
  height: 35px;
  text-align: center;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
}
#buscar .btn:hover {
  text-decoration: underline;
  background: #8200f3;
}
.main-component {
  height: 75vh;
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}

</style>