import {Switch, Route} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import {ToastContainer} from 'react-toastify';
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import firebaseConfig from './firebase';
import Navbar from './components/Navbar';
import Forgotpassword from './pages/auth/Forgotpassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import {AuthContext} from './context/authContext'
import { useContext } from 'react';
import ResetPassword from './pages/auth/ResetPassword';
import PrivateRoute from './routes/PrivateRoute';




function App() {
  const {state: {user}} = useContext(AuthContext);

  // Initialize Firebase
  initializeApp(firebaseConfig);

  // set auth header for gql
  const authHeader = setContext((_, {headers}) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authtoken: user ? user.token : ""
      }
    }
  });
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API,
  });
  // setup  apollo client
  const client = new ApolloClient({
    link: authHeader.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client} >
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/complete-registration" component={CompleteRegistration} />
        <PrivateRoute exact path="/reset-password" component={ResetPassword} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;