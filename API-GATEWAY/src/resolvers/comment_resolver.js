const commentResolver ={
    Query:{
        findCommentById:async (_, {commentId}, {dataSources,userIdToken})=>{
            if (userIdToken != null || userIdToken != ""){
               return await dataSources.postAPI.findCommentById(commentId);}
            else{
               return null;}
        }
    },

    Mutation:{
        createComment:async (_, {comment}, {dataSources,userIdToken})=>{
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username
            if (comment.usernameOrigin == usernameToken)
               return await dataSources.postAPI.createComment(comment)
            else
               return null
        },
        deleteComment:async (_, {commentId}, {dataSources,userIdToken})=>{
            usernameComment = (await dataSources.postAPI.findCommentById(commentId)).usernameOrigin
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username
            if (usernameComment == usernameToken)
               return await dataSources.postAPI.deleteComment(commentId)
            else
               return null
        }
    }
};
module.exports = commentResolver;