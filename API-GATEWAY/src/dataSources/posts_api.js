const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig = require('../server');

class PostAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.posts_api_url;
    }

    async createPost(post){
        post= new Object(JSON.parse(JSON.stringify(post)));
        return await this.post('/post/create',post);
    }
    async postAll(){
        return await this.get(`/post/all`);
    }
    async postById(id){
        return await this.get(`/post/byid/${id}`);
    }
    async postByUsername(username){
        return await this.get(`/post/byuser/${username}`);
    }
    async postByCategory(categoria){
        return await this.get(`/post/bycategoria/${categoria}`);
    }

    async updatePost(post){
        post= new Object(JSON.parse(JSON.stringify(post)));
        return await this.put(`/post/update`, post);
    }
    async deletePost(postId){
        return await this.delete(`/post/remove/${postId}`);
    }

    async   createComment(comment){
        comment = new Object(JSON.parse(JSON.stringify(post)));
        return await this.post(`/comment/create`,comment);
    }
    async   deleteComment(commentId){
        return await this.delete(`/comment/remove/${commentId}`);
    }

    async   createLike(like){
        like = new Object(JSON.parse(JSON.stringify(like)));
        return await this.post(`/like/create`);
    }
    async   deleteLike(likeId){
        return await this.delete(`/like/remove/${likeId}`)
    }
    
    async   createImage(image){
        image= new Object(JSON.parse(JSON.stringify(image)));
        return await this.post(`/imagen/create`, image);
    }
    async   deleteImage(imageId){
        return await this.delete(`/imagen/remove/${imageId}`);
    }
    async imageAll(){
        return await this.get(`/imagen/all`);
    }
    async imageById(imageId){
        return await this.get(`/imagen/grafica/${imageId}`);
    }
}
module.exports = PostAPI;