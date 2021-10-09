import React from 'react'
import { Link } from 'react-router-dom'
import SocialLogins from '../../pages/auth/SocialLogins'

function AuthForm({
    title,
    email = "",
    password = "",
    loading,
    setEmail = f => f,
    setPassword = f => f,
    handleOnSubmit,
    signInWithGoogle,
    showPasswordInput = false,
    showSocialLogins = false,
    showForgotPasswordLink = false,
    hideEmailInput= false
}) {
    return (
        <form onSubmit={handleOnSubmit} className="shadow overflow-hidden sm:rounded-md">
            {showSocialLogins ? (
                <SocialLogins signInWithGoogle={signInWithGoogle} />
            ) : null}
            <h1 className="p-6 text-2xl font-bold">{title}</h1>
            {!hideEmailInput && (
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
            )}
            {showPasswordInput ? (
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
                    {showForgotPasswordLink ? (
                        <div className="mt-4 text-red-300">
                            <Link  to="/password/forgot">Forgot Password</Link>
                        </div>
                    ) : null}
                </div>
            ): null}
            <div className="px-4 py-3 bg-gray-50 sm:px-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AuthForm
