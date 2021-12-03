const {gql} = require('apollo-server');

const imageTypeDefs = gql `
  type Image{
      id: String!
      postIdDestiny: String!
      imagen: String!
      // (o que tipo de dato sera esto?)
  }
  input ImageInput{
      postIdDestiny: String!
      image: Binary!
      // (o que tipo de dato sera esto? o MultipartFile?)
  }

  extend type Query{
    imageAll(): [Image]
    imageById(id: Sytring!): Image
}
  extend type Mutation{
      createImage(image: ImageInpunt!): Image
      deleteImage(id: Sytring!): String!
  }
`;
module.exports = imageTypeDefs;