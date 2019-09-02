// External imports here
import React from 'react'
import { connect } from 'react-redux'

// Components here...


// Reducers here...
import { getBlogs, addLike, deleteBlog  } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogPage = ({ getBlogs, setNotification, blogs, id, addLike, user }) => {
    // If the blogs state store is emptry, get blogs
    if(blogs.length === 0) {
        getBlogs()
    }

    // Create the blog variable, find the correct entry from the Blogs state store
    const blog = blogs.find(entry => entry.id === id)

    // Check if the blogs is empty...
    if (blog === undefined) {
        return null
    }

    // Let's see what's inside the blog...
    console.log('Inside BlogPage.js, the blog contents...')
    console.log(blog)

    // Let's handle adding likes...
    const handleLike = async (event) => {
        event.preventDefault()

        try {
            blog.likes += 1
            await addLike(blog)

            const successNotification = {
                message: `Added a like to ${blog.title}`,
                mtype: 'event'
            }

            setNotification(successNotification)
        } catch(error) {
            const failureNotification = {
                message: error,
                mtype: 'error'
            }

            setNotification(failureNotification)
        }
    }

    // Handle the deletion/removal of items...
    const handleDelete = async (event) => {
        event.preventDefault()

        const entryId = blog.id

        try {
            if(window.confirm(`Are you sure you want to remove: ${blog.title} by ${blog.author}`)) {
                deleteBlog(entryId)

                const successNotification = {
                    message: `Removed entry: ${blog.title} by ${blog.author}`,
                    mtype: 'event'
                }

                setNotification(successNotification)
            }

        } catch(error) {
            const failureNotification = {
                message: error,
                mtype: 'error'
            }
            setNotification(failureNotification)
        }
    }

    const showComments = () => {
        if(blog.comments.length === 0) {
            return (
                <div>
                </div>
            )
        }

        return (
            <div>
                <h3>Comments: </h3>
                <ul>
                    {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
                </ul>
            </div>
        )
    }

    // If the entry has a creator/owner/user assigned to it, show it, otherwise show Unknown
    const entryOwner = () => {
        if (blog.hasOwnProperty('user')) {
            return blog.user.name
        }
        return ('Unknown')
    }

    const deleteButton = () => {
        if (blog.user.username === user.username) {
            return <><button onClick={handleDelete}>Delete</button></>
        }
        return null
    }

    return(
        <div>
            <h2>{blog.title}</h2>
            Address: <a href={blog.url}>{blog.url}</a><br/>
            The Blog has {blog.likes} likes <button onClick={handleLike}>Like</button> <br/>
            Blog entry added by {entryOwner()}
            {deleteButton()}
            {showComments()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    blogs: state.blogs,
    user: state.user
})

const mapDispatchToProps = ({
    getBlogs,
    addLike,
    deleteBlog,
    setNotification
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)