<template>
  <div class="post">
    <div class="container_post">
      <section id="publicaciones">
        <!-- Articulos -->
        <article class="post">
          <a href="" class="enlace-post">
            <h2 class="titulo-post">Título de la publicación o usuario</h2>
          </a>
          <p>
            <strong>Fecha: </strong
            ><span class="datos-publicaciones">PostDate 11/30/2021</span>
          </p>
          <div id="imagen">
            <img src="img/codigo1.jpg" class="img-post" />
          </div>
          <p class="parrafo-post">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages.
          </p>

          <button class="like-btn">
            Me gusta <i class="fas fa-thumbs-up"></i>
          </button>
          &nbsp;&nbsp;
          <section id="caja-comentarios">
            <form>
              <input
                type="text"
                name="comentarios"
                placeholder="Agregar comentario..."
                required
              />
              <button class="num-comentarios">
                Comentar <i class="fas fa-comment"></i>
              </button>
            </form>
          </section>
        </article>
      </section>
      <section id="sidebar">
        <section id="buscar2">
          <h2 class="encabezado-sidebar">Buscar</h2>
          <form>
            <input
              type="text"
              name="buscar"
              placeholder="Buscar posts..."
              required
            />
            <button class="boton">Ok</button>
          </form>
        </section>
        <section id="categorias">
          <h2 class="encabezado-sidebar">Categorías</h2>
          <a href="" class="enlace-sidebar">Categoría 1</a>
          <a href="" class="enlace-sidebar">Categoría 2</a>
        </section>
        <section id="organizar">
          <h2 class="encabezado-sidebar">Organizar</h2>
          <a href="" class="enlace-sidebar">Criterio 1</a>
          <a href="" class="enlace-sidebar">Criterio 2</a>
        </section>
        <section id="ultimos-post">
          <h2 class="encabezado-sidebar">Ultimas-publicaciones</h2>
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
        </section>
      </section>
    </div>
  </div>
</template>
<script></script>

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
  text-align: center;
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
