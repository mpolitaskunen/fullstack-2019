const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)