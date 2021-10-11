import React from "react";
import UploadImage from "../UploadImage";

function CreatePostForm({
	values,
	loading,
	setValues,
	setLoading,
	handleOnSubmit,
	handleOnChange,
	singleUpload,
}) {
	return (
		<form
			onSubmit={handleOnSubmit}
			className='shadow overflow-hidden sm:rounded-md'>
			<h1 className='p-6 text-2xl font-bold'>
				{loading ? "Loading...!" : "Create New Post"}
			</h1>
			<div className='px-6 pb-6'>
				<UploadImage
					values={values}
					loading={loading}
					setLoading={setLoading}
					setValues={setValues}
					singleUpload={singleUpload}
				/>
			</div>
			<div className='px-6 pb-6'>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700 pb-2'>
					Post Content
				</label>
				<textarea
					name='content'
					rows={8}
					disabled={loading}
					onChange={handleOnChange}
					value={values.content}
					className='border rounded-md mt-1 p-2 block w-full sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent '
					placeholder='Post conetent gose here...!'
				/>
			</div>
			<div className='px-4 py-3 bg-gray-50 sm:px-6'>
				<button
					type='submit'
					disabled={loading}
					className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					Create
				</button>
			</div>
		</form>
	);
}

export default CreatePostForm;
