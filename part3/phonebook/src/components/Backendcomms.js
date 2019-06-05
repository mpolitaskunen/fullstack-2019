import axios from 'axios'

const address = 'http://localhost:3001/api/persons'

// Define the get everything function...
const getAll = () => {
    const request = axios.get(address)
    return request.then(response => response.data)
}

// Define the add/create function...
const create = newObject => {
    const request = axios.post(address, newObject)
    return request.then(response => response.data)
}

// Define the update function...
const update = (id, newObject) => {
    const request = axios.put(`${address}/${id}`, newObject)
    return request.then(response => response.data)
}

// And define finally the removal/delete.
const removeEntry = id => {
    const request = axios.delete(`${address}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, removeEntry }