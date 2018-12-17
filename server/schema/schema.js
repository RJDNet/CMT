const { gql } = require('apollo-server-express');

// Mongoose Model imports
const Post = require('../models/post');
const Product = require('../models/product');

// GraphQl Typedefs
const typeDefs = gql`

type Query {
  getPosts: [Post!]!
  getAllProducts: [Product!]!
  getProducts(category: String!): [Product!]!
}

type Post {
  title: String!
  text: String!
  createdAt: String!
}

type Product {
  title: String!
  text: String!
  category: String!
  price: Float!
  image: Image
}

type Image {
  secure_url: String!
}

`;

// GraphQl resolvers
const resolvers = {
  Query: {
    getPosts: async (parent, _, context) => {
      const postsResult = await Post.find({ user: context.authScope }).sort({ createdAt: -1 });
      postsResult.forEach(post => {
        post.user = undefined;
      });
      return postsResult;
    },
    getAllProducts: async (parent, _, context) => {
      const productsResult = await Product.find({ user: context.authScope }).sort({ createdAt: -1 });
      productsResult.forEach(product => {
        product.user = undefined;
      });
      return productsResult;
    },
    getProducts: async (parent, args, context) => {
      const productsResult = await Product.find({ user: context.authScope, category: args.category }).sort({ createdAt: -1 });
      productsResult.forEach(product => {
        product.user = undefined;
      });
      return productsResult;
    }
  }
}

module.exports = { typeDefs, resolvers };