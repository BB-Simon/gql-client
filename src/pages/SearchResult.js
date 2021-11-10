import { useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { SEARCH } from '../graphql/queries';

function SearchResult() {
    const {query} = useParams();

    const {data, loading} = useQuery(SEARCH, {
        variables: {query}
    });

    if(loading) {
        return (
            <div>
                <p>Loadding...</p>
            </div>
        )
    }

    
    return (
        <div>
            {!data.search.length ? (
                <div>No Result found!</div>
            ): (
                <div className='grid grid-cols-3 gap-4 p-10'>
				{data.search.map((post, index) => <PostCard key={index} post={post} />)}
			</div>
            )} 
        </div>
    )
}

export default SearchResult
