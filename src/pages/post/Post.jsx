import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import PostForm from "../../components/forms/PostForm.jsx";
import { CREATE_POST, DELETE_POST } from "../../graphql/mutations";
import { POSTS_BY_USER } from "../../graphql/queries";
import PostCard from "../../components/PostCard.jsx";

function Post() {
	const [values, setValues] = useState({
		content: "",
		image: {
			url: "https://via.placeholder.com/200x200.png?text=Post",
			public_id: "123",
		},
	});
	const [loading, setLoading] = useState(false);

	// mutation
	const [createPost] = useMutation(CREATE_POST, {
		// read query from cache/ write query to cache
		update: (cache, { data: { createPost } }) => {
			// read Query from cache
			const { postsByUser } = cache.readQuery({
				query: POSTS_BY_USER,
			});
			// write query to cahce
			cache.writeQuery({
				query: POSTS_BY_USER,
				data: {
					postsByUser: [createPost, ...postsByUser],
				},
			});
		},
		onError: (err) => toast.error(err.graphQLErrors[0].message),
	});

	const [deletePost] = useMutation(DELETE_POST, {
		update: ({ data }) => {
			toast.error("Post deleted!");
		},
		onError: (err) => {
			console.log(err);
			toast.error(err.graphQLErrors[0].message);
		},
	});

	// query
	const { data: posts } = useQuery(POSTS_BY_USER);

	const handleDeletePost = async (postId) => {
		setLoading(true);
		deletePost({
			variables: { postId },
			refetchQueries: [{ query: POSTS_BY_USER }],
		});
		setLoading(false);
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		createPost({ variables: { input: values } });
		setValues({
			content: "",
			image: {
				url: "https://via.placeholder.com/200x200.png?text=Post",
				public_id: "123",
			},
		});
		setLoading(false);
		toast.success("Post created!");
	};

	const handleOnChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div className='m-10'>
			<PostForm
				title='Create New Post'
				btnTitle='Create'
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
					{posts &&
						posts.postsByUser.map((post, index) => (
							<PostCard
								key={index}
								post={post}
								handleDeletePost={handleDeletePost}
								showUpdateAndDeleteBtns={true}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default Post;
