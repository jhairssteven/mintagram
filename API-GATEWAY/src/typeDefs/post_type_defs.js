const {gql} = require('apollo-server');

const postTypeDefs = gql`
  type Post{
      id: String!
      username: String!
      image: [Image!]
      description: String!
      like: [Like!]
      postdate: String!
      categoria: String!
      comments: [Comment!]
  }

  input PostInput{
    username: String!
      image: [Image!]
      description: String!
      like: [Like!]
      postdate: String!
      categoria: String!
      comments: [Comment!]
  }

  input PostUpdate{
      id: String!
      description: String!
      categoria: String!
  }

  extend type Query{
      postAll (): [Post]
      postById (id : String!): Post
      postByUsername (username : String!): [Post]
      postByCategory (categoria : String!): [Post]
  }

  extend type Mutation{
      createPost(post: PostInput!): Post
      updatePost(post: PostUpdate): Post
      deletePost(id: String!): String!
  }
`;
module.exports = postTypeDefs;