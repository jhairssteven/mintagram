package com.Mintagram.posts_ms.controllers;
import com.Mintagram.posts_ms.exceptions.PostNotFoundException;
import com.Mintagram.posts_ms.models.Comment;
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

    @PostMapping("/create")
    Post newlike(@RequestBody Like like){
        Post postDestiny= postRepository.findById(like.getPostIdDestiny()).orElse(null);
        if (postDestiny==null)
            throw new PostNotFoundException("No hay posts de destino con id: " + like.getPostIdDestiny());
        like.setLikedate(new Date());
        likeRepository.save(like);
        postDestiny.setLike(likeRepository.findByPostIdDestiny(like.getPostIdDestiny()));
        return postRepository.save(postDestiny);
    }
}
