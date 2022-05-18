import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import nasaTypeDefs from './modules/nasa/nasa.typedef.js';
import nasaResolvers from './modules/nasa/nasa.resolver.js';

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 3000;
  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(
  [nasaTypeDefs],
  [nasaResolvers],
)
  .catch((error) => {
    // error logging for server start
    // change to needed logging service
    console.error(error);
  });
