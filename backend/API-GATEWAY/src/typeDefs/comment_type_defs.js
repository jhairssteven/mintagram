const {gql} = require('apollo-server');

const commentTypeDefs = gql`
   type Comment{
       id: String!
       usernameOrigin: String!
       postIdDetiny: String!
       commentdate: String!
       message: String!
   }

   input CommentInput{
    usernameOrigin: String!
    postIdDetiny: String!
    message: String!
   }

   extend type Mutation{
       createComment(comment: CommentInput!): Comment
       deleteComment(id: String!): String!
   }
`;
module.exports = likeTypeDefs;