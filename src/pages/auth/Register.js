import React, { useState } from 'react'
import {getAuth,  sendSignInLinkToEmail} from "firebase/auth";
import { toast } from 'react-toastify';



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
                <form onSubmit={handleOnSubmit} className="shadow overflow-hidden sm:rounded-md">
                    <h1 className="p-6 text-2xl font-bold">Register</h1>
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

export default Register
