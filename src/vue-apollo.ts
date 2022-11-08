import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http' 
import { InMemoryCache } from 'apollo-cache-inmemory' 

Vue.use(VueApollo)

export function createProvider () {
  const httpLink = new HttpLink({
    uri: 'https://countries.trevorblades.com/',
  });

  const  apolloClient  = new ApolloClient({ 
    link: httpLink, 
    cache: new InMemoryCache(), 
    connectToDevTools: true 
  }); 

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}

