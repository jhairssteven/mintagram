const postResolver={
    Query:{
        postAll: async (_,{dataSources})=>{
            return await dataSources.postAPI.postAll()
        },

        postById:async (_,{postId}, {dataSources, userIdToken})=>{
            //sernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if( userIdToken != null)
              return await dataSources.postById(postId)
            else
              return null
        },

        postByUsername: async (_, {username}, {dataSources, userIdToken})=>{
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (username == usernameToken)
               return await dataSources.postAPI.postByUsername(username)
            else
               return null
        },
        postByCategory: async (_,{categoria},{dataSources, userIdToken})=>{
            if (userIdToken!=null)
               return await dataSources.postByCategory(categoria)
            else
               return null
        }
    },
    Mutation: {
        createPost: async(_,{post}, {dataSources, userIdToken})=>{
            imagen1 = post.image
            post.image=[]          
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
                postIdDestiny: post1.id,
                image: imagen1 
               }
               imagen2= await dataSources.postAPI.createImage(imageInput);


            return;
        },
        updatePost: async(_,{post}, {dataSources, userIdToken})=>{
            usernamepost = (await dataSources.postAPI.postById(post.id)).username
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (usernamepost == usernameToken)
                return await dataSources.postAPI.updatePost(post)
            else
                return null      
        },
    
        deletePost: async(_,{postId}, {dataSources, userIdToken})=>{
            usernamepost = (await dataSources.postAPI.postById(postId)).username
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (usernamepost == usernameToken)
                return await dataSources.postAPI.deletePost(postId)
            else
                return null 
        }
    }
};
module.exports = postResolver;
 