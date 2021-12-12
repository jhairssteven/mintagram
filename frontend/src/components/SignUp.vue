<template>
  <div class="signUp_user">
    <section class="form_signUp_user">
      <img class="imagenlogo" src="../assets/mintagram.png">
      <h2>Registrarse</h2>
      <!-- <img class="imagenlogo" src="Imagenes/mintagram.png" /> -->
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />
        <input type="email" v-model="user.email" placeholder="Correo" />
        <br />
        <input
          type="password"
          v-model="user.password"
          placeholder="Contraseña"
        />
        <br />
        <input type="text" v-model="user.profile_image" placeholder="Profile_Image" />
        <br />
        <input type="text" v-model="user.ocupation" placeholder="Ocupation" />
        <br />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes una cuenta?
          <a v-on:click="loadLogInPage" style="color: #46cef0; cursor: pointer; text-decoration: underline;">
            <br />Inicia Sesion
          </a>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "SignUp",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        ocupation: "",
        email: "",
        profile_image: "",
        
      },
    };
  },
  methods: {
    loadLogInPage: function () {
      this.$router.push({ name: "logIn" });
    },
    processSignUp: async function () {
      console.log(this.user)
      await this.$apollo.mutate({
          mutation: gql`
          mutation Mutation($userInput: SignUp) {
            signUpUser(userInput: $userInput) {
              refresh
              access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        }).then((result) => {

          let dataSignUp = {
            email: this.user.email,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
  created: function () {
    this.$emit("is_inSignUp", true);
    //this.$emit("is_inLogin", false);
  },
};
</script>

<style>
.signUp_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.form_signUp_user {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.signUp_user h2 {
  color: #283747;
}
.signUp_user form {
  width: 70%;
}
.signUp_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.signUp_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.signUp_user button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
.signUp_user p {
  height: 40px;
  text-align: center;
  font-size: 18px;
}

.imagenlogo {
  width: 70%;
  height: 50%;
}
</style>
