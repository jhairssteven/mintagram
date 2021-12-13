<template>
  <div class="container_all">
    <div class="post_create">
      <section class="form_create_post">
        <img class="imagenlogo" src="/img/mintagram.57fa65d6.png">
        <form v-on:submit.prevent="getUser">
          <h2>Añade tu post</h2>
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
.form_create_post{
  
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
.post_create{
  margin: 0;     
  padding: 0%;     
  height: 100%;     
  width: 100%;     
  display: flex;     
  justify-content: center;     
  align-items: center;     
  color: #46cef0;
}
.container_all{
  margin: 0%;
  padding: 0%;
  background: white;
}
.form_create_post h2{
  color: #283747;

}
.form_create_post form{
  width: 70%;
  margin: auto;
}
.form_create_post input{
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.form_create_post button{
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  margin: 35px 0 25px 0;
}
.form_create_post button:hover{
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;

}
.form_create_post select{
  
    word-wrap: normal;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #283747;

}
footer{
  margin-top: 30px;
}
</style>