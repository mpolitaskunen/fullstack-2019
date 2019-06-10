import React from 'react'

// The form for creating a blog entry
const BlogForm = ({ onSubmit, handleAuthorChange, handleTitleChange, handleUrlChange, author, title, url }) => {
    return (
        <div>
            <h2>Create a new Blog entry</h2>

            <form onSubmit={onSubmit}>
                <p>Author: <input value={author} onChange={handleAuthorChange} /></p>
                <p>Title: <input value={title} onChange={handleTitleChange} /></p>
                <p>URL: <input value={url} onChange={handleUrlChange} /></p>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default BlogForm