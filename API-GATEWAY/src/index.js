const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const MessageAPI = require('./dataSources/message_api');
const PostsAPI = require('./dataSources/posts_api');
const UserProfileAPI = require('./dataSources/user_profile_api');

const authentication = require('./utils/authentication');
const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        messageAPI: new MessageAPI(),
        postsAPI: new PostsAPI(),
        userProfileAPI: new UserProfileAPI(),
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});