package com.Mintagram.posts_ms.controllers;

import com.Mintagram.posts_ms.exceptions.PostNotFoundException;
import com.Mintagram.posts_ms.models.Post;
import com.Mintagram.posts_ms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

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

    @PostMapping("/create")
    Post createPost(@RequestBody Post post){
        post.setPostdate(new Date());
        return postRepository.save(post);
    }

    @PutMapping("/update")
    Post updatePostByComment(@RequestBody Post post){
        Post post_update=postRepository.findById(post.getId()).orElse(null);
        if (post_update==null)
            throw new PostNotFoundException("No hay posts con id: " + post.getId());
        post_update.setDescription(post.getDescription());
        post_update.setCategoria(post.getCategoria());
        return postRepository.save(post_update);

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
