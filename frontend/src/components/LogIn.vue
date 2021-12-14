<template>
  <div class="logIn_user">
    <section class="form-Login">
      <img class="imagenlogo" src="../assets/mintagram.png">
      <h2>Iniciar sesión</h2>
      <!-- <img class="imagenlogo" src="@/assets/mintagram.png"> -->
      <form v-on:submit.prevent="processLogInUser">
        <input type="email" v-model="user.email" placeholder="Correo">
        <br />
        <input type="password" v-model="user.password" placeholder="Password">
        <br />
        <button class="botons" type="submit">Iniciar Sesion</button>
      </form>
      <p>
        ¿No tienes una cuenta?
        <a v-on:click="loadSignUpPage" style="color: #46cef0; cursor: pointer; text-decoration: underline;">
          <br />Registrate
        </a>
      </p>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "LogIn",

  data: function () {
    return {
      user: {
        email: "",
        password: ""
      },
    };
  },

  methods: {
     loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    processLogInUser: async function () {
      await this.$apollo.mutate({
          mutation: gql
            `mutation Mutation($credentials: Login!) {
             logIn(credentials: $credentials) {
                  refresh
                  access
              }
            }`
          ,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          console.log(error);
          alert("algo pasoo");
        });
    },
    loadSignUpPage: function () {
      this.$router.push({ name: "signUp" });
      this.$emit("is_inSignUp", true);
      this.$emit("is_inLogIn", false);
    },
  },

  created: function () {
    // this.$emit("is_inSignUp", false);
    //this.$emit("is_inLogin", true);
  },
};
</script>

<style>
p {
    margin-top: 0;
    margin-bottom: 1rem;
    color: black;
}
.logIn_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #46cef0;
}
.form-Login {
    padding: 30px;
    margin-top: 50px;
    margin-bottom: 18px;
    text-align: center;
    border: 3px solid #283747;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.botons {
  cursor: pointer;
}

.botons :hover {
  text-decoration: rgb(54, 54, 170);
  background-color: rgb(243, 243, 243);
}

.imagenlogo {
  width: 70%;
  height: 50%;
}

.form-Login h2 {
  color: #283747;
}
.form-Login form {
  width: 70%;
  margin: auto;
}
.form-Login input {
  height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #283747;
}
.form-Login button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;

  margin: 35px 0 25px 0;
}
.form-Login button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
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
  margin-top: 14%;
}
</style>
