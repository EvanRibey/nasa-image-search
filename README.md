# nasa-image-search

Two small, separate applications that search and render results from the NASA image API.

## GraphQL
A small Express application that bootstraps the Apollo server to allow for GraphQL queries to connect and resolve.

### Notes
Does require an environment file to run. More specifically uses "NASA_API_BASE" to attach to the base of the image API. As of this commit that is "https://images-api.nasa.gov" which is publically available.

## React
Another small Vite application that connects to the back-end server to make GraphQL queries. Paginates between results from the API, and uses Material UI to stylize.

### Notes
Also requires an environment file to start as this connects the front end to the backend. The environment variable required is "VITE_GRAPHQL_URL" connected to the endpoint of the graphql server. If the GraphQL server in this app is used, that would be a localhosted server akin to "http://localhost:3000/graphql".
