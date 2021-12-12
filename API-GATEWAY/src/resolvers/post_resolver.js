const postResolver={
    Query:{
        postAll: async (_,{},{dataSources})=>{
            return await dataSources.postAPI.postAll()
        },

        postById:async (_,{postId}, {dataSources, userIdToken})=>{
            //sernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if( userIdToken != null || userIdToken != ""){
              return await dataSources.postAPI.postById(postId)}
            else{
              return null}
        },

        postByUsername: async (_, {username}, {dataSources, userIdToken})=>{
            //usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (userIdToken!=null || userIdToken != ""){
               return await dataSources.postAPI.postByUsername(username)}
            else{
               return null}
        },
        postByUsernameLike: async (_, {username}, {dataSources, userIdToken})=>{
         //usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
         if (userIdToken!=null || userIdToken != ""){
            return await dataSources.postAPI.postByUsernameLike(username)}
         else{
            return null}
     },

        postByCategory: async (_,{categoria},{dataSources, userIdToken})=>{
            if (userIdToken!=null || userIdToken != ""){
               return await dataSources.postAPI.postByCategory(categoria)}
            else{
               return null}
        },

        /*postByImageId: async (_,{imageId},{dataSources, userIdToken})=>{
            if (userIdToken!=null){
               return await dataSources.postByImageId(imageId)}
            else{
               return null}
        },*/

        postByLikeId: async (_,{likeId},{dataSources, userIdToken})=>{
            if (userIdToken!=null || userIdToken != ""){
               return await dataSources.postAPI.postByLikeId(likeId)}
            else{
               return null}
        },

        postByCommentId: async (_,{commentId},{dataSources, userIdToken})=>{
            if (userIdToken!=null || userIdToken != ""){
               return await dataSources.postAPI.postByCommentId(commentId)}
            else{
               return null}
        }
    },

    Mutation: {
        createPost: async(_,{post}, {dataSources, userIdToken})=>{
            post.postdate = (new Date()).toISOString()       
            //usernamepost = post.username;
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username;
            if(post.username == usernameToken){
               return await dataSources.postAPI.createPost(post);
            }
            else{
                return null;}
        },
            
        updatePost: async(_,{post}, {dataSources, userIdToken})=>{
            usernamepost = (await dataSources.postAPI.postById(post.id)).username
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username
            if (usernamepost == usernameToken){
               //post.postdate = (new Date()).toISOString() 
               return await dataSources.postAPI.updatePost(post)
            }
            else{
                return null}
        },
            
        deletePost: async(_,{postId}, {dataSources, userIdToken})=>{
            usernamepost = (await dataSources.postAPI.postById(postId)).username
            usernameToken = (await dataSources.user_profile_API.getUser(userIdToken)).username
            if (usernamepost == usernameToken){
               return await dataSources.postAPI.deletePost(postId)}
            else{
              return null;}
        }
    }   
};
module.exports = postResolver;
 
/*createPost: async(_,{post}, {dataSources, userIdToken})=>{
            imagen1 = post.image
            post.image=[]
            post.postdate = (new Date()).toISOString()       
            //usernamepost = post.username;
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            if(post.username == usernameToken)
               const postInput={
                username:post.username,
                image:  post.image,
                description:post.description,
                like: post.like,
                postdate: (new Date()).toISOString(),
                categoria: post.categoria,
                comments: post.comments
               }
               post1= await dataSources.postAPI.createPost(postInput);
               const imageInput={
                image: imagen1,
                postIdDestiny: post1.id
               }
               return imagen2= await dataSources.postAPI.createImage(imageInput);
            
        }, */