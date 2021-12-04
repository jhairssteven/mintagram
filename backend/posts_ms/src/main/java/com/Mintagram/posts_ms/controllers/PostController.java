package com.Mintagram.posts_ms.controllers;

import com.Mintagram.posts_ms.exceptions.PostNotFoundException;

import com.Mintagram.posts_ms.models.Post;
import com.Mintagram.posts_ms.repositories.PostRepository;
//import com.Mintagram.posts_ms.repositories.ImageRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;



import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private final PostRepository postRepository;
    //private final ImageRepository imageRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
        //this.imageRepository = imageRepository;
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        /*que ignore username cuando se haga la validacion*/
        binder.setDisallowedFields(new String[]{"username"});
    }

    /*@GetMapping("/")
    String messageRoot(){
        return "Conexion exitosa a PostMS";
    }*/

    @GetMapping("/")
    String messagePostRoot(){
        return "Por favor complete la url con el endpoint que corresponda";
    }

    @GetMapping("/all")
    List<Post> getPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/byid/{id}")
    Post getPostbyId(@PathVariable String id) {
        Post post= postRepository.findById(id).orElse(null);
        if (post==null)
            throw new PostNotFoundException("No hay posts con id: " + id);
        return post;
    }

    @GetMapping("/byuser/{username}")
    List<Post> findPostsByUserName(@PathVariable String username){
        return postRepository.findByUsername(username);
    }

    @GetMapping("/bycategoria/{categoria}")
    List<Post> findPostsByCategoria(@PathVariable String categoria){
        return postRepository.findByCategoria(categoria);
    }

    /*@GetMapping("/byImageId/{image_id}")
    Post findPostsByImageId(@PathVariable String image_id){
        return postRepository.findByImageId(image_id);
    }*/

    @GetMapping("/byCommentId/{comment_id}")
    Post findPostsByCommentId(@PathVariable String comment_id){
        return postRepository.findByCommentsId(comment_id);
    }

    @GetMapping("/byLikeId/{like_id}")
    Post findPostsByLikeId(@PathVariable String like_id){
        return postRepository.findByLikeId(like_id);
    }

    @PostMapping("/create")
    Post createPost(@RequestBody Post post){
        post.setPostdate(new Date());
        if(post.getUsername()==null || post.getUsername()=="")
            throw new PostNotFoundException("el campo username es obligatorio");
        if(post.getCategoria()==null || post.getCategoria()=="")
            throw new PostNotFoundException("el campo Categoria es obligatorio");
        return postRepository.save(post);
    }

    @PutMapping("/update")
    String updatePostByComment(@RequestBody Post post){
        Post post_update=postRepository.findById(post.getId()).orElse(null);
        if (post_update==null)
            throw new PostNotFoundException("No hay posts con id: " + post.getId());
        post_update.setDescription(post.getDescription());
        post_update.setCategoria(post.getCategoria());
        post_update.setPostdate(new Date());
        postRepository.save(post_update);
        return "Actualizacion exitosa";

    }

    /* borrar por id, es el mas seguro*/
    @DeleteMapping("/remove/{id}")
    String deletePost(@PathVariable String id) {
        Post post = postRepository.findById(id).orElse(null);
        if (post==null)
            throw new PostNotFoundException("No hay posts con id: " + id);
        postRepository.deleteById(id);
        return "Borrado exitoso";
    }

}
