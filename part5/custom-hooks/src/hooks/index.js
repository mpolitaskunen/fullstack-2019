import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
        setValue(event.target.value)
    }
  
    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [token, setToken] = useState('')
    const [resources, setResources] = useState([])

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        console.log(response.data)
        setResources(response.data)
    }

    const setAll = (newResource) => {
        setResources(newResource)
    }

    const header = () => {
        return {
            headers: { Authorization: token }
        }
    }

    const authenticate = (newToken) => {
        setToken(`bearer ${newToken}`)
    }

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource, header())
        return response.data
    }

    const update = async (note, id) => {
        const response = await axios.put(`${baseUrl}/${id}`, note, header())
        return response.data
    }

    const remove = async (id) => {
        const response = await axios.delete(`${baseUrl}/${id}`, header())
        return response.status === 204
    }

    return [
        resources, {
            setAll,
            getAll,
            authenticate,
            create,
            update,
            delete: remove
        }
    ]
}