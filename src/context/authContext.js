import React, {useReducer, createContext, useEffect} from 'react'
import {getAuth, getIdTokenResult, onAuthStateChanged} from 'firebase/auth'

// reducer Firebase
const firebaseReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

// state
const initialState = {
    user: null
}

// create context
const AuthContext = createContext()

// create provider 
const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    const value = {state, dispatch}

    useEffect(() => {
        const auth = getAuth()
        const unsubscrib = onAuthStateChanged(auth, async user => {
            if(user){
                const idTokenResult = await getIdTokenResult(user);
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {email: user.email, token: idTokenResult.token}
                })
            } else {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: null
                })
            }
        })

        // cleanup
        return () => unsubscrib()
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// export
export {AuthContext, AuthProvider}