import React, { useContext, useEffect, useState } from 'react';
import {Route, Link} from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {AuthContext} from '../context/authContext';

const PrivateRoute = ({children, ...rest}) => {
    const {state} = useContext(AuthContext);
    const [user, setUser] = useState(false);

    useEffect(() => {
        if(state.user) {
            setUser(true)
        }
    }, [state.user]);

    const renderContent = () => (
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <RightSidebar />
            </div>
            <div className="col-span-10">
                <Route {...rest} />
            </div>
        </div>
    )

    return user ? renderContent() : <h4>Loading...!</h4>
}

export default PrivateRoute
