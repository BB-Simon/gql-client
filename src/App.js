import {Switch, Route} from 'react-router-dom'
import { initializeApp } from "firebase/app";
import {ToastContainer} from 'react-toastify'

import Navbar from './components/Navbar';
import Forgotpassword from './pages/auth/Forgotpassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import CompleteRegistration from './pages/auth/CompleteRegistration';




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDAQlZc1IXxAZ4lT_4yuzXR6A5d_IbeLQ",
    authDomain: "gqlreactnode12.firebaseapp.com",
    projectId: "gqlreactnode12",
    storageBucket: "gqlreactnode12.appspot.com",
    messagingSenderId: "614176438603",
    appId: "1:614176438603:web:eeae3663e291087fb6d0ce",
    measurementId: "G-KB3EBHM6PM"
  };

function App() {
  // Initialize Firebase
  initializeApp(firebaseConfig);
  
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/complete-registration" component={CompleteRegistration} />
        <Route exact path="/forgot-passowrd" component={Forgotpassword} />
        <Route exact path="/" component={Home} />
      </Switch>

    </>
  );
}

export default App;