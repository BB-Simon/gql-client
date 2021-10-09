import React, { useContext, useEffect, useState } from 'react';
import {Route} from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {AuthContext} from '../context/authContext';

const PrivateRoute = ({children, ...rest}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const {state} = useContext(AuthContext);
    const [user, setUser] = useState(false);

    useEffect(() => {
        if(state.user) {
            setUser(true)
        }
    }, [state.user]);

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    const renderContent = () => (
        <div className="flex">
            <div>
                <RightSidebar openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
            </div>
            <main className="w-full" onClick={() => setOpenMenu(false)}>
                <Route {...rest} />
            </main>
        </div>
    )

    return user ? renderContent() : <h4>Loading...!</h4>
}

export default PrivateRoute
