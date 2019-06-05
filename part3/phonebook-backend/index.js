const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = 3001

const generateId = () => {
    const randomId = Math.floor(Math.random() * Math.floor(4294967294))

    return randomId
}

app.use(bodyParser.json())

let phonebook = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(entry => entry.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const koko = generateId()
    const date = new Date()

    res.send(`<p>This phonebook has information for ${koko} people</p>${date}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</H1>')
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
    // Let's define ID, and that it's a number
    const id = Number(req.params.id)

    // Find the ID from the notes...
    const entry = phonebook.find(entry => entry.id === id)

    // Reply the json of the note with the proper ID
    if (entry) {
        res.json(entry)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    // Let's create a variable from the request...
    const body = req.body

    // Let's check if the name is already in the database (pbName is -1 if it doesn't)
    const pbName = phonebook.findIndex((entry) => entry.name === body.name)

    // If there is no name, reply with HTTP 400 end JSON error of name missing
    // same with number and finally check if pbName is -1 (not found)...
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (pbName !== -1) {
        return res.status(400).json({
            error: 'The name already exists'
        })
    }


    // Define the phonebook entry format, generate it from the request body, add and generate id
    const entry = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    // Add the new note to the JSON array
    phonebook = phonebook.concat(entry)

    res.json(entry)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})