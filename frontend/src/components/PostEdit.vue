<template>
  <div class="container_post">
    <section id="left-column">
      <article class="post">
        <a class="enlace-post">
          <h2 class="titulo-post">{{ postById.username }}</h2>
        </a>
        <p>
          <strong>Fecha: </strong
          ><span class="datos-publicaciones">{{ postById.postdate }}</span>
        </p>
        <div id="imagen">
          <img v-bind:src="postById.image" class="img-post" />
        </div>
        <form v-on:submit.prevent="UpdatePost">
          <strong>Elige la categoria </strong>
          <select v-model="post.categoria" name="select_category">
            <option disable selected>Seleccione una categoria:</option>
            <option>Ayuda</option>
            <option>Preguntas</option>
            <option>Experiencias</option>
            <option>Desarrollos</option>
            <option>Proyectos</option>
          </select>
          <br />
          <div class="parrafo-post">
            <strong>Descripcion </strong>
            <input
              v-model="post.description"
              type="text"
              placeholder="Descripcion"
            />
          </div>
          <button type="submit">Actualizar Post</button>
        </form>
      </article>
    </section>
  </div>
</template>
<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";
export default {
  name: "PostDetail",
  data: function () {
    return {
      postId: this.$route.params.id,

      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      post: {
        id: this.$route.params.id,
        description: "",
        categoria: "",
      },
    };
  },

  apollo: {
    postById: {
      query: gql`
        query Query($postId: String!) {
          postById(postId: $postId) {
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
          postId: this.postId,
        };
      },
    },
  },

  methods: {
    UpdatePost: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($post: PostUpdate) {
              updatePost(post: $post)
            }
          `,
          variables: {
            post: this.post,
          },
        })
        .then((result) => {
          console.log(result);
          alert("Post Actualizado satisfactoriamente");
          this.$router.push({ name: "userInfo" });
        })
        .catch((error) => {
          console.log(this.post);
          console.log(error);
          alert("ERROR: Fallo en el proceso de actualizacion.");
        });
    },
  },
  created: function () {
    this.$apollo.queries.postById.refetch();
  },
};
</script>

<style>
/*-----post-----*/
.container_post {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e1e8ee;
}
.left-column {
  width: 65%;
  position: relative;
}

#principal {
  width: 80%;
  height: auto;
  overflow: hidden;
  border: 0px solid;
  margin: 10px auto;
}

/*#publicaciones {
  width: 70%;
  height: auto;
  overflow: hidden;
  border: 0px solid red;
  margin-top: 10px;
  float: left;
}*/
.post {
  width: 100%;
  height: auto;
  /* overflow: hidden; */
  padding: 7px;
  background: #fdfdfd;
  border-left-style: solid;
  border-left-width: 5px;
  border-left-color: #0489b1;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #ccc;
  margin-bottom: 20px;
}
.enlace-post {
  text-decoration: none;
}
#publicaciones a .titulo-post {
  color: #6e6e6e;
  font-size: 22px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
#publicaciones a .titulo-post:hover {
  text-decoration: underline;
}
/* imagen del post*/
#imagen {
  text-align: center;
}
/*#publicaciones .img-post {
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin: 7px;
  padding: 5px;
  border: 2px solid #6e6e6e;
  border-radius: 5px;
}*/

#publicaciones .parrafo-post {
  margin-right: 15px;
  margin-bottom: 7px;
}
#publicaciones .datos-publicaciones {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: #0489b1;
}
#publicaciones .like-btn {
  border-radius: 5px;
  background: #01a9dc;
  width: 80px;
  height: 30px;
  text-align: center;
  color: white;
  cursor: pointer;
  border: none;
}
#publicaciones .like-btn:hover {
  text-decoration: underline;
  background: #026685;
}
#publicaciones .num-comentarios {
  background: #01a9dc;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  padding: 5px;
  cursor: pointer;
  height: 30px;
}
#publicaciones .num-comentarios:hover {
  text-decoration: underline;
  background: #026685;
}
#publicaciones .num-comentarios {
  background: #01a9dc;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  padding: 5px;
  cursor: pointer;
}
#publicaciones .num-comentarios:hover {
  text-decoration: underline;
  background: #026685;
}
#caja-comentarios input[type="text"] {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px #ccc inset;
  padding: 5px 2px;
  border-radius: 10px;
  font-size: 18px;
  color: black;
  width: 90%;
  margin-left: 4px;
  margin-bottom: 4px;
  overflow-y: scroll;
  overflow-x: auto;
}
#imagen .img-post {
  margin-left: auto;
  margin-right: auto;
}
#left-column {
  width: 60%;
  height: auto;
}
#left-column .img-post {
  width: 100%;
  height: auto;
  margin-left: auto;
  text-align: center;
  margin: 7px;
  padding: 7px;
  border-radius: 5px;
}
#right-column {
  width: 35%;
  margin-left: 20px;
}
.like-btn {
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
.num-comentarios {
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
#caja-comentarios .like-btn {
  color: white;
  margin-bottom: 2px;
}
#caja-comentarios .num-comentarios {
}
</style>
