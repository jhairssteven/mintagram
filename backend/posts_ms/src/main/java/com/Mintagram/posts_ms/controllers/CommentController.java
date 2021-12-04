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
    @GetMapping("/comment/findbyId/{commentId}")
    Comment findCommentById(@PathVariable String commentId){
        Comment comment= commentRepository.findById(commentId).orElse(null);
        if (comment==null)
            throw new PostNotFoundException("No hay comment con id: " + commentId);
        return comment;
    }

    /*@GetMapping("/comment/{postIdDestiny}")
    List<Comment> findCommentByDestinyId(@PathVariable String postIdDestiny){
        return commentRepository.findCommentByDestinyId(postIdDestiny);
    }*/

    @PostMapping("/comment/create")
    Comment createComment(@RequestBody Comment comment){
        Post postDestiny= postRepository.findById(comment.getPostIdDestiny()).orElse(null);
        if (postDestiny==null)
            throw new PostNotFoundException("No hay posts de destino con id: " + comment.getPostIdDestiny());
        if(comment.getUsernameOrigin()==null || comment.getUsernameOrigin()=="")
            throw new PostNotFoundException("el campo usernameOrigin es obligatorio");
        if(comment.getPostIdDestiny()==null || comment.getPostIdDestiny()=="")
            throw new PostNotFoundException("el campo postIdDestiny es obligatorio");
        if(comment.getMessage()==null || comment.getMessage()=="")
            throw new PostNotFoundException("el campo Message es obligatorio");
        comment.setCommentdate(new Date());
        commentRepository.save(comment);
        postDestiny.setComments(commentRepository.findCommentBypostIdDestiny(comment.getPostIdDestiny()));
        postRepository.save(postDestiny);
        return comment;

    }

    /*pero todavia no actualiza la lista de comentarios del post*/
    @DeleteMapping("/comment/remove/{commentId}")
    String deleteComment(@PathVariable String commentId){
        Comment comment= commentRepository.findById(commentId).orElse(null);
        if (comment==null)
            throw new PostNotFoundException("No hay comentarios con id: " + commentId);
        commentRepository.deleteById(commentId);
        Post post = postRepository.findByCommentsId(commentId);
        for (Comment comment1: post.getComments()){
            if(comment1.getId().equals(commentId)){
                post.getComments().remove(comment1);
                break;
            }
        }
        postRepository.save(post);
        return "Borrado Exitoso";
      

    }


}
