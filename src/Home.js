import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const POSTS_PER_PAGE = 4

const Home = ({ data: { loading, error, posts, postsConnection, networkStatus }, loadMorePosts }) => {
    if (error) return <h1>Error fetching posts!</h1>
    if (posts && postsConnection) {
      const areMorePosts = posts.length < postsConnection.aggregate.count
      return (
        <section>
          <ul className='Home-ul'>
            {posts.map(post => (
              <li className='Home-li' key={`post-${post.id}`}>
                <Link to={`/post/${post.id}`} className='Home-link'>
                  <div className='Home-placeholder'>
                    <img
                      alt={post.title}
                      className='Home-img'
                      src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${post.coverImage.handle}`}
                    />
                  </div>
                  <h3>{post.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
          <div className='Home-showMoreWrapper'>
            {areMorePosts
              ? <button className='Home-button' disabled={loading} onClick={() => loadMorePosts()}>
                {loading ? 'Loading...' : 'Show More Posts'}
              </button>
              : ''}
          </div>
        </section>
      )
    }
    return <h2>Loading posts...</h2>
  }