const blogReducer = (state = [], action) => {
    switch(action.type){

    case 'NEW_BLOG':
        state.push(action.data)
        return state

    default:
        return state
    }

}

export default blogReducer