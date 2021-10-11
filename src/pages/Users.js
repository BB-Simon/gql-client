import React, { useEffect, useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ALL_USERS } from "../graphql/queries";
import UserCard from "../components/UserCard";

function Users() {
	const { loading, error, data } = useQuery(ALL_USERS);

	if (loading) <h4>Loading...!</h4>;
	return (
		<div className='m-10'>
			<div className='grid grid-cols-4 gap-5'>
				{data && data.allUsers.map((user) => <UserCard user={user} />)}
			</div>
		</div>
	);
}

export default Users;
