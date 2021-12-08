<template>
  <div class="logIn_user">
    <section class="form-Login">
      <h2>Iniciar sesión</h2>
      <!-- <img class="imagenlogo" src="@/assets/mintagram.png"> -->
      <form v-on:submit.prevent="processLogInUser">
        <input type="email" v-model="user.username" placeholder="Correo" />
        <br />
        <input type="password" v-model="user.password" placeholder="Password" />
        <br />
        <button class="botons" type="submit">Iniciar Sesion</button>
      </form>
      <p>
        ¿No tienes una cuenta?
        <a v-on:click="loadSignUpPage" style="color: #46cef0; cursor: pointer">
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
        password: "",
      },
    };
  },

  methods: {
    processLogInUser: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
    loadSignUpPage: function () {
      this.$router.push({ name: "signUp" });
    },
  },

  created: function () {
    this.$emit("is_inSignUp", false);
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
  color: #46cef0;
}
.form-Login {
  border: black;
  width: 400px;
  background: #631ea0;
  padding: 30px;
  margin: auto;
  margin-top: 100px;
  border-radius: 16px;
  font-family: "calibri";
  color: rgb(255, 255, 255);
  box-shadow: 7px 14px 37px;
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
  color: white;
}
.form-Login form {
  width: 70%;
}
.form-Login input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 9px 0;
  border: 0px solid black;
  border-radius: 7px;
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
</style>
