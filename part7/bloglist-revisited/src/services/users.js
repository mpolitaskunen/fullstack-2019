import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
    const users = await axios.get(baseUrl)
    // Note to self, always return just the data portion
    // of the request!
    return users.data
}

export default { getAll }