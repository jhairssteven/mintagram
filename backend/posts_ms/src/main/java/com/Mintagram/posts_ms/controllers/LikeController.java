package com.Mintagram.posts_ms.controllers;
import com.Mintagram.posts_ms.models.Comment;
import com.Mintagram.posts_ms.models.Like;
import com.Mintagram.posts_ms.models.Post;
import com.Mintagram.posts_ms.repositories.LikeRepository;
import com.Mintagram.posts_ms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    Post newlike(@RequestBody Like like){
        Post postDestiny= postRepository.findById(like.getPostIdDestiny()).orElse(null);
        likeRepository.save(like);
        postDestiny.setLike(likeRepository.findByPostIdDestiny(like.getPostIdDestiny()));
        return postRepository.save(postDestiny);
    }
}
