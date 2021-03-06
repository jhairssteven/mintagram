package com.Mintagram.posts_ms.repositories;
import com.Mintagram.posts_ms.models.Comment;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String>{
    List<Comment> findCommentBypostIdDestiny(String postIdDestiny);

}
