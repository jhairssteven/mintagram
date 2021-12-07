<template>
<div class="posts">
    <div class="posts-container">
        <h1 class="lg-title">Muro</h1>
        <div class="post-items">
            <div v-for="post in posts" :key="post.id" class="publicaciones">
                <div class="container_post">
                    <div class="post-username">
                        <h1>{{ post.username }}</h1>
                    </div>
                    <div class="post-img">
                        <img v-bind:src="post.imagen" v-bind:alt="post.username">
                    </div>
                    <div class="post-detail">
                        <p>{{ post.description }}</p>
                        <p>
                            <strong>Fecha: </strong><span class="datos-publicaciones">{{post.postdate}}</span>
                        </p>
                    </div>
                    <div class="botones">
                        <button class="like-btn">Me gusta <i class="fas fa-thumbs-up"></i></button> &nbsp;&nbsp;
                        <section id="caja-comentarios">
                            <form>
                                <input type="text" name="comentarios" placeholder="Agregar comentario..." required>
                                <button class="num-comentarios">Comentar <i class="fas fa-comment"></i></button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>>
        </div>
    </div>
</div>

  
</template>
<script>
import gql from 'graphql-tag';
export default {
  name: "Post",
  data: function () {
    return {
      posts: [
          {
          id: null,
          username : null,
          image:  null,
          description: null,
          like: [{
            id: null,
            usernameOrigin: null,
            postIdDestiny: null,
            likedate: null,
          }],
          postdate: null,
          categoria: null,
          comments: [{
            id: null,
            usernameOrigin: null,
            postIdDestiny: null,
            commentdate: null,
            message: null,
          }],
          
          }],
      post: 0,
    };
    
  },
  apollo:{
       posts:{
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
                  }`,
           variables(){
               return{
                   constante: null,
               }
           }
        },
  },
  created() {
      
  }
};
</script>

<style>
/*-----post-----*/
#principal{
    width: 80%;
    height: auto; overflow: hidden;
    border: 0px solid;
    margin: 10px auto;
}

#publicaciones{
    width: 70%;
    height: auto; overflow: hidden;
    border: 0px solid red;
    margin-top: 10px;
    float: left;
}
.post{
     width: 96%;
     height: auto; overflow: hidden;
     padding: 7px;
     background: #fdfdfd;
     border-left-style: solid;
     border-left-width: 5px;
     border-left-color: #0489b1;
     border-radius: 10px;
     box-shadow: 0px 0px 15px #ccc;
     margin-bottom: 20px;
}
.enlace-post{
    text-decoration: none;
}
#publicaciones a .titulo-post{
    color: #6e6e6e;
    font-size: 22px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
#publicaciones a .titulo-post:hover{
    text-decoration: underline;
}
/* imagen del post*/
#imagen{
    text-align: center;
}
#publicaciones .img-post{
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin: 7px;
    padding: 5px;
    border: 2px solid #6e6e6e;
    border-radius: 5px;
}

#publicaciones .parrafo-post{
    margin-right: 15px;
    margin-bottom: 7px;
}
#publicaciones .datos-publicaciones{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #0489b1;
}
#publicaciones .like-btn{
    border-radius: 5px;
    background: #01a9dc;
    width: 80px;
    height: 30px;
    text-align: center;
    color: white;
    cursor: pointer;
    border: none;
}
#publicaciones .like-btn:hover{
    text-decoration: underline;
    background: #026685;
}
#publicaciones .num-comentarios{
    background: #01a9dc;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    padding: 5px;
    cursor: pointer;
    height: 30px;
}
#publicaciones .num-comentarios:hover{
    text-decoration: underline;
    background: #026685;
}
#publicaciones .num-comentarios{
    background: #01a9dc;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    padding: 5px;
    cursor: pointer;
}
#publicaciones .num-comentarios:hover{
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

#sidebar{
    float: right;
    width: 28%;
    border: 0px solid;
    height: auto; overflow: hidden;
    margin-top: 10px;
    
}

#buscar2, #categorias, #organizar, #ultimos-post, #perfil{
    border-radius: 10px;
    width: 98%;
    border: 1px solid #ccc;
    height: auto; overflow: hidden;
    margin-bottom: 20px;
}
form{
    margin-top: 8px;
}

#buscar2 input[type="text"]{
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

#buscar2 .boton{
    border: 0px;
    color: white;
    background: #0b4c5f;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}
#buscar2 .boton:hover{
    text-decoration: underline;
    background: #01a9dc;
}
.encabezado-sidebar{
    width: 100%;
    height: 35px;
    background: #0489b1;
    text-align: center;
    color: white;
    font-size: 19px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.enlace-sidebar{
    width: 100%;
    display: inline-block;
    text-decoration: none;
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
    color: #848484;
}
.enlace-sidebar:hover{
    background: #f2f2f2;
}
#ultimos-post .parrafo-ultimas{
    margin-right: 15px;
    margin-bottom: 7px;

}
    

</style>
