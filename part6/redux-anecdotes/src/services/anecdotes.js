import axios from 'axios'

const baseUrl = 'http://localhost:3005/api/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async content => {
    const object = {
        content: content,
        votes: 0
    }

    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async content => {
    const response = await axios.put(`${baseUrl}/${content.id}`,{ ...content, votes: content.votes + 1 })
    return response.data
}

export default { getAll, createNew, vote }