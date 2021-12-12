const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig = require('../server');

class PostAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.posts_api_url;
    }
    async postAll(){
        return await this.get('/post/all');
    }
    async postById(id){
        return await this.get(`/post/byid/${id}/`);
    }
    async postByUsername(username){
        return await this.get(`/post/byuser/${username}/`);
    }
    async postByUsernameLike(username){
        return await this.get(`/post/byuserlike/${username}/`);
    }
    async postByCategory(categoria){
        return await this.get(`/post/bycategoria/${categoria}/`);
    }
    /*async postByImageId(imageId){
        return await this.get(`/post/byImageId/${imageId}/`);
    }*/
    async postByCommentId(commentId){
        return await this.get(`/post/byCommentId/${commentId}/`);
    }
    async postByLikeId(likeId){
        return await this.get(`/post/byLikeId/${likeId}/`);
    }
   
    /*async imageById(imageId){
        return await this.get(`/imagen/grafica/${imageId}`);
    }*/

    async createPost(post){
        post= new Object(JSON.parse(JSON.stringify(post)));
        return await this.post('/post/create',post);
    }
    async updatePost(post){
        post= new Object(JSON.parse(JSON.stringify(post)));
        return await this.put('/post/update/', post);
    }
    async deletePost(postId){
        return await this.delete(`/post/remove/${postId}`);
    }


    async findCommentById(commentId){
        return await this.get(`/comment/findbyId/${commentId}`);
    }
    async   createComment(comment){
        comment = new Object(JSON.parse(JSON.stringify(comment)));
        return await this.post('/comment/create',comment);
    }
    async   deleteComment(commentId){
        return await this.delete(`/comment/remove/${commentId}`);
    }

    async findLikeById(likeId){
        return await this.get(`/like/findbyId/${likeId}`);
    }
    async   createLike(like){
        like = new Object(JSON.parse(JSON.stringify(like)));
        return await this.post('/like/create',like);
    }
    async   deleteLike(likeId){
        return await this.delete(`/like/remove/${likeId}`)
    } 
}
module.exports = PostAPI;