import retrieveImages from './nasa.service.js';

const resolvers = {
  Query: {
    images: async (_obj, { q, from } ) => retrieveImages({
      query: q,
      from,
    }),
  },
};
export default resolvers;
