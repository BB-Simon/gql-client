import React from 'react'
import { FacebookIcon, GithubIcon, GoogleIcon } from '../../assets/social-icons'

function SocialLogins({signInWithGoogle}) {
    return (
        <div className="flex flex-col p-6 ">
            <div onClick={signInWithGoogle} style={{background: "#4285f4"}} className="text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64">
                <GoogleIcon />
                <span className="border-l border-blue-400 h-6 w-1 block"></span>
                <span className="pl-3">Sign up with Google</span>
            </div>
            
            <div className="bg-gray-900 text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64 mt-2">
                <GithubIcon />
                <span className="border-l border-gray-800 h-6 w-1 block mr-1"></span>
                <span className="pl-3">Sign up with Github</span>
            </div>
            
            <div className="bg-indigo-600 text-gray-100 hover:text-white shadow text-sm font-bold py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64 mt-2">
                <FacebookIcon />
                <span className="border-l border-indigo-500 h-6 w-1 block mr-1"></span>
                <span className="pl-3">Sign up with Facebook</span>
            </div>
        </div>
    )
}

export default SocialLogins
