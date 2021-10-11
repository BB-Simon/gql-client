import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import CreatePostForm from "../../components/forms/CreatePostForm.jsx";
import { CREATE_POST } from "../../graphql/mutations";

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
		// update cache
		update: (data) => console.log("u data", data),
		onError: (err) => console.error(err),
	});

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
			<CreatePostForm
				handleOnSubmit={handleOnSubmit}
				handleOnChange={handleOnChange}
				values={values}
				loading={loading}
				setLoading={setLoading}
				setValues={setValues}
				singleUpload={true}
			/>
		</div>
	);
}

export default Post;
