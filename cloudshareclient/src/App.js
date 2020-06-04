import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import React from 'react';
import {ApolloClient} from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
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
import LandingPage from './components/LandingPage'


const link = createHttpLink({
  uri: 'https://awploder-auth.herokuapp.com/graphiql/',
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

  link: authLink.concat(link),
  cache: new InMemoryCache(),
})


function App() {
  return (
    
    <ApolloProvider client = { client }>
      
      <BrowserRouter>
         
          <Switch>
            <Route path = "/login"   component = {LoginForm} />
            <Route path = "/signup"   component = {SignupForm} />
            <Route path = "/:username/images"   component = {requireAuth(Homepage)} />
            <Route path = "/:username/videos"   component = {requireAuth(VideosPage)}/>
            <Route path = "/:username/audios"   component = {requireAuth(AudiosPage)}/>
            <Route path = "/:username/documents"   component = {requireAuth(RawFiles)}/>
            <Route path = "/:username"   component = {requireAuth(Homepage)} />
            <Route path = "/"  component = {LandingPage}/> 
          </Switch>
          
        
          
      </BrowserRouter>

      
    </ApolloProvider>
  );
}

export default App;
