import React, { useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { resizeFile } from "../utils/resizeFile";
import { unifyArray } from "../utils/unifyArray";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function UploadImage({
	setLoading,
	setValues,
	values,
	loading,
	singleUpload = false,
}) {
	const { state } = useContext(AuthContext);
	const handleImageResizAndUpload = async (e) => {
		const file = e.target.files[0];
		try {
			setLoading(true);
			const image = await resizeFile(file);
			const res = await axios.post(
				`${process.env.REACT_APP_REST_API}/uploadimage`,
				{ image },
				{
					headers: {
						authtoken: state.user.token,
					},
				}
			);

			// setValues to parent component based on either it is
			// used for single/multiple image upload
			if (singleUpload) {
				setValues({ ...values, image: res.data });
			} else {
				setValues({ ...values, images: [...values.images, res.data] });
			}

			toast.success("Image Uploaded!");
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const handleRemoveImage = async (public_id) => {
		try {
			setLoading(true);
			await axios.post(
				`${process.env.REACT_APP_REST_API}/removeimage`,
				{ public_id },
				{
					headers: {
						authtoken: state.user.token,
					},
				}
			);

			// setValues to parent component based on either it is
			// used for single/multiple image upload
			if (singleUpload) {
				setValues({
					...values,
					image: {
						url: "https://via.placeholder.com/200x200.png?text=Post",
						public_id: "123",
					},
				});
			} else {
				const filteredImages = values.images.filter(
					(item) => item.public_id !== public_id
				);
				setValues({ ...values, images: filteredImages });
			}

			toast.success("Image Removed!");
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<div>
			<div className='block text-sm font-medium text-gray-700'>
				Profile Image
			</div>
			<label className='mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent border-dashed'>
				Upload your profile pic here...!
				<input
					hidden
					type='file'
					onChange={handleImageResizAndUpload}
					disabled={loading}
					accept='image/*'
				/>
			</label>
			{singleUpload && (
				<>
					{values?.image ? (
						<div className='w-20 h-20 pr-2 relative mt-5'>
							<img src={values.image.url} alt='' />
							<AiFillCloseCircle
								onClick={() => handleRemoveImage(values.image.public_id)}
								className='text-white bg-red-400 rounded-full absolute -top-2 right-1 cursor-pointer'
							/>
						</div>
					) : null}
				</>
			)}

			{values?.images ? (
				<div className='py-5 flex overflow-hidden'>
					{unifyArray(values.images).map(({ url, public_id }) => (
						<div key={public_id} className='w-20 h-20 pr-2 relative'>
							<img src={url} alt='' />
							<AiFillCloseCircle
								onClick={() => handleRemoveImage(public_id)}
								className='text-white bg-red-400 rounded-full absolute -top-2 right-1 cursor-pointer'
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default UploadImage;
