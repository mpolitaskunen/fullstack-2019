import blogService from '../services/blogs'

export const getBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'GET_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (data) => {
    return async dispatch => {
        const newBlog = await blogService.create(data)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        await blogService.like(blog)
        dispatch({
            type: 'LIKE',
            blog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE',
            data: { id }
        })
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type){

    case 'ADD_BLOG': {
        return state.concat(action.data)
    }

    case 'LIKE': {
        const blogId = action.blog.id
        const likedBlog = state.find(blog => blog.id === blogId)
        const editedBlog = { ...likedBlog, likes: likedBlog.likes }
        return state.map(blog => blog.id !== blogId ? blog : editedBlog)
    }

    case 'DELETE': {
        // The original return of data, that removes...
        //return state.map(blog => blog.id !== action.data.id ? blog: null)
        // The filtered way
        return state.filter(blog => blog.id !== action.data.id)
    }

    case 'GET_BLOGS': {
        return action.data
    }

    default: {
        return state
    }
    }

}

export default blogReducer