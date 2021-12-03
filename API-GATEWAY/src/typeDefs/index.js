const postTypeDefs = require('./post_type_defs')
const likeTypeDefs = require('./like_type_defs')
const commentTypeDefs = require('./comment_type_defs')
const imageTypeDefs = require('./image_type_defs')
const messageTypeDefs = require("./message_type_defs")
const userTypeDefs = require('./user_type_defs')

const schemasArrys = [userTypeDefs, postTypeDefs, likeTypeDefs, 
            commentTypeDefs, imageTypeDefs, messageTypeDefs ];

module.exports = schemasArrys;