import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ ...rest }) => {
	const { state } = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		if (state.user) {
			history.push("/profile");
		}
	}, [state.user]);

	return (
		<div>
			<Route {...rest} />
		</div>
	);
};

export default PrivateRoute;
