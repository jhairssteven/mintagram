const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const MessageAPI = require('./dataSources/message_api');
const PostsAPI = require('./dataSources/posts_api');
const User_Profile_API = require('./dataSources/user_profile_api');
const authentication = require('./utils/authentication');

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        messageAPI: new MessageAPI(),
        postAPI: new PostsAPI(),
        user_profile_API: new User_Profile_API(),
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

