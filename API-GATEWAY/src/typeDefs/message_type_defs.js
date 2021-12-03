const {gql} = require('apollo-server')

const messageTypeDefs = gql `
    type Message {
        origin_user: Int!
        destiny_user: Int!
        text: String!
    }
    input messageInput {
        origin_user: Int!
        destiny_user: Int!
        text: String!
    }

    input DeleteMessageInput {
        origin_user: Int!
        message_id: Int!
    }

    input AllMessagesByLocutorsInput {
        origin_userId: Int!
        destiny_userId: Int!
    }

    input getMessageInput {
        userId: Int!
        messageId: Int!
    }

    type Query {
        allMessagesByUserId(user_id: Int!): [Message]
        allMessagesByLocutors(locutors: AllMessagesByLocutorsInput!): [Message]
        messageById(messageInput: getMessageInput): [Message]
    }

    type Mutation {
        createMessage(message: messageInput!): String
        deleteMessage(origin_user: Int!, message_id: Int!): String
    }
`;

module.exports = messageTypeDefs;