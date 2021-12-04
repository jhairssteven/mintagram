package com.Mintagram.posts_ms.repositories;

import com.Mintagram.posts_ms.models.Like;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LikeRepository extends MongoRepository<Like, String>{
    List<Like> findLikeByPostIdDestiny(String postIdDestiny);
}
