const userResolver = {
    Query: {
        userDetailbyId: (_,{userId}, {dataSources,userIdToken}) => {
            if( userId == userIdToken)
                return dataSources.user_profile_API.getUser( userId);
            else
                return null;

        },
        /*emailExists: async(_,{email}, {dataSources}) =>{
            return await dataSources.user_profile_API.emailExists(email);
            
        }*/
        

    },
    Mutation: {

        signUpUser: async (_,{userInput}, {dataSources}) => {

            const authInput = {

                username: userInput.username,
                password: userInput.password,
                name: userInput.name,
                email: userInput.email,
                ocupation: userInput.ocupation,
                profile_image: userInput.profile_image,
            }
            return await dataSources.user_profile_API.createUser(authInput);

        },
        logIn: async (_,{credentials}, {dataSources}) => {
            return await dataSources.user_profile_API.authRequest(credentials);

        },
        refreshToken :(_,{ refresh}, { dataSources}) => 
        dataSources.user_profile_API.refreshToken(refresh),

        
    }

};

module.exports = userResolver;