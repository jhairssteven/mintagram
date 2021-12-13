const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class MessageAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.message_api_url;
    }

    async createMessage(message) {
        message = new Object(JSON.parse(JSON.stringify(message)));
        return await this.post('/message/create/', message);
    }

    async getAllMessages(origin_user) {
        return await this.get(`/allmessages/${origin_user}/`);
    }

    async getConversation(userOriginId, userDestinyId) {
        return await this.get(`/messages/filter/${userOriginId}/${userDestinyId}/`);
    }

    async getUserMessage (userId, messageId) {
        return await this.get(`/message/${userId}/${messageId}/`);
    }

    async deleteMessage (userId, messageId) {
        return await this.delete(`/message/remove/${userId}/${messageId}/`)
    }

    async getSendToMeMsgsUserIds (userId) {
        return await this.get(`allmessages/d/${userId}/`)
    }
}

/*
SIRVE
async getConversation(AllMessagesByLocutorsInput) {
        return await this.get(`/messages/filter/${AllMessagesByLocutorsInput.origin_userId}/${AllMessagesByLocutorsInput.destiny_userId}/`);
    } */
module.exports = MessageAPI;
