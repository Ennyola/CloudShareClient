import React from 'react';
import {ApolloClient} from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Route, HashRouter,} from 'react-router-dom'
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'




import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Homepage from './components/Homepage'


const link = createHttpLink({
  uri: 'http://localhost:8000/graphiql/',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('user-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    }
  }
});


const client = new ApolloClient({

  dataIdFromObject:  o => o.id,

  link: authLink.concat(link),
  cache: new InMemoryCache(),
})


function App() {
  return (
    
    <ApolloProvider client = { client }>
      <HashRouter>
        <Route path = "/login" component = {LoginForm} />
        <Route path = "/signup" component = {SignupForm} />
        <Route path = "/homepage/:username" component = {Homepage} >
          {/* <Route path = "/homepage/:username/all-documents"/> */}
        </Route>
        
      </HashRouter>

      
    </ApolloProvider>
  );
}

export default App;
