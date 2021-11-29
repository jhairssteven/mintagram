package com.Mintagram.posts_ms.models;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Comment {
    /*no lleva id porque es un objeto anidado de post*/
    @Id
    private String id;
    private String usernameOrigin;
    private String postIdDestiny;
    private Date  commentdate;
    private String message;
    /*private String postDestiny;*/

    public Comment(String id, String usernameOrigin, String postIdDestiny, Date commentdate, String message) {
        this.id = id;
        this.usernameOrigin = usernameOrigin;
        this.postIdDestiny = postIdDestiny;
        this.commentdate = commentdate;
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsernameOrigin() {
        return usernameOrigin;
    }

    public void setUsernameOrigin(String usernameOrigin) {
        this.usernameOrigin = usernameOrigin;
    }

    public String getPostIdDestiny() {
        return postIdDestiny;
    }

    public void setPostIdDestiny(String postIdDestiny) {
        this.postIdDestiny = postIdDestiny;
    }

    public Date getCommentdate() {
        return commentdate;
    }

    public void setCommentdate(Date commentdate) {
        this.commentdate = commentdate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
