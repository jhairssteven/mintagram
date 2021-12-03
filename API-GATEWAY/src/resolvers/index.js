const messageResolver = require('./message_resolver');
const userResolver = require('./user_resolver');
const lodash = require('lodash');
const resolvers = lodash.merge(messageResolver, userResolver);
module.exports = resolvers;
