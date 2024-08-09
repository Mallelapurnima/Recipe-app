const { ApolloServer } = require('apollo-server-express');
const { verifyToken } = require('./auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});





