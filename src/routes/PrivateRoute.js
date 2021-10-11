import React, { useContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import LoadingToRedirect from "../components/LoadingToRedirect";
import RightSidebar from "../components/RightSidebar";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ ...rest }) => {
	const [openMenu, setOpenMenu] = useState(false);
	const { state } = useContext(AuthContext);
	const [user, setUser] = useState(false);

	useEffect(() => {
		if (state.user) {
			setUser(true);
		}
	}, [state.user]);

	const handleOpenMenu = () => {
		setOpenMenu(!openMenu);
	};

	const renderContent = () => (
		<div className='flex'>
			<div>
				<RightSidebar openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
			</div>
			<main className='w-full' onClick={() => setOpenMenu(false)}>
				<Route {...rest} />
			</main>
		</div>
	);

	return user ? renderContent() : <LoadingToRedirect path='/login' />;
};

export default PrivateRoute;
