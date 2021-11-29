package com.Mintagram.posts_ms.repositories;

import com.Mintagram.posts_ms.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String>{

    List<Post> findByUsername (String username);
    /*List<Post> findBylikesGreaterthan (Integer like);*/
    List<Post> findByCategoria (String categoria);
}
