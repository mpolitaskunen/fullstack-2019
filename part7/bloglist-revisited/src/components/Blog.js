// External imports here...
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    // Let's define the blogStyle box style
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    // And return the field to the origin
    return (
        <div style={blogStyle} className='blogEntry'>
            <b> Title: </b> <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <b> Author: </b> {blog.author}
        </div>
    )
}

export default Blog