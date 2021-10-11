import React from "react";

function PostCard({ post }) {
	return (
		<div className='border border-blue-500 p-5'>
			<div>
				<img src={post.image.url} alt='' />
			</div>
			<div>
				<p>Posted By: {post?.postedBy.username}</p>
			</div>
			<div>
				<p>{post.content}</p>
			</div>
		</div>
	);
}

export default PostCard;
