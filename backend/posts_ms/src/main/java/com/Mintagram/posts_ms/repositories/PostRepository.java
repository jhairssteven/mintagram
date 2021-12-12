package com.Mintagram.posts_ms.repositories;

import com.Mintagram.posts_ms.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.List;


public interface PostRepository extends MongoRepository<Post, String>{

    List<Post> findByUsername (String username);
    List<Post> findByCategoria (String categoria);
    //Post findByImageId (String image_id);
    Post findByLikeId (String like_id);
    Post findByCommentsId (String comments_id);
    List<Post> findByUsernameLike(String username);
}
