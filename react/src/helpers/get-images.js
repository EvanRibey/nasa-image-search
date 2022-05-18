import { gql } from '@apollo/client';
import client from '../connections/apollo-client';

const GET_IMAGES = gql`
  query GetImages($search: String!, $page: Int) {
    images(q: $search, from: $page) {
      href
      description
      title
    }
  }
`;

export default async function getImages(search, page=1) {
  const { data } = await client.query({
    query: GET_IMAGES,
    variables: {
      search,
      page,
    }
  });

  return data.images;
}
