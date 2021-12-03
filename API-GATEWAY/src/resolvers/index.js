const messageResolver = require('./message_resolver');
const lodash = require('lodash');
const resolvers = lodash.merge(messageResolver);
module.exports = resolvers;