import React, { useState } from 'react'
import {getAuth,  sendSignInLinkToEmail} from "firebase/auth";
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';



function Register() {
    const [email, setEmail] = useState("simon.chowdery@gmail.com")
    const [loading, setLoading] = useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true,

        }
        const auth = getAuth()
        await sendSignInLinkToEmail(auth, email, config)

        // show toast notification to user about email sent
        toast.success(`Email sent to ${email}. click the link to complete your registrayopn.`)
        // save user email to local storage
        localStorage.setItem('emailForRegistration', email);

        // cleare states
        setEmail('');
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto my-10">
            <div className="md:grid md:grid-cols-1 md:gap-6">
               <AuthForm 
                    title="Register"
                    email={email} 
                    loading={loading} 
                    setEmail={setEmail} 
                    handleOnSubmit={handleOnSubmit}
                /> 
            </div>
        </div>
    )
}

export default Register
