import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';


import {AuthProvider} from './context/authContext'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider client={client} >
          <App />
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
