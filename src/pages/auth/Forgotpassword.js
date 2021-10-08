import React, { useState } from 'react';
import AuthForm from '../../components/forms/AuthForm';
import {toast} from 'react-toastify';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'

function ForgotPassword() {
  const auth = getAuth();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("simon.chowdery@gmail.com")

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
      handleCodeInApp: true
    };

    try {
      await sendPasswordResetEmail(auth, email, config);
      setLoading(false);
      toast.success(`Email is sent to ${email}. click on the link to reset your password`);
      
    } catch (error) {
      console.log('error on forgot password', error);
      setLoading(false);
      toast.error(error.message);
    }
  }
    return (
        <div className="max-w-4xl mx-auto my-10">
          <div className="md:grid md:grid-cols-1 md:gap-6">
            <AuthForm
                title="Forgot Password"
                email={email} 
                loading={loading} 
                setEmail={setEmail} 
                handleOnSubmit={handleOnSubmit}
              /> 
          </div>
      </div>
    )
}

export default ForgotPassword
