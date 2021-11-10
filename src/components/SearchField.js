import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchField = () => {
    const history = useHistory();
    const [searchText, setSearchText] = useState("");

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        history.push(`/search/${searchText}`);
    }
    return (
        <form onSubmit={handleSubmitSearch}>
            <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className=" p-2 block w-full sm:w-80 sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
        </form>
    )
}

export default SearchField
