<template>
  <div class="container_all">
    <div class="modal" tabindex="-1" id="modal1">
      <div class="modal-dialog">
        <div class="modal-content">
          <form v-on:submit.prevent="processCreatePost">
            <input type="text" placeholder="Imagen" />
            <br />
            <input
              type="text"
              
              placeholder="Descripcion"
            />
            <br />
            <select  name="select_category">
              <option disable selected>Seleccione una categoria</option>
              <option>Ayuda</option>
              <option>Preguntas</option>
              <option>Experiencias</option>
              <option>Desarrollos</option>
              <option>Proyectos</option>
            </select>
            <button type="submit" data-dismiss='modal'>Registrarse</button>
          </form>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" type="button" data-toggle='modal' data-target='#modal1'>Registrarse</button>
  </div>

   

  <!-- <h2>Agregar Post</h2>
        <img class="imagenlogo" src="Imagenes/mintagram.png" /> 
        <form v-on:submit.prevent="processSignUp">
          <input type="text" v-model="post.image" placeholder="Imagen" />
          <br />
          <input type="text" v-model="post.description" placeholder="Descripcion" />
          <br />
           <select v-model="post.category" name="select_category">
              <option disable selected>Seleccione una categoria</option>
              <option>Ayuda</option>
              <option>Preguntas</option>
              <option>Experiencias</option>
              <option>Desarrollos</option>
              <option>Proyectos</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
      </section>
    </div>
  </div>-->
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
      console.log(this.user);
      await this.$apollo
        .mutate({
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
        })
        .then((result) => {
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
  },
};
</script>

<style>
/*.container_all {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal h2 {
  color: #283747;
}
.modal form {
  width: 70%;
}
.modal input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.modal button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.modal button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
.modal p {
  height: 40px;
  text-align: center;
  font-size: 18px;
}

.imagenlogo {
  width: 70%;
  height: 50%;
}*/
</style>
