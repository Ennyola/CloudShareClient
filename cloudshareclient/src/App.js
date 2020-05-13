import React from 'react';
import {ApolloClient} from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'




import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Homepage from './components/Homepage'
import VideosPage from './components/Videos'
import AudiosPage from './components/Audios'
import RawFiles from './components/RawFiles'
import requireAuth from './components/requireAuth'


const link = createHttpLink({
  uri: 'http://localhost:8000/graphiql/',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
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
      
      <BrowserRouter>
           {/* <Redirect from="/" exact to="/homepage/:username" />  */}
          <Route path = "/login" exact  component = {LoginForm} />
          <Route path = "/signup" exact  component = {SignupForm} />
          <Route path = "/homepage/:username" exact  component = { requireAuth(Homepage)  } />
          <Route path = "/homepage/:username/images" exact  component = {requireAuth(Homepage)} />
          <Route path = "/homepage/:username/videos" exact  component = {requireAuth(VideosPage)}/>
          <Route path = "/homepage/:username/audios" exact  component = {requireAuth(AudiosPage)}/>
          <Route path = "/homepage/:username/documents" exact  component = {requireAuth(RawFiles)}/>
      </BrowserRouter>

      
    </ApolloProvider>
  );
}

export default App;
