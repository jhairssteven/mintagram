const messageResolver = {
    Query: {
            allMessagesByUserId: async(_,{userId}, {dataSources, userIdToken}) => {
                idUserToken = (await dataSources.authAPI.getUser(userIdToken)).id_user
                if (userId == idUserToken) {
                    return await dataSources.messageAPI.getAllMessages(userId)
                } else {
                    return null
                }
            },
            allMessagesByLocutors: async(_, {locutorsIds}, {dataSources, userIdToken}) => {
                idUserToken = (await dataSources.authAPI.getUser(userIdToken)).id_user
                if(idUserToken == locutorsIds.origin_userId) {
                    return await dataSources.messageAPI.getConversation(locutorsIds.origin_userId, locutorsIds.destiny_userId)
                } else {
                    return null
                }
            },
            messageById: async(_, {usrMsgInput}, {dataSources}) => {
                return await dataSources.messageAPI.getUserMessage(usrMsgInput.userId, usrMsgInput.messageId)
            },
            
    },

    Mutation: {
        // createMessage(message: Message!)
        // deleteMessage(data: DeleteMessageInput!): String
        createMessage: async(_, {message}, {dataSources}) => {
            await dataSources.messageAPI.createMessage(message)
        },
        
        deleteMessage: async(_, {origin_user, message_id}, {dataSources}) => {
            await dataSources.messageAPI.deleteMessage(origin_user, message_id)
        }
    }
};

module.exports = messageResolver;
