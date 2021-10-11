import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { SINGLE_USER } from "../graphql/queries";

function SingleUser() {
	const { username } = useParams();
	const { data } = useQuery(SINGLE_USER, {
		variables: { username },
	});

	const user = data?.publicProfile;

	return (
		<div className='m-10 flex flex-col items-center'>
			{user && (
				<>
					<div>
						<img src={user?.images[0].url} alt='' />
					</div>
					<div>
						<p>@{user?.username}</p>
						<p>{user?.about}</p>
					</div>
				</>
			)}
		</div>
	);
}

export default SingleUser;
