<template>
  <div class="container_post">
    <section id="publicaciones">
      <!-- Articulos -->

      <article class="post">
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
          <p class="parrafo-post">
            {{ post.description }}
          </p>
          <p>
            <strong>Likes: </strong
            ><span class="datos-publicaciones">{{ post.like.length }}</span>

            <strong>Comments: </strong
            ><span class="datos-publicaciones">{{ post.comments.length }}</span>
          </p>
        </div>
      </article>
    </section>
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  name: "PostByUsername",

  data: function () {
    return {
      username: this.$route.params.username,
    };
  },
  computed: {
    sortedPost() {
      return [...this.postByUsernameLike].sort((a, b) => {
        if (a.postdate > b.postdate) return -1;
        else return 1;
      });
    },
  },
  apollo: {
    postByUsernameLike: {
      query: gql`
        query Query($username: String!) {
          postByUsernameLike(username: $username) {
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
          username: this.username,
        };
      },
    },
  },
  methods: {
    loadPostDetailPage: function (id) {
      this.$router.push({ name: "postDetail", params: { id: id } });
    },
  },
  created: function () {
    this.$apollo.queries.postByUsernameLike.refetch();
    //this.$apollo.queries.postAll.refetch();
    
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
#publicaciones .img-post {
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: flex;
  margin: 7px;
  padding: 5px;
  border: 2px solid #6e6e6e;
  border-radius: 5px;
}

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

/*---------------Sidebar--------------*/

#sidebar {
  float: right;
  width: 28%;
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

#buscar2 .boton {
  border: 0px;
  color: white;
  background: #0b4c5f;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
#buscar2 .boton:hover {
  text-decoration: underline;
  background: #01a9dc;
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
</style>
