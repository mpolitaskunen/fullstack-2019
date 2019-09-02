// External import here
import React from 'react'
import { connect } from 'react-redux'

// Components here
import Blog from './Blog'

// Reducers...
import { getBlogs } from '../reducers/blogReducer'

const Blogs = ({ blogs, getBlogs }) => {
    // Initialize blogs if there are no blogs
    if(blogs.length === 0) {
        getBlogs()
    }

    return(
        <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    blogs : state.blogs
})

const mapDispatchToProps = ({
    getBlogs
})

export default connect(mapStateToProps,mapDispatchToProps)(Blogs)