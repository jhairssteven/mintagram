<template>
    <div class="container">
        <div class="left-column">
            <img class="active"
            v-bind:src="userDetailById.profile_image"
            v-bind:alt="userDetailById.ocupation"
            />
        </div>
        <div class="right-column">
            <div class="userInformation">
                <h1>{{ userDetailById.username }}</h1>
                <h3> {{ userDetailById.email }} </h3>
            </div>
            <div class="userPosts">
                
            </div>

        </div>
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
          userDetailById: {
              username: "",
              email: "",
              profile_image: "",
              ocupation: ""
          }
        }
    },
    /*query que se carga por defecto sin espichar un boton,
    pero yo si necesito el que necesita espichar un boton 
    este es el que va en espichar perfil*/
     apollo:{
         userDetailById:{
             query: gql`
             query Query($userId: Int!) {
                userDetailbyId(userId: $userId) {
                  username
                  email
                  profile_image
                  ocupation
                }
              }
             `, 
             variables(){
                 return{
                     "userId": this.userId,
                 }
             }

         },
     }
};
</script>
<style>

</style>
