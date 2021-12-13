<template>
  <div class="container_all">
    <div class="post_create">
      <section class="form_create_post">
        <form v-on:submit.prevent="getUser">
          <h2>Anade tu post</h2>
          <input v-model="post.image" type="text" placeholder="Imagen" />
          <br />
          <input
            v-model="post.description"
            type="text"
            placeholder="Descripcion"
          />
          <br />
          <select v-model="post.categoria" name="select_category">
            <option disable selected>Seleccione una categoria</option>
            <option>Ayuda</option>
            <option>Preguntas</option>
            <option>Experiencias</option>
            <option>Desarrollos</option>
            <option>Proyectos</option>
          </select>
          <button type="submit">Crear Post</button>
          <br />
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "CreatePost",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      username: "",
      post: {
        username: "",
        image: "",
        like: [],
        description: "",
        categoria: "",
        comments: [],
        
      },
    };
  },

  

  methods: {
    getUser: async function(){
      await this.$apollo.query({
        query: gql`
        query Query($userId: Int!) {
          userDetailbyId(userId: $userId) {
            username
          }
        }`,
        variables: {
            userId: this.userId,
          },
      }).then((result) => {
          console.log(result);
          //alert("Post creado satisfactoriamente");
         this.username= result.data.userDetailbyId.username;
         console.log(this.username);
         this.getPost()
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el proceso creacion post1.");
        });
    },
    getPost: async function () {
      await this.$apollo
        .query({
          query: gql`
            query Query($username: String!) {
              postByUsername(username: $username) {
                username
                image
                description
                like {
                  id
                  usernameOrigin
                  postIdDestiny
                  likedate
                }
                categoria
                comments {
                  id
                  usernameOrigin
                  postIdDestiny
                  commentdate
                  message
                }
              }
            }
          `,
          variables: {
            username: this.username,
          },
        })
        .then((result) => {
          console.log(result);
          //alert("Post creado satisfactoriamente");
          //console.log(this.post);
          this.post.username = this.username;
          //this.post.like = [];
          //this.post.comments = [];
          console.log(this.post);
          this.createPost();
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el proceso creacion post2.");
        });
    },
    createPost: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($post: PostInput!) {
              createPost(post: $post) {
                id
                username
                image
                description
                postdate
                categoria
              }
            }
          `,
          variables: {
            post: this.post,
          },
        })
        .then((result) => {
          console.log(result);
          alert("Post creado satisfactoriamente");
          this.$router.push({ name: "post" });
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el proceso creacion post3.");
        });
    },
    
  },
  created: function () {
      //this.getPost();
    },
}
</script>

<style>
/** {
  margin: 0;
  padding: 0;
}
button {
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 15px;

  display: block;
  page-break-after: 15 20px;
}
.modal1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.1);
  z-index: 101;
}
fade-enter {
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.2);
}
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
}

.modal form {
  width: 70%;
}*/
</style>