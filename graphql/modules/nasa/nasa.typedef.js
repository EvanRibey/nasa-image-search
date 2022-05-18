import { gql } from 'apollo-server';

const typeDef = gql`
  type Image {
    title: String
    description: String
    href: String
  }

  type Query {
    images(q: String!, from: Int): [Image]
  }
`;
export default typeDef;
