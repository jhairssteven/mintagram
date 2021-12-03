const postTypeDefs = require('./post_type_defs')
const likeTypeDefs = require('./like_type_defs')
const commentTypeDefs = require('./comment_type_defs')
const imageTypeDefs = require('./image_type_defs')

const schemasArrys =[postTypeDefs, likeTypeDefs, commentTypeDefs, imageTypeDefs];

module.exports = schemasArrys;