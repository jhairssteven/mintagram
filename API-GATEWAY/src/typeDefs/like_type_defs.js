const {gql} = require('apollo-server');

const likeTypeDefs = gql`
   type Like{
       id: String!
       usernameOrigin: String!
       postIdDetiny: String!
       likedate: String!
   }

   input LikeInput{
    usernameOrigin: String!
    postIdDetiny: String!
   }

   extend type Mutation{
       createLike(like: LikeInput!): Like
       deleteLike(id: String!): String!
   }
`;
module.exports = likeTypeDefs;