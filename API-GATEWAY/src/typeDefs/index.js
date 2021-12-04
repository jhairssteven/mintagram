const postTypeDefs = require("./post_type_defs");
const messageTypeDefs = require("./message_type_defs");
const userTypeDefs = require('./user_type_defs');

const schemasArrys = [userTypeDefs, messageTypeDefs, postTypeDefs];

module.exports = schemasArrys;