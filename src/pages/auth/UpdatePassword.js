import React, { useState } from 'react'
import AuthForm from '../../components/forms/AuthForm';
import {getAuth, updatePassword} from 'firebase/auth';
import {toast} from 'react-toastify'

function UpdatePassword() {
    const auth = getAuth();
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const user = auth.currentUser
        await updatePassword(user, password)
        setLoading(false);
        toast.success('Password has updated')
        
    } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error.message);

    }

  }
    return (
        <div className="m-10">
            <div className="md:grid md:grid-cols-1 md:gap-6">
                <AuthForm
                    title="Update Password"
                    password={password} 
                    loading={loading} 
                    setPassword={setPassword} 
                    handleOnSubmit={handleOnSubmit}
                    showPasswordInput={true}
                    hideEmailInput={true}
                /> 
            </div>
        </div>
    )
}

export default UpdatePassword
