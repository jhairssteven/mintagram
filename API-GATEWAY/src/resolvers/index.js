const messageResolver = require('./message_resolver');
const userResolver = require('./user_resolver');
const postResolver = require('./post_resolver');

const likeResolver = require('./like_resolver');
const commentResolver = require('./comment_resolver');

const lodash = require('lodash');
const resolvers = lodash.merge(messageResolver, userResolver, postResolver, commentResolver, likeResolver);
module.exports = resolvers;
