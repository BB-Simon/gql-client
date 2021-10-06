import React, { useState, useContext } from 'react';
import {Link, useHistory } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {AuthContext} from '../../context/authContext';
import {toast }from 'react-toastify'
import SocialLogins from './SocialLogins';

function Login() {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider(auth);
  const history = useHistory();
  const {dispatch} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("simon.chowdery@gmail.com")
  const [password, setPassword] = useState("123456")

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

      // redirect
      history.push('/');
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

        // redirect
        history.push('/');
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
        <div className="md:grid md:grid-cols-1 md:gap-6">
            <form onSubmit={handleOnSubmit} className="shadow overflow-hidden sm:rounded-md">
                <SocialLogins signInWithGoogle={signInWithGoogle} />
                <h1 className="p-6 text-2xl font-bold">Login</h1>
                <div className="px-6 pb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        value={email}
                        className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    />
                </div>
                <div className="px-6 pb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Passowrd
                    </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        value={password}
                        className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    />
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6">
                    <button
                        type="submit"
                        disabled={!email || loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
