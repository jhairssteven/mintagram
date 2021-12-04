const likeResolver ={
    Query:{
        findLikeById:async (_, {likeId}, {dataSources,userIdToken})=>{
            if (userIdToken != null || userIdToken != ""){
               return await dataSources.postAPI.findLikeById(likeId);}
            else{
               return null;}
        }
    },

    Mutation:{
        createLike:async (_, {like}, {dataSources, userIdToken})=>{
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username;
            if (like.usernameOrigin == usernameToken){
                return await dataSources.postAPI.createLike(like);
            }
            else{
                return null;}
        },
        deleteLike:async (_, {likeId}, {dataSources,userIdToken})=>{
            usernameLike = (await dataSources.postAPI.findLikeById(likeId)).usernameOrigin
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username
            if (usernameLike == usernameToken)
               return await dataSources.postAPI.deleteLike(likeId)
            else
               return null
        }
    }
};
module.exports = likeResolver;