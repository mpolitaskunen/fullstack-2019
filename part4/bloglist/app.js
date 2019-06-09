const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bloglistRouter = require('./controllers/bloglist')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('Connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

// app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', bloglistRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app