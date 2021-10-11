import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user }) {
	console.log(user);
	return (
		<div className='border border-blue-500 p-5'>
			<div className='flex justify-center items-center flex-col border-b'>
				<img className='rounded-full' src={user.images[0].url} alt='' />
				<Link to={`/user/${user.username}`}>
					<p className='my-4 text-xl'>@{user.username}</p>
				</Link>
			</div>
			<div className='my-5'>
				<p className='text-center text-xl'>{user.about}</p>
			</div>
		</div>
	);
}

export default UserCard;
