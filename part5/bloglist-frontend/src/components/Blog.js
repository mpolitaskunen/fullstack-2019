import React from 'react'

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div onClick={() => console.log('clicked')}>
                <div>Title: {blog.title}</div>
                <div>Author: {blog.author}</div>
            </div>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                Likes: {blog.likes}
            </div>

        </div>
    )
}

export default Blog

// <div>
// Added by: {blog.user}
// </div>