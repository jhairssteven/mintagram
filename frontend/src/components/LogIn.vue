<template>
  <div class="logIn_user">
    <section class="form-Login">
      <img class="imagenlogo" src="../assets/mintagram.png">
      <h2>Iniciar sesión</h2>
      
      <form v-on:submit.prevent="processLogInUser">
        <input type="email" v-model="user.email" placeholder="Correo">
        <br />
        <input type="password" v-model="user.password" placeholder="Password">
        <br />
        <button class="botons" type="submit">Iniciar Sesion</button>
      </form>
      <p> ¿No tienes una cuenta? <a v-on:click="loadSignUp"> <br>Registrate </a></p>
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
            email: this.user.email,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>

<style>
.logIn_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-Login{
    border: black;
    width: 400px;
    background:#118fb6;
    padding: 30px;
    margin: auto;
    margin-top: 100px;
    border-radius: 4px;
    font-family:"calibri";
    color: rgb(255, 255, 255);
    box-shadow: 7px 14px 37px;
}

.botons{
    cursor: pointer;
}

.botons :hover{
    text-decoration: rgb(54, 54, 170);
    background-color: rgb(243, 243, 243);
}

.imagenlogo{
    width: 70%;
    height: 50%;
}


.form-Login h2 {
  color: #283747;
}
.form-Login form {
  width: 70%;
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
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.form-Login button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>