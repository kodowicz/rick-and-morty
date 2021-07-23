import { ApolloClient, HttpLink } from '@apollo/client/core';
import { resolvers, cache } from './resolvers';
import typeDefs from './typeDefs';

const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
  headers: {
    // if there would be a login for user (localStorage or cookies)
    authorization: localStorage.getItem('token') || '',
  },
});

const apolloClient = new ApolloClient({
  typeDefs,
  resolvers,
  cache,
  link: httpLink,
  connectToDevTools: true,
});

export default apolloClient;
