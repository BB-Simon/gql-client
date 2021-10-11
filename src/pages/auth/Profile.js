import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";

import { PROFILE } from "../../graphql/queries";
import { UPDATE_PROFILE } from "../../graphql/mutations";
import UserProfileForm from "../../components/forms/UserProfileForm";

function Profile() {
	const [values, setValues] = useState({
		username: "",
		name: "",
		email: "",
		about: "",
		images: [],
	});
	const [loading, setLoading] = useState(false);

	const { data } = useQuery(PROFILE);

	useMemo(() => {
		if (data) {
			let tempImages = [];
			data.profile.images.forEach((img) => {
				tempImages = [
					...tempImages,
					{
						url: img.url,
						public_id: img.public_id,
					},
				];
			});
			setValues({
				...values,
				username: data.profile.username,
				name: data.profile.name,
				email: data.profile.email,
				about: data.profile.about,
				images: [...values.images, ...tempImages],
			});
		}
	}, [data]);

	// profile update mutattion
	const [updateUser] = useMutation(UPDATE_PROFILE, {
		update: ({ data }) => {
			toast.success("Profile updated!");
		},
	});

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateUser({ variables: { input: values } });
		setLoading(false);
	};

	const handleOnChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div className='m-10'>
			<UserProfileForm
				handleOnSubmit={handleOnSubmit}
				handleOnChange={handleOnChange}
				values={values}
				loading={loading}
				setValues={setValues}
				setLoading={setLoading}
			/>
		</div>
	);
}

export default Profile;
