const { RESTDataSource} = require('apollo-datasource-rest');
//const { Token } = require('graphql');
const serverConfig      = require('../server');


class User_Profile_API extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = serverConfig.user_profile_api_url;

    }

    async createUser(user){
       // user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post(`/u/signup/`, user);

    }

    async getUser(userId){
        return await this.get(`/u/id/${userId}/`);

    }


    async authRequest(credentials){
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`/u/login/`, credentials);

    }

    async refreshToken(token){
        token = new Object(JSON.parse(JSON.stringify({refresh: token})));
        return await this.post(`/u/refresh/`, token);

    }
    /*async emailExists(email){
        //email = new Object(JSON.parse(JSON.stringify(email)));
        return await this.get(`/u/e/${email}/`);
    }*/
}
module.exports = User_Profile_API;