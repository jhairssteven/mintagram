<template>
  <div class="container_all">
    <section class="userInfo">
      <div class="imagen_foto">
        <img class="imagen_user" v-bind:src="userDetailbyId.profile_image" />
      </div>
      <div class="container_info">
        <div class="name">
          <h1>{{ userDetailbyId.username }}</h1>
        </div>
        <div class="email">
          <h3>{{ userDetailbyId.email }}</h3>
        </div>
        <div class="ocupation">
          <h4>{{ userDetailbyId.ocupation }}</h4>
        </div>
      </div>
      <div class="footer">
        <p class="count"><span>Mintagram</span>|<span>UNAL</span></p>
      </div>
      <div class="container_cover">
        <div class="container_vector"></div>
      </div>
    </section>
    <section class="container-publicaciones">
      <div class="publis">
        <h2 class="titulo"><strong> MIS PUBLICACIONES</strong></h2>
      </div>
      <br />

      <div v-for="post in sortedPost" :key="post.id" class="post">
        <a class="enlace-post">
          <h2 class="titulo-post">{{ post.username }}</h2>
        </a>
        <p>
          <strong>Fecha: </strong
          ><span class="datos-publicaciones">{{ post.postdate }}</span>
        </p>
        <div class="post_description">
          <p>{{ post.description }}</p>
        </div>

        <div id="imagen">
          <img
            class="imagen_post"
            v-bind:src="post.image"
            v-on:click="loadPostDetailPage(post.id)"
          />
        </div>
        <div class="botones">
          <button v-on:click="loadPostEditPage(post.id)" class="editar_post">
            <p class="pboton">Editar <i class="far fa-edit"></i></p>
          </button>
          <button v-on:click="loadDeletePost(post.id)" class="eliminar_post">
            <p class="pboton">Eliminar <i class="far fa-trash-alt"></i></p>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "UserInfo",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      postId: "",

      userDetailbyId: {
        username: "",
        email: "",
        profile_image: "",
        ocupation: "",
        description: "",
      },
      /* postByUsername:{
          id: "",
          username: "",
          postdate: "",
          image: "",

      }*/
    };
  },

  computed: {
    sortedPost() {
      return [...this.postByUsername].sort((a, b) => {
        if (a.postdate > b.postdate) return -1;
        else return 1;
      });
    },
  },

  apollo: {
    userDetailbyId: {
      query: gql`
        query Query($userId: Int!) {
          userDetailbyId(userId: $userId) {
            id_user
            username
            email
            profile_image
            ocupation
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },

    postByUsername: {
      query: gql`
        query Query($username: String!) {
          postByUsername(username: $username) {
            id
            username
            image
            description
            like {
              id
              usernameOrigin
              postIdDestiny
              likedate
            }
            postdate
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
      variables() {
        return {
          username: this.userDetailbyId.username,
        };
      },
    },
  },
  methods: {
    loadPostDetailPage: function (id) {
      this.$router.push({ name: "postDetail", params: { id: id } });
    },
    loadPostEditPage: function (id) {
      this.$router.push({ name: "postEdit", params: { id: id } });
    },
    loadDeletePost: async function (id) {
      if (confirm(`Esta seguro de eliminar este Post?`)) {
        this.postId = id;
        console.log(this.postId);
        this.DeletePost();
      } else {
        this.$router.push({ name: "userInfo" });
      }
    },
    DeletePost: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($postId: String!) {
              deletePost(postId: $postId)
            }
          `,
          variables: {
            postId: this.postId,
          },
        })
        .then((result) => {
          console.log(result);
          alert("Post Borrado satisfactoriamente");
          //this.$router.push({ name: "userInfo" });
          this.$apollo.queries.userDetailbyId.refetch();
          this.$apollo.queries.postByUsername.refetch();
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el proceso de borrado.");
        });
    },
  },
  created: function () {
    this.$apollo.queries.userDetailbyId.refetch();
    this.$apollo.queries.postByUsername.refetch();
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  transition: 0.3s;
}
.container_all {
  width: 100%;
  height: 100%;
  border-top: 1px solid #2e1042;
  background: white;
  /*background-image: url("https://i.blogs.es/031971/hohas/450_1000.jpeg");*/
}

.container_info {
  font-family: "Montserrat";
  background-color: #d4d8e7;
  color: #fdfdfd;
}
.userInfo {
  max-width: 250px;
  margin: 150px auto 0;
  background-color: #d4d8e7;
  box-shadow: 0 10px 90px #f3f1f124;
  text-align: center;
  font-size: 20px;
  border-radius: 15px;
}

.userInfo .imagen_foto {
  position: relative;
  height: 48px;
}
.userInfo .imagen_foto .imagen_user {
  width: 130px;
  height: 130px;
  border-radius: 1000px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 8px solid #68a3e7;
  box-shadow: 0 0 20px #00000033;
}
.userInfo .imagen_foto .imagen_user:hover {
  width: 180px;
  height: 180px;
  border: 8px solid #68a3e7;
}
.userInfo .container_info {
  padding: 10px 20px;
}
.userInfo .container_info .name {
  margin-top: 30px;
  font-size: 22px;
  font-weight: bold;
  color: #0c0b0c;
  font-family: monospace;
}
.userInfo .container_info .name:hover {
  margin-top: 30px;
  font-size: 24px;
  color: #8d528d;
  font-family: monospace;
}
.userInfo .container_info .email {
  font-size: 14px;
  color: #131212;
  font-family: inherit;
}
.userInfo .container_info .email:hover {
  font-size: 16px;
  color: #ffffff;
}
.userInfo .container_info .ocupation {
  color: rgb(14, 13, 13);
  margin-top: 10px;
  font-size: 14px;
}
.userInfo .footer {
  background-color: #68a3e7;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 20px 0 20px 0;
  font-family: monospace;
}
.userInfo .footer .count {
  font-size: 25px;
}

.post_description {
  font-size: 20px;
  font-family: monospace;
  color: rgb(7, 7, 7);
}
.container-publicaciones {
  margin-left: 20px;
  margin-right: 15px;
  display: grid;
  grid-template-columns: repeat(2, 48%);
  grid-template-rows: repeat(5, auto);
  gap: 2%;
  margin-bottom: 10%;
}
.editar_post {
  margin-top: 15px;
  margin-left: 15px;
  font-family: calibri;
  font-size: 25px;
  padding: 5px;
  text-decoration: none;
  background: #3d4f8c;
  cursor: pointer;
  margin-bottom: 5px;
}
.editar_post .pboton {
  color: white;
  margin-bottom: 2px;
}
.editar_post:hover {
  text-decoration: underline;
  color: white;
  background: rgb(37, 37, 87);
}
.eliminar_post {
  margin-top: 15px;
  margin-left: 15px;
  font-family: calibri;
  font-size: 25px;
  padding: 5px;
  text-decoration: none;
  background: #3d4f8c;
  cursor: pointer;
  margin-bottom: 5px;
}
.eliminar_post .pboton {
  color: white;
  margin-bottom: 2px;
}
.eliminar_post:hover {
  text-decoration: underline;
  color: white;
  background: rgb(37, 37, 87);
}

.container-publicaciones div >img{
    width: 500px;
    height: 250px;
    cursor: pointer;
    border: 2px solid rgb(57, 53, 88);
} 
.post{

  width: 500px;
  height: 250px;
  cursor: pointer;
  border: 2px solid pink;
}
.post {
  width: 96%;
  height: max-content;
  padding: 7px;
  background: #fdfdfd;
  border-left-style: solid;
  border-left-width: 5px;
  border-left-color: #0489b1;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #ccc;
  margin-bottom: 20px;
}
.titulo {
  margin-top: 5px;
  font-family: calibri;
  font-size: 30px;
  color: #2e1042;
  margin-bottom: 0px;
}
footer {
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  color: black;
  margin-top: 27px;
  padding: 25px 5px 25px 5px;
  background-color: #eeebebe8;
  border-top-style: solid;
  border-top-color: #440080;
  border-top-width: 1px;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  bottom: 0;
  left: 0;
  margin-top: 200px;
}
</style>

