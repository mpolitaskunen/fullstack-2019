// External imports here
import React from 'react'
import { connect } from 'react-redux'

// Hooks here...
import { useField } from '../hooks'

// Reducers here...
import { getBlogs, addLike, deleteBlog, addComment  } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogPage = ({ getBlogs, setNotification, blogs, id, addLike, user, addComment }) => {
    // Define the field for commenting...
    const blogComment = useField('Comment')

    // If the blogs state store is empty, get blogs
    if(blogs.length === 0) {
        getBlogs()
    }

    // Create the blog variable, find the correct entry from the Blogs state store
    const blog = blogs.find(entry => entry.id === id)

    // Check if the blogs is empty...
    if (blog === undefined) {
        return null
    }

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

    // Add comment
    const commentBlog = async (event) => {
        event.preventDefault()

        try {
            // Create the object that gets forwarded to the blogService for commenting
            const commentObject = {
                comment: blogComment,
                id: blog.id
            }

            // Send data to the blogService addComment function
            await addComment(commentObject)

            // Define the success notification
            const successNotification = {
                message: `Added a comment to ${blog.title}`,
                mtype: 'event'
            }

            // Reset the comment field contents to empty
            blogComment.reset()

            // Send the success notification defined above
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
        return (
            <div>
                {blog.comments.length === 0
                    ? <div />
                    : <div><h3>Comments: </h3></div>}
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
            return <><button onClick={handleDelete}>Delete this entry</button></>
        }
        return null
    }

    return(
        <div>
            <h2>{blog.title}</h2>
            <p>Address: <a href={blog.url}>{blog.url}</a></p>
            <p>The Blog has {blog.likes} likes <button onClick={handleLike}>Like</button></p>
            <p>Blog entry added by {entryOwner()}</p>
            {deleteButton()}

            <br/>
            <br/>

            <form onSubmit={commentBlog}>
                <div>
                    Comment: <input {...blogComment.noReset()} />
                    <button type="submit">Add Comment</button>
                </div>
            </form>
            <br/>
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
    setNotification,
    addComment
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)