import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { SINGLE_POST } from "../../graphql/queries";

function SinglePost() {
	const { postid } = useParams();
	const [values, setValues] = useState({
		content: "",
		image: {
			url: "",
			public_id: "",
		},
		postedBy: {},
	});

	// query
	const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);

	useMemo(() => {
		if (singlePost) {
			setValues({
				...values,
				_id: singlePost.singlePost._id,
				content: singlePost.singlePost.content,
				postedBy: singlePost.singlePost.postedBy,
				image: {
					url: singlePost.singlePost.image.url,
					public_id: singlePost.singlePost.image.public_id,
				},
			});
		}
	}, [singlePost]);

	useEffect(() => {
		getSinglePost({
			variables: { postId: postid },
		});
	}, []);

	return (
		<div className='m-10'>
			<div className='flex justify-center items-center'>
				<img src={values.image.url} alt='' />
				<p>{values.postedBy.username}</p>
				<p>{values.content}</p>
			</div>
		</div>
	);
}

export default SinglePost;
