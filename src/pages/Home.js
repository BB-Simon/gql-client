import React, { useEffect, useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ALL_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";

function Home() {
	const [posts, setPosts] = useState([]);
	const history = useHistory();

	// access context
	const { state, dispatch } = useContext(AuthContext);

	const { loading, error, data } = useQuery(ALL_POSTS);

	const [fetchPost, { data: postData }] = useLazyQuery(ALL_POSTS);

	useEffect(() => {
		setPosts(data?.allPosts);
	}, [data]);

	const updateUserName = () => {
		dispatch({
			type: "LOGGED_IN_USER",
			payload: "Simon Chowdery",
		});
	};

	console.log("posts", posts);

	return (
		<div>
			<div className='grid grid-cols-3 gap-4 p-10'>
				{posts && posts.map((post, index) => <PostCard post={post} />)}
			</div>
			<div className='p-10'>
				<button
					onClick={() => fetchPost()}
					className='py-2 px-5 bg-blue-600 text-white rounded'>
					Load posts
				</button>

				<div>{JSON.stringify(postData)}</div>
				<div>{JSON.stringify(state.user)}</div>
				<button
					onClick={updateUserName}
					className='py-2 px-5 bg-blue-600 text-white rounded'>
					Update User Name
				</button>
			</div>
		</div>
	);
}

export default Home;
