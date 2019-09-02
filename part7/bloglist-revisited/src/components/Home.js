// Imported external libraries here
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// Used components here
import BlogForm from './BlogForm'
import Blogs from './Blogs'


// Reducers needed under here...
import { getBlogs } from '../reducers/blogReducer'

const Home = ({ blogs, user, getBlogs }) => {
    // Let's get the blogs using the blogReducer
    // and users using the userReducer
    useEffect(() => {
        // If the user store is empty, return nothing, as the user is not logged in
        if(user !== null) {
            getBlogs()
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <br />
            {user !== null
                ? <div><BlogForm className='blogForm' /></div>
                : <div></div>}
            {user !== null
                ? <Blogs className='blogList'/>
                : <div></div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    blogs: state.blogs,
    user: state.user
})

const mapDispatchToProps = ({
    getBlogs
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)