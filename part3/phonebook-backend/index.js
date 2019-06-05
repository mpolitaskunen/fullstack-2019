require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Entry = require('./models/entry')

app.use(bodyParser.json())
app.use(express.static('build'))


// Generate ID function, not needed anymore?
const generateId = () => {
    const randomId = Math.floor(Math.random() * Math.floor(4294967294))

    return randomId
}

// Let's define a custom entry for Morgan in the POST method and Tiny-lookalike for the rest
app.use(morgan(function(tokens,req,res) {
    if (tokens.method(req,res) === 'POST') {
        return [
            tokens.method(req,res),
            tokens.url(req,res),
            tokens.status(req,res),
            tokens.res(req,res, 'content-length'), '-',
            tokens['response-time'](req,res), 'ms',
            tokens['data'](req,res)
        ].join(' ')
    } else {
        return [
            tokens.method(req,res),
            tokens.url(req,res),
            tokens.status(req,res),
            tokens.res(req,res, 'content-length'), '-',
            tokens['response-time'](req,res),'ms'
        ].join(' ')
    }
}))

// And let's define the 'data' tokentype for Morgan's use
morgan.token('data', (req) => {
    reqData = JSON.stringify(req.body)
    return `${reqData}`
})

// Remove an entry via its id
app.delete('/api/persons/:id', (req, res, next) => {
    Entry.findByIdAndRemove(req.params.id)
        .then(entry => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// List all the persons...
app.get('/api/persons', (req, res) => {
    Entry.find({}).then(entries => {
        res.json(entries.map(entry => entry.toJSON()))
    })
})

app.get('/info', (req, res) => {
    // Let's count the entries inside the database, then output information, giving a nice timecode too
    Entry
        .find({})
        .then(entries => res.send(`<p>This phonebook has information for ${entries.length} people</p>${new Date()}`))
        .catch(error => next(error))    
})

// Let's give you a nice Hello World if you end up in the root of the backend..
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</H1>')
})

// Let's get a person by the entry id
app.get('/api/persons/:id', (req, res, next) => {
    Entry.findById(req.params.id)
        .then(entry => {
            if(entry) {
                res.json(entry.toJSON())
            } else {
                res.status(204).end()
            }
        })
        .catch(error => next(error))
})

// Let's add a new person
app.post('/api/persons', (req, res, next) => {
    // Let's create a variable from the request...
    const body = req.body

    // Define the phonebook entry format, generate it from the request body, add and generate id
    const entry = new Entry({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    // Let's save this...
    entry
        .save()
        .then(saved => saved.toJSON())
        .then(savedAndFormatted => {
            res.json(savedAndFormatted)
        })
        .catch(error => next(error))
})

// The entry update method
app.put('/api/persons/:id', (req,res,next) => {
    const body = req.body

    const entry = {
        name: body.name,
        number: body.number,
    }

    Entry
        .findByIdAndUpdate(req.params.id, entry, { new: true })
        .then(updatedEntry => updatedEntry.toJSON())
        .then(updatedAndFormatted => {
            res.json(updatedAndFormatted)
        })
        .catch(error => next(error))
})

// The error handler
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message})
    }

    next(error)
}

// The Unknown Endpoint handler
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})