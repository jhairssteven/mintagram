package com.Mintagram.posts_ms.models;

import org.springframework.data.annotation.Id;

public class Like {
    @Id
    private String id;
    private String usernameOrigin;
    private String postIdDestiny;

    public Like(String id, String usernameOrigin, String postIdDestiny) {
        this.id = id;
        this.usernameOrigin = usernameOrigin;
        this.postIdDestiny = postIdDestiny;
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
}
