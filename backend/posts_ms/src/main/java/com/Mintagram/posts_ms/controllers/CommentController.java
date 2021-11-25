package com.Mintagram.posts_ms.controllers;
import com.Mintagram.posts_ms.models.Comment;
import com.Mintagram.posts_ms.models.Post;
import com.Mintagram.posts_ms.repositories.CommentRepository;
import com.Mintagram.posts_ms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public CommentController(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @PostMapping("/create")
    Post createComment(@RequestBody Comment comment){
        Post postDestiny= postRepository.findById(comment.getPostIdDestiny()).orElse(null);
        commentRepository.save(comment);
        postDestiny.setComments(commentRepository.findByPostIdDestiny(comment.getPostIdDestiny()));
        return postRepository.save(postDestiny);

    }


}
