import React, { useEffect, useState , useContext} from 'react'
import {getAuth, signInWithEmailLink, updatePassword, getIdTokenResult} from 'firebase/auth'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom' 
import {gql, useMutation} from '@apollo/client'

import {AuthContext} from '../../context/authContext'
import AuthForm from '../../components/forms/AuthForm'

const CREATE_USER = gql`
    mutation createUser {
        createUser {
        username
        email
        }
    }
`

function CompleteRegistration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {dispatch} = useContext(AuthContext)

    useEffect(()=>{
        setEmail(localStorage.getItem('emailForRegistration'))
    },[history]);

    const [createUser] = useMutation(CREATE_USER)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // validation
        if(!email || !password){
            toast.error('email and password are required')
            return
        }

        try {
            const auth = getAuth();
            const result = await signInWithEmailLink(auth, email, window.location.href);
            
            if(result.user.emailVerified){
                // remove email from local stirage
                localStorage.removeItem('emailForRegistration');

                // update passowrd
                const user = auth.currentUser;
                await updatePassword(user, password);

                // dispatch user with token and email
                // redirect
                const idTokenResult = await getIdTokenResult(user);
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {email: user.email, token: idTokenResult.token}
                })

                // make api req to save/update user in mongodb
                createUser()
                history.push('/dhasboard')

            }

            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
            toast.error(error.message)   
        }
    }

    return (
        <div className="max-w-4xl mx-auto my-10">
        <div className="md:grid md:grid-cols-1 md:gap-6">
            <AuthForm
              title="Complete Your Registration"
              email={email} 
              password={password} 
              loading={loading} 
              setEmail={setEmail} 
              setPassword={setPassword} 
              handleOnSubmit={handleOnSubmit}
              showPasswordInput={true}
            /> 
        </div>
    </div>
    )
}

export default CompleteRegistration
