const Koa = require('koa');
const { ApolloServer, AuthenticationError } = require('apollo-server-koa');
const { typeDefs } = require('./schema');
const { getResolvers } = require('./resolvers');

class StarWarService {

  async getHttpServer() {
    try {
      if (this.httpServer) return this.httpServer;

      const context =  ({ ctx }) => {
        const token = ctx.get('Authorization') || '';
        const isValidUser = token === 'strapiBearerToken';
        if (!isValidUser) {
          throw new AuthenticationError('You must be logged in to access this resource');
        }
        return { isValidUser };
      };
      const resolvers = getResolvers();

      const server = new ApolloServer({ typeDefs, resolvers, context });
      await server.start();

      const app = new Koa();
      server.applyMiddleware({ app });

      app.listen({ port: 3000 }, () =>
          console.log(`server.ready.at: http://localhost:3000${server.graphqlPath}`),
      );

      return this.httpServer;
    } catch (err) {
      console.log('error.starting.server', err);
      throw err;
    }
  }
}

module.exports = {
  StarWarService
}
