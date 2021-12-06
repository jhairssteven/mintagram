const {gql} = require('apollo-server')

const postTypeDefs = gql `
  type Post{
      id: String!
      username: String!
      image: String
      description: String!
      like: [Like]
      postdate: String!
      categoria: String!
      comments: [Comment]
  }

  type Like{
    id: String!
    usernameOrigin: String!
    postIdDestiny: String!
    likedate: String!
  }

  type Comment{
    id: String!
    usernameOrigin: String!
    postIdDestiny: String!
    commentdate: String!
    message: String!
   }

  input PostInput{
      username: String!
      image: String
      like: [LikeInput]!
      description: String!
      categoria: String!
      comments: [CommentInput]!
  }

  input PostUpdate{
    id: String!
    description: String!
    categoria: String!
    
  }

  

input LikeInput{
 usernameOrigin: String!
 postIdDestiny: String!
}

input CommentInput{
 usernameOrigin: String!
 postIdDestiny: String!
 message: String!
}

  extend type Query{
      postAll (constante: String): [Post] 
      postById (postId : String!): Post
      postByUsername (username : String!): [Post]
      postByCategory (categoria : String!): [Post]
      
      postByLikeId (likeId: String!): Post
      postByCommentId (commentId: String!): Post

      findCommentById (commentId: String!): Comment
      findLikeById (likeId: String!): Like 
  }

  extend type Mutation{
      createPost(post: PostInput!): Post
      updatePost(post: PostUpdate): String!
      deletePost(postId: String!): String!

      createLike(like: LikeInput!): Like
      deleteLike(likeId: String!): String!

      createComment(comment: CommentInput!): Comment
      deleteComment(commentId: String!): String!
  }
`;
module.exports = postTypeDefs;

/*postAll (): [Post] 
postByImageId (imageId: String!): Post
*/