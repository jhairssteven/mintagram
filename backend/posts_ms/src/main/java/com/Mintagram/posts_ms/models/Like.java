package com.Mintagram.posts_ms.models;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Like {
    //@Id
    //private String id;
    private String usernameOrigin;
    private String postIdDestiny;
    private Date likedate;

    public Like( String usernameOrigin,String postIdDestiny, Date likedate) {
        this.usernameOrigin = usernameOrigin;
        this.postIdDestiny = postIdDestiny;
        this.likedate = likedate;
    }

    /*public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }*/

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

    public Date getLikedate() {
        return likedate;
    }

    public void setLikedate(Date likedate) {
        this.likedate = likedate;
    }
}
