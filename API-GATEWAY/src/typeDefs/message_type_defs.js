const {gql} = require('apollo-server')

const messageTypeDefs = gql `
    type contacts_list {
        id_user: Int!
        profile_image: String!
        username: String!
        last_msg: String!
        date_last_msg: String!
        isSendByOriginUser: Int!
    }

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

    extend type Query {
        allMessagesByUserId(origin_user: Int!): [Message]
        allMessagesByLocutors(userOriginId: Int!, userDestinyId: Int!): [Message]
        messageById(userOriginId: Int!, messageId: Int!): Message

        chatBetween(userOriginId: Int!, userDestinyId: Int!): [Message]
        allChatsUserDetails(userOriginId: Int!): [contacts_list]
    }

    extend type Mutation {
        createMessage(message: messageInput!): String
        deleteMessage(userOriginId: Int!, messageId: Int!): String
    }
`;

module.exports = messageTypeDefs;