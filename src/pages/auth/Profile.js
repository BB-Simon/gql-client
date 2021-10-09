import React, {useState, useMemo} from 'react';
import {toast} from 'react-toastify';
import {useQuery, useMutation} from '@apollo/client';
import {PROFILE} from '../../graphql/queries'
import {UPDATE_PROFILE} from '../../graphql/mutations'

function Profile() {
    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
        about: "",
        images: []
    }); 
    const [loading, setLoading] = useState(false);

    const {data} = useQuery(PROFILE);

    useMemo(() => {
        if(data){
            setValues({
                ...values,
                username: data.profile.username,
                name: data.profile.name,
                email: data.profile.email,
                about: data.profile.about,
                images: [...values.images, {url: data.profile.images[0].url, public_id: data.profile.images[0].public_id}]
            })
        }
    },[data])
    console.log(values);

    // profile update mutattion
    const [updateUser] = useMutation(UPDATE_PROFILE, {
        update: ({data}) =>{
            console.log('profile update response', data);
            toast.success('Profile updated!')
        }
    })

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateUser({variables: {input: values}});
        setLoading(false);
    };
    
    const handleOnChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleImageUpload = () =>{
        // 
    }
    
    const profileUpdateForm = () => (
        <form onSubmit={handleOnSubmit} className="shadow overflow-hidden sm:rounded-md">
            <h1 className="p-6 text-2xl font-bold">Update Your Profile</h1>
            <div className="px-6 pb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    onChange={handleOnChange}
                    disabled
                    value={values.email}
                    className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
            </div>
            <div className="px-6 pb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    User Name
                </label>
                <input
                    type="text"
                    name="username"
                    onChange={handleOnChange}
                    disabled={loading}
                    value={values.username}
                    className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
            </div>
            <div className="px-6 pb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    name="name"
                    type="text"
                    onChange={handleOnChange}
                    disabled={loading}
                    value={values.name}
                    className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
            </div>
            <div className="px-6 pb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Profile image
                </label>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="mt-1 p-2 block w-full sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
            </div>
            <div className="px-6 pb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    About
                </label>
                <textarea
                    name="about"
                    rows={5}
                    disabled={loading}
                    onChange={handleOnChange}
                    value={values.about}
                    className="border rounded-md mt-1 p-2 block w-full sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent "
                    placeholder="About you...!"
                />
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:px-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    )
    return (
        <div className="m-10">
            {profileUpdateForm()}
        </div>
    )
}

export default Profile
