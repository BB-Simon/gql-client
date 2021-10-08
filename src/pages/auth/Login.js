import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {AuthContext} from '../../context/authContext';
import {toast }from 'react-toastify'
import {gql, useMutation} from '@apollo/client'
import AuthForm from '../../components/forms/AuthForm';


const CREATE_USER = gql`
    mutation createUser {
        createUser {
        username
        email
        }
    }
`

function Login() {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider(auth);
  const history = useHistory();
  const {dispatch} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("simon.chowdery@gmail.com")
  const [password, setPassword] = useState("123456")

  const [createUser] = useMutation(CREATE_USER)

  const handleOnSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {user} =  result;
      const idTokenResult= await user.getIdTokenResult();

      // dispatch user
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {email: user.email, token: idTokenResult.token}
      })

      // send user info to our mongodb server to either update/create
      createUser()
      // redirect
      history.push('/dhasboard');
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }
  const signInWithGoogle =async () => {
      try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const {user} = result;
        const idTokenResult = await user.getIdTokenResult()

        // dispatch user
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {email: user.email, token: idTokenResult.token}
        })

        // send user info to our mongodb server to either update/create
        createUser()
        // redirect
        history.push('/dhasboard');
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
        <div className="md:grid md:grid-cols-1 md:gap-6">
           <AuthForm 
              title="Login"
              email={email} 
              password={password} 
              loading={loading} 
              setEmail={setEmail} 
              setPassword={setPassword} 
              handleOnSubmit={handleOnSubmit}
              signInWithGoogle={signInWithGoogle}
              showPasswordInput={true}
              showSocialLogins={true}
              showForgotPasswordLink={true}
            /> 
        </div>
    </div>
  )
}

export default Login
