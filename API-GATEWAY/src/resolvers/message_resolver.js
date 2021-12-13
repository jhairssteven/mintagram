const messageResolver = {
    Query: {
        chatBetween: async (_, { userOriginId, userDestinyId }, { dataSources, userIdToken }) => {
            if (userOriginId == userIdToken) {
                let msgFromTo = await dataSources.messageAPI.getConversation(userOriginId, userDestinyId);
                let msgToFrom = await dataSources.messageAPI.getConversation(userDestinyId, userOriginId);

                return getChat(msgFromTo, msgToFrom);
            } else {
                return null
            }
        },

        allChatsUserDetails: async (_, { userOriginId }, { dataSources, userIdToken }) => {
            if (userOriginId == userIdToken) {
                let sendToMeMsgs = 
                        await dataSources.messageAPI.getSendToMeMsgsUserIds(userOriginId);
                let sendMsgsByMe = 
                        await dataSources.messageAPI.getAllMessages(userOriginId)

                let userIdsThatHaveSendMsgsToMe = getIdsFromMsgs(sendToMeMsgs, 'origin_user');
                let userIdsIHaveSendMsgs = getIdsFromMsgs(sendMsgsByMe, 'destiny_user');
                
                let contacts_list = [];

                for (var i = 0; i < userIdsThatHaveSendMsgsToMe.length; i++) {
                    let contact = await getContact(dataSources, userOriginId, userIdsThatHaveSendMsgsToMe[i]);
                    if (contact != null) contacts_list.push(contact);
                }

                for (var i = 0; i < userIdsIHaveSendMsgs.length; i++) {
                    let contact = await getContact(dataSources, userOriginId, userIdsIHaveSendMsgs[i]);
                    console.log("contact: " + JSON.stringify(contact))
                    if (contact != null) contacts_list.push(contact);
                }

                return [...new Set(contacts_list)];

            } else {
                return null
            }
        },

        allMessagesByUserId: async (_, { origin_user }, { dataSources, userIdToken }) => {
            idUserToken = (await dataSources.user_profile_API.getUser(userIdToken)).id_user
            if (origin_user == idUserToken) {
                return await dataSources.messageAPI.getAllMessages(origin_user)
            } else {
                return null
            }
        },

        allMessagesByLocutors: async (_, { userOriginId, userDestinyId }, { dataSources, userIdToken }) => {
            //idUserToken = (await dataSources.authAPI.getUser(userIdToken)).id_user
            if (userOriginId == userIdToken) {
                return await dataSources.messageAPI.getConversation(userOriginId, userDestinyId)
            } else {
                return null
            }
        },

        messageById: async (_, { userOriginId, messageId }, { dataSources, userIdToken }) => {
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
        createMessage: async (_, { message }, { dataSources, userIdToken }) => {
            if (userIdToken != null)
                return await dataSources.messageAPI.createMessage(message)
            else
                return null
        },

        deleteMessage: async (_, { userOriginId, messageId }, { dataSources, userIdToken }) => {
            if (userOriginId == userIdToken)
                return await dataSources.messageAPI.deleteMessage(userOriginId, messageId)
            else
                return null
        }
    }
};

function getIdsFromMsgs(sendToMeMsgs, idUserType) {
    let ids = [];
    for (let ind = 0; ind < sendToMeMsgs.length; ind++) {
        const msg = sendToMeMsgs[ind];
        ids.push(msg[idUserType])        
    }
    return [...new Set(ids)];
}
async function getContact(dataSources, userOriginId, userDestinyId) {
    // let userDestinyId = userIdsThatHaveSendMsgsToMe[i];
    let msgFromTo = await dataSources.messageAPI.getConversation(userOriginId, userDestinyId);
    let msgToFrom = await dataSources.messageAPI.getConversation(userDestinyId, userOriginId);

    let chat = getChat(msgFromTo, msgToFrom);

    /** When there aren't any messages between "origin" and "destiny" user 
     * the service returns an empty list or a null object
     * */

    if (chat.length != 0) {
        let lastChatMsg = chat[chat.length - 1];
        let destinyUser = await dataSources.user_profile_API.getUser(userDestinyId);
        let contact = {
            "id_user": destinyUser["id_user"],
            "profile_image": destinyUser["profile_image"],
            "username": destinyUser["username"],
            "last_msg": lastChatMsg["text"],
            "date_last_msg": lastChatMsg["register_date"],
            "isSendByOriginUser": (lastChatMsg["origin_user"] == userOriginId)
        };
        return contact;
    }

    return null;
}

function getChat(msgFromTo, msgToFrom) {
    let chatUnsorted = msgFromTo.concat(msgToFrom)

    let mgs_dates = [];
    for (var i = 0; i < chatUnsorted.length; i++) {
        mgs_dates.push(chatUnsorted[i]["register_date"]);
    }

    mgs_dates.sort();

    let chat = [];
    for (var j = 0; j < mgs_dates.length; j++) {
        for (var i = 0; i < chatUnsorted.length; i++) {
            if (chatUnsorted[i]["register_date"] == mgs_dates[j]) {
                chat.push(chatUnsorted[i])
            }
        }
    }
    return chat;
};

module.exports = messageResolver;
