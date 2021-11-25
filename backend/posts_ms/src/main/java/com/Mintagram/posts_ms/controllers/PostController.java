package com.Mintagram.posts_ms.controllers;

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

    @PostMapping("/create")
    Post createPost(@RequestBody Post post){
        post.setPostdate(new Date());
        return postRepository.save(post);
    }

    @GetMapping("/all/")
    List<Post> getPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/g/{id}")
    Post getPosts(@PathVariable String id) {
        return postRepository.findById(id).orElse(null);

    }

    @GetMapping("/{username}")
    List<Post> findPostsByUserName(@PathVariable String username){

        return postRepository.findByUsername (username);
    }

    @GetMapping("/get/{categoria}")
    List<Post> findPostsByCategoria(@PathVariable String categoria){
        return postRepository.findByCategoria(categoria);
    }

    @PutMapping("/update")
    Post updatePostByComment(@RequestBody Post post){
        Post post_update=postRepository.findById(post.getUsername()).orElse(null);
                post_update.setDescription(post.getDescription());
                post_update.setCategoria(post.getCategoria());
                return postRepository.save(post_update);

    }

    /* borrar por id, es el mas seguro*/
    @DeleteMapping("/remove/{id}")
    String deletePost(@PathVariable String id) {
        Post post = postRepository.findById(id).orElse(null);
        postRepository.deleteById(id);
        return "borrado exitoso";
    }

}
