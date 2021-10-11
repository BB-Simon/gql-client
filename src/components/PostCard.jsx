import React from "react";
import { Link, useHistory } from "react-router-dom";

function PostCard({ post, handleDeletePost, showUpdateAndDeleteBtns = false }) {
	const history = useHistory();

	return (
		<div className='border border-blue-500 p-5 flex flex-col'>
			<div>
				<Link to={`/post/${post._id}`}>
					<img src={post.image.url} alt='' />
				</Link>
			</div>
			<div>
				<p>Posted By: {post?.postedBy.username}</p>
			</div>
			<div className='flex-grow'>
				<p>{post.content}</p>
			</div>
			{showUpdateAndDeleteBtns ? (
				<div className='flex justify-between items-center mt-5'>
					<button
						onClick={() => history.push(`/post/update/${post._id}`)}
						type='submit'
						// disabled={}
						className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'>
						Update
					</button>
					<button
						onClick={() => handleDeletePost(post._id)}
						type='submit'
						// disabled={}
						className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
						Delete
					</button>
				</div>
			) : null}
		</div>
	);
}

export default PostCard;
