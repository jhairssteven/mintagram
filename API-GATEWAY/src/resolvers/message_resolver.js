const messageResolver = {
    Query: {
            allMessagesByUserId: async(_,{origin_user}, {dataSources, userIdToken}) => {
                idUserToken = (await dataSources.user_profile_API.getUser(userIdToken)).id_user
                if (origin_user == idUserToken) {
                    return await dataSources.messageAPI.getAllMessages(origin_user)
                } else {
                    return null
                }
            },

            allMessagesByLocutors: async(_, {userOriginId, userDestinyId}, {dataSources, userIdToken}) => {
                //idUserToken = (await dataSources.authAPI.getUser(userIdToken)).id_user
                if(userOriginId == userIdToken) {
                    return await dataSources.messageAPI.getConversation(userOriginId, userDestinyId)
                } else {
                    return null
                }
            },

            messageById: async(_, {userOriginId, messageId}, {dataSources, userIdToken}) => {
                //idUserToken = (await dataSources.authAPI.getUser(userIdToken)).id_user
                if (userOriginId == userIdToken) {
                    return await dataSources.messageAPI.getUserMessage(userOriginId, messageId)
                } else {
                    return null
                }
                
            },
            
    },

    Mutation: {
        // createMessage(message: Message!)
        // deleteMessage(data: DeleteMessageInput!): String
        createMessage: async(_, {message}, {dataSources, userIdToken}) => {
            if (userIdToken != null)
              return await dataSources.messageAPI.createMessage(message)
            else
               return null
        },
        
        deleteMessage: async(_, {userOriginId, messageId}, {dataSources, userIdToken}) => {
            if (userOriginId == userIdToken)
              return await dataSources.messageAPI.deleteMessage(userOriginId, messageId)
            else
              return null
        }
    }
};

module.exports = messageResolver;
