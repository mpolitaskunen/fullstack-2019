import axios from 'axios'
const baseUrl = '/api/blogs'

let user = null
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const setUser = newUser => {
    user = newUser
    setToken(user.token)
}

const create = async newObject => {
    const config= {
        headers: { Authorization: token },
    }

    newObject.user = user.id

    const response = await axios.post(baseUrl, newObject, config)
    response.data.user = { 'username': user.username, 'name': user.name, 'id': user.id }
    return response.data
}

const like = async (props) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(baseUrl.concat(`/${props.entryId}`), props.blog, config)
    return response.data
}

export default { getAll, create, setUser, setToken, like }