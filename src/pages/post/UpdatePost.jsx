import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useLazyQuery } from "@apollo/client";
import PostForm from "../../components/forms/PostForm.jsx";
import { UPDATE_POST } from "../../graphql/mutations";
import { SINGLE_POST } from "../../graphql/queries";
import PostCard from "../../components/PostCard.jsx";

function UpdatePost() {
	const { postid } = useParams();
	const [values, setValues] = useState({
		content: "",
		image: {
			url: "",
			public_id: "",
		},
	});
	const [loading, setLoading] = useState(false);

	// query
	const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);
	// mutation
	const [updatePost] = useMutation(UPDATE_POST);

	useMemo(() => {
		if (singlePost) {
			setValues({
				...values,
				_id: singlePost.singlePost._id,
				content: singlePost.singlePost.content,
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

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		updatePost({ variables: { input: values } });
		setLoading(false);
		toast.success("Post Updated!");
	};

	const handleOnChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div className='m-10'>
			<PostForm
				title='Edit Post'
				btnTitle='Update'
				handleOnSubmit={handleOnSubmit}
				handleOnChange={handleOnChange}
				values={values}
				loading={loading}
				setLoading={setLoading}
				setValues={setValues}
				singleUpload={true}
			/>
			<div className='my-16'>
				<div className='grid grid-cols-4 gap-4'>
					{/* {posts &&
						posts.postsByUser.map((post, index) => (
							<PostCard
								key={index}
								post={post}
								handleDeletePost={handleDeletePost}
								showUpdateAndDeleteBtns={true}
							/>
						))} */}
				</div>
			</div>
		</div>
	);
}

export default UpdatePost;
