package com.Mintagram.posts_ms.controllers;
import com.Mintagram.posts_ms.exceptions.PostNotFoundException;

import com.Mintagram.posts_ms.models.Like;
import com.Mintagram.posts_ms.models.Post;
import com.Mintagram.posts_ms.repositories.LikeRepository;
import com.Mintagram.posts_ms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


import java.util.Date;

@RestController
@RequestMapping("/like")
public class LikeController {
    @Autowired
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;

    public LikeController(PostRepository postRepository, LikeRepository likeRepository) {
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
    }

    @GetMapping("/")
    String messageLikeRoot(){
        return "Por favor complete la url con el endpoint que corresponda";
    }
    @GetMapping("/findbyId/{likeId}")
    Like findLikeById(@PathVariable String likeId){
        Like like= likeRepository.findById(likeId).orElse(null);
        if (like==null)
            throw new PostNotFoundException("No hay like con id: " + likeId);
        return like;
    }

    @PostMapping("/create")
    Like newlike(@RequestBody Like like){
        Post postDestiny= postRepository.findById(like.getPostIdDestiny()).orElse(null);
        if (postDestiny==null)
            throw new PostNotFoundException("No hay posts de destino con id: " + like.getPostIdDestiny());
        if(like.getUsernameOrigin()==null || like.getUsernameOrigin()=="")
            throw new PostNotFoundException("el campo usernameOrigin es obligatorio");
        if(like.getPostIdDestiny()==null || like.getPostIdDestiny()=="")
            throw new PostNotFoundException("el campo postIdDestiny es obligatorio");
        like.setLikedate(new Date());
        likeRepository.save(like);
        postDestiny.setLike(likeRepository.findLikeByPostIdDestiny(like.getPostIdDestiny()));
        postRepository.save(postDestiny);
        return like;
    }

    /*Falta borrar todo en la lista del post*/
    @DeleteMapping("/remove/{likeId}")
    String deleteLike(@PathVariable String likeId){
        Like like= likeRepository.findById(likeId).orElse(null);
        if (like==null)
            throw new PostNotFoundException("No hay like con id: " + likeId);
        likeRepository.deleteById(likeId);
         Post post = postRepository.findByLikeId(likeId);
        for(Like like1: post.getLike()){
            if (like1.getId().equals(likeId)){
                post.getLike().remove(like1);
                break;
            }
        }
        postRepository.save(post);
        return "Borrado Exitoso";
    }

}
