package com.Mintagram.posts_ms.controllers;
import com.Mintagram.posts_ms.exceptions.PostNotFoundException;
import com.Mintagram.posts_ms.models.Comment;
import com.Mintagram.posts_ms.models.Post;
import com.Mintagram.posts_ms.repositories.CommentRepository;
import com.Mintagram.posts_ms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
/*@RequestMapping("/comment")*/
public class CommentController {
    @Autowired
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public CommentController(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping("/")
    String messageRoot(){
        return "Conexion exitosa a PostMS";
    }

    @GetMapping("/comment/")
    String messageCommentRoot(){
        return "Por favor complete la url con el endpoint que corresponda";
    }

    @PostMapping("/comment/create")
    Post createComment(@RequestBody Comment comment){
        Post postDestiny= postRepository.findById(comment.getPostIdDestiny()).orElse(null);
        if (postDestiny==null)
            throw new PostNotFoundException("No hay posts de destino con id: " + comment.getPostIdDestiny());
        comment.setCommentdate(new Date());
        commentRepository.save(comment);
        postDestiny.setComments(commentRepository.findByPostIdDestiny(comment.getPostIdDestiny()));
        return postRepository.save(postDestiny);

    }


}
