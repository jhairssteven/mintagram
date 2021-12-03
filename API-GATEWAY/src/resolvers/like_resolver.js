const likeResolver ={
    Query:{},

    Mutation:{
        createLike:async (_, {like}, {dataSources,userIdToken})=>{
            usernamelike = (await dataSources.postAPI.postBy(like.postIdDestiny)).username
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (usernamelike == usernameToken)
               return await dataSources.postAPI.createLike(like)
            else
               return null
        },
        deleteLike:async (_, {likeId}, {dataSources,userIdToken})=>{

        }
    }
};
module.exports = likeResolver;