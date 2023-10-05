import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Config } from 'src/config';

const GraphQLClient = new ApolloClient({
  uri: Config.beseUrl,
  cache: new InMemoryCache(),
});

export default GraphQLClient;
