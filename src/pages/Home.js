import React,{ useEffect, useState, useContext } from 'react'
import {gql, useQuery, useLazyQuery} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/authContext'

function Home() {
    const [posts, setPosts] = useState([])
    const history = useHistory()


    // access context 
    const {state, dispatch} = useContext(AuthContext)


  const {loading, error, data} = useQuery(ALL_POSTS)

  const [fetchPost, {data: postData}] = useLazyQuery(ALL_POSTS)

  useEffect(() => {
    setPosts(data?.allPosts)
  }, [data])

  const updateUserName = () => {
      dispatch({
          type: "LOGGED_IN_USER",
          payload: "Simon Chowdery"
      })
  }

//   if(loading) return "Loading...";
//   if(error) return "Error:("

    return (
        <div>
            <div className="flex justify-content-start p-10">
                {posts && posts.map((post, index) => (
                    <div key={index} className="border p-5 m-5">
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                    </div>
                ))}
            </div>
            <div className="p-10">
                <button onClick={() => fetchPost()} className="py-2 px-5 bg-blue-600 text-white rounded">Load posts</button>
                    
                <div>
                    {JSON.stringify(postData)}
                </div>
                <div>
                    {JSON.stringify(state.user)}
                </div>
                <button onClick={updateUserName} className="py-2 px-5 bg-blue-600 text-white rounded">Update User Name</button>
            </div>    
        </div>
    )
}

const ALL_POSTS = gql `
  query {
    allPosts {
      id
      title
      description
    }
  }
`

export default Home

