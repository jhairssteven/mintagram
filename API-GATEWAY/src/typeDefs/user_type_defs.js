const { gql } = require('apollo-server');

const userTypeDefs = gql `
    type Tokens {
        refresh:String!
        access :String!
    }


    type Access {
        access:String!
    }

    input Refresh{
        refresh:String!
    }

    input Login {
        email:String!
        password:String!
    }
    input SignUp {
        username     :String!
        password     :String!
        ocupation    :String!
        email        :String!
        profile_image:String!
    }

    type UserDetail {
        id_user       :Int!
        username      :String!
        email         :String!
        profile_image :String!
        ocupation     :String!

    }
   
    type Query {
        userDetailbyId(userId: Int!):UserDetail!
    }
    
    type Mutation {
        signUpUser(userInput:SignUp) : Tokens!
        logIn(credentials:Login!)    : Tokens!
        refreshToken(refresh: String!): Access!
        
    }
    
    `;
    module.exports = userTypeDefs;
    