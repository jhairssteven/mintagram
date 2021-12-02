const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class MessageAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.message_api_url;
    }

    async createMessage(message) {
        message = new Object(JSON.parse(JSON.stringify(message)));
        return await this.post(`/message/create/`, message);
    }

    async getAllMessages(userId) {
        return await this.get(`/allmessages/${userId}/`);
    }

    async getConversation(originUserId, destinationUserId) {
        return await this.post(`/messages/filter/${originUserId}/${destinationUserId}/`);
    }

    async getUserMessage (userId, messageId) {
        return await this.post(`/message/${userId}/${messageId}/`);
    }

    async deleteMessage (userId, messageId) {
        return await this.delete(`/message/remove/${userId}/${messageId}/`)
    }
}

module.exports = MessageAPI;
