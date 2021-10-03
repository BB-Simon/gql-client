import React, { useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom' 

function CompleteRegistration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(()=>{
        setEmail(localStorage.getItem('emailForRegistration'))
    },[history])

    const handleOnSubmit = () => {
        // 
    }
    return (
        <div className="max-w-4xl mx-auto my-10">
        <div className="md:grid md:grid-cols-1 md:gap-6">
            <form onSubmit={handleOnSubmit} className="shadow overflow-hidden sm:rounded-md">
                <h1 className="p-6 text-2xl font-bold">Complete Registration</h1>
                <div className="px-6 pb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                        value={email}
                        className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    />
                </div>
                <div className="px-6 pb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="passowrd"
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

export default CompleteRegistration
