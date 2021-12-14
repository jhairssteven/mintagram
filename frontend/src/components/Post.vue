<template>
  <div class="container_post">
    <section id="publicaciones">
      <!-- Articulos -->

      <article>
        <div v-for="post in sortedPost" :key="post.id" class="post">
          <a class="enlace-post">
            <h2 class="titulo-post">{{ post.username }}</h2>
          </a>
          <p>
            <strong>Fecha: </strong
            ><span class="datos-publicaciones">{{ post.postdate }}</span>
          </p>
          <div id="imagen">
            <img
              v-on:click="loadPostDetailPage(post.id)"
              v-bind:src="post.image"
              class="img-post"
            />
          </div>
          <p>
            <strong>categoria: </strong
            ><span class="post-category">{{ post.categoria }}</span>
          </p>
          <p class="parrafo-post">
            {{ post.description }}
          </p>
          <p class="likesandcoments">
            <strong>Likes: </strong
            ><span class="datos-publicaciones">{{ post.like.length }}</span>

            <strong>Comments: </strong
            ><span class="datos-publicaciones">{{ post.comments.length }}</span>
          </p>
        </div>
      </article>
    </section>
    <section id="sidebar">
      <section id="buscar2">
        <h2 class="encabezado-sidebar">Buscar</h2>

        <form v-on:submit.prevent="processFindPost">
          <input
            type="text"
            name="buscar"
            v-model="username"
            placeholder="Buscar posts..."
            required
          />
          <button class="boton" type="submit">Ok</button>
        </form>
      </section>

      <section id="categorias">
        <h2 class="encabezado-sidebar">Categorías</h2>
        <form v-on:submit.prevent="processFindPostCategory">
          <select v-model="category" name="select_category">
            <option disable selected>Seleccione una categoria</option>
            <option>Ayuda</option>
            <option>Preguntas</option>
            <option>Experiencias</option>
            <option>Desarrollos</option>
            <option>Proyectos</option>
            <!--<option
              v-for="post in postAll"
              :key="post.id"
              :value="post.categoria"
            >
              {{ post.categoria }}
            </option>-->
          </select>
          <button type="submit" class="btn btn-info boton">Filtrar</button>
        </form>
      </section>
      <!--<section id="ultimos-post">
        <h2 class="encabezado-sidebar">Publicaciones mas populares</h2>
        <a href="" class="enlace-sidebar">
          <h4>Título de la publicación o usuario 5</h4>
          <p class="parrafo-ultimas">
            Esto es una descripción de la noticia publicada el dia de hoy
          </p>
        </a>

        <a href="" class="enlace-sidebar">
          <h4>Título de la publicación o usuario 4</h4>
          <p class="parrafo-ultimas">
            Esto es una descripción de la noticia publicada el dia de hoy
          </p>
        </a>

        <a href="" class="enlace-sidebar">
          <h4>Título de la publicación o usuario 3</h4>
          <p class="parrafo-ultimas">
            Esto es una descripción de la noticia publicada el dia de hoy
          </p>
        </a>

        <a href="" class="enlace-sidebar">
          <h4>Título de la publicación o usuario 2</h4>
          <p class="parrafo-ultimas">
            Esto es una descripción de la noticia publicada el dia de hoy
          </p>
        </a>
      </section>-->
    </section>
  </div>
</template>
<script>
import gql from "graphql-tag";
//import PostByUsername from './components/PostByUsername.vue'

export default {
  name: "Post",

  data: function () {
    return {
      postAll: [],
      username: "",
      category: "",
    };
  },
  computed: {
    sortedPost() {
      return [...this.postAll].sort((a, b) => {
        if (a.postdate > b.postdate) return -1;
        else return 1;
      });
    },
  },
  apollo: {
    postAll: {
      query: gql`
        query Query($constante: String) {
          postAll(constante: $constante) {
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
          constante: null,
        };
      },
    },
  },

  methods: {
    loadPostDetailPage: function (id) {
      this.$router.push({ name: "postDetail", params: { id: id } });
    },
     processFindPost: async function () {
      //alert(this.username);
      //let username1 = this.username;
      this.FindPost(this.username);
    },
    FindPost: async function (username) {
      //alert(this.username);
      await this.$router.push({
        name: "postbyusername",
        params: { username: username },
      });
    },
    processFindPostCategory: async function () {
      //alert(this.category);
      //let username1 = this.username;
      await this.FindPostCategory(this.category);
    },
    FindPostCategory: async function (category) {
      //alert(this.category);
      await this.$router.push({
        name: "postbycategory",
        params: { category: category },
      });
    },
  },
  created: function () {
    this.$apollo.queries.postAll.refetch();
  },
};
</script>

<style>

/*-----post-----*/
#principal {
  width: 80%;
  height: auto;
  overflow: hidden;
  border: 0px solid;
  margin: 10px auto;
}

#publicaciones {
  width: 70%;
  height: auto;
  overflow: hidden;
  border: 0px solid red;
  margin-top: 10px;
  float: left;
}
.post {
  width: 96%;
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
  color: #8500ff;
  font-size: 35px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
#publicaciones a .titulo-post:hover {
  text-decoration: underline;
}
/* imagen del post*/
#imagen {
  text-align: center;
  width: 100%;
}
#publicaciones .img-post {
  width: 85%;
  height: 85%;
  margin-left: auto;
  margin-right: auto;
  text-align: flex;
  margin: 7px;
  padding: 5px;
  border: 2px solid #000000;
  border-radius: 5px;
  margin-top: 35px;
  margin-bottom: 35px;
}

#publicaciones .parrafo-post {
  margin-right: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
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

/*---------------Sidebar--------------*/

#sidebar {
  float: right;
  width: 31%;
  border: 0px solid;
  height: auto;
  overflow: hidden;
  margin-top: 10px;
}

#buscar2,
#categorias,
#organizar,
#ultimos-post,
#perfil {
  border-radius: 10px;
  width: 98%;
  border: 1px solid #ccc;
  height: auto;
  overflow: hidden;
  margin-bottom: 20px;
}
form {
  margin-top: 8px;
}

#buscar2 input[type="text"] {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px #ccc inset;
  padding: 5px 2px;
  border-radius: 10px;
  font-size: 18px;
  color: black;
  width: 79%;
  margin-left: 4px;
  margin-bottom: 4px;
}

select{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px #ccc inset;
  padding: 5px 2px;
  border-radius: 10px;
  font-size: 18px;
  color: black;
  width: 79%;
  margin-left: 4px;
  margin-bottom: 4px;
}

#buscar2 .boton {
    border: 0px;
    color: white;
    background: #68a3e7;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 3px;
    height: 41px;
}
#buscar2 .boton:hover {
  text-decoration: underline;
  background: #3d066d;
}
.encabezado-sidebar {
  width: 100%;
  height: 35px;
  background: #0489b1;
  text-align: center;
  color: white;
  font-size: 19px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
#categorias .btn-info {
    border: 0px;
    color: white;
    background: #68a3e7;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 3px;
    height: 41px;
    width: 17%;
    margin-bottom: 8px;
}
#categorias .btn-info:hover{
  text-decoration: underline;
  background: #3d066d;
}

.enlace-sidebar {
  width: 100%;
  display: inline-block;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;
  color: #848484;
}
.enlace-sidebar:hover {
  background: #f2f2f2;
}
#ultimos-post .parrafo-ultimas {
  margin-right: 15px;
  margin-bottom: 7px;
}

p.likesandcoments {
    text-align: right;
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
