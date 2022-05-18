import fetch from 'node-fetch';
import errorList from 'apollo-server-errors';
const {
  UserInputError,
  ApolloError,
} = errorList;

function createUrl(query, page) {
  const base = new URL('/search', process.env.NASA_API_BASE);
  let params = new URLSearchParams(`q=${encodeURIComponent(query)}&media_type=image`);

  if (page && page > 1) {
    params.append('page', page);
  }

  const fullUrl = new URL(`${base.pathname}?${params.toString()}`, base);
  return fullUrl.toString();
}

function checkErrors(response) {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        // log the error here using service if needed
        throw new UserInputError('error in input, review query and try again');
      case 500:
      case 502:
      case 503:
      case 504:
      default:
        // log the error here using service
        throw new ApolloError('unexpected error occurred');
    }
  }

  return true;
}

function cleanImages(images) {
  return images.map(({ data, links }) => ({
    title: data[0]?.title,
    description: data[0]?.description,
    href: links[0]?.href,
  }));
}

export default async function retrieveImages(options) {
  const {
    query,
    from: page,
  } = options;

  const url = createUrl(query, page);
  const response = await fetch(url);
  checkErrors(response);

  const { collection } = await response.json();
  const images = cleanImages(collection.items);

  return images;
}
