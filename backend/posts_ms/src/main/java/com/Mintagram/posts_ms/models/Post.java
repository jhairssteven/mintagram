package com.Mintagram.posts_ms.models;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.annotation.Id;


import java.util.Date;
import java.util.List;

@ComponentScan("com.Mintagram.posts_ms.models")
public class Post {

    @Id
    private String id;
    private String username;
    private String image;
    private String description;
    private List<Like> like;
    private Date postdate;
    private String categoria;
    private List<Comment> comments;

    public Post(String id, String username, String image, String description, List<Like> like, Date postdate, String categoria, List<Comment> comments) {
        this.id = id;
        this.username = username;
        this.image = image;
        this.description = description;
        this.like = like;
        this.postdate = postdate;
        this.categoria = categoria;
        this.comments = comments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Like> getLike() {
        return like;
    }

    public void setLike(List<Like> like) {
        this.like = like;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Date getPostdate() {
        return postdate;
    }

    public void setPostdate(Date postdate) {
        this.postdate = postdate;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
