import React, { useEffect, useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ALL_POSTS, TOTAL_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

function Home() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const history = useHistory();

	// access context
	const { state, dispatch } = useContext(AuthContext);

	const { loading, error, data } = useQuery(ALL_POSTS, {
		variables: {page}
	});
	const {data: postCount} = useQuery(TOTAL_POSTS);

	const totalPages = Math.ceil(postCount?.totalPosts / 3);


	const handleOnClick = (pageNumber) => {
		setPage(pageNumber)
	}

	const handleOnClickPrev =() =>{
		setPage(page - 1)
	}
	const handleOnClickNext =() =>{
		setPage(page + 1)
	}

	useEffect(() => {
		setPosts(data?.allPosts);
	}, [data]);

	const updateUserName = () => {
		dispatch({
			type: "LOGGED_IN_USER",
			payload: "Simon Chowdery",
		});
	};

	return (
		<div>
			<div className='grid grid-cols-3 gap-4 p-10'>
				{posts &&
					posts.map((post, index) => <PostCard key={index} post={post} />)}
			</div>
			<div>
				<Pagination 
					totalPages={totalPages} 
					handleOnClick={handleOnClick} 
					page={page} 
					handleOnClickPrev={handleOnClickPrev}
					handleOnClickNext={handleOnClickNext}
					totalPosts={postCount?.totalPosts}
				/>
			</div>
			<div className='p-10'>
				<p>Small Chnage will go here</p>
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
