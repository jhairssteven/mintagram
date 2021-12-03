const {gql} = require('apollo-server')

const messageTypeDefs = gql `
    type Message {
        id: Int!
        origin_user: Int!
        destiny_user: Int!
        text: String!
        register_date: String!
    }
    
    input messageInput {
        origin_user: Int!
        destiny_user: Int!
        text: String!
    }

    type Query {
        allMessagesByUserId(origin_user: Int!): [Message]
        allMessagesByLocutors(userOriginId: Int!, userDestinyId: Int!): [Message]
        messageById(userOriginId: Int!, messageId: Int!): Message
    }

    type Mutation {
        createMessage(message: messageInput!): String
        deleteMessage(userOriginId: Int!, messageId: Int!): String
    }
`;

module.exports = messageTypeDefs;