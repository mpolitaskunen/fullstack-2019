const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

// Let's remove that deprecation message disabling this
mongoose.set('useFindAndModify', false)

// Connect to the database...
mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

// Let's use the mongoose-unique-validator..
const unique = require('mongoose-unique-validator')

// Define the schema and parameters for the entries
const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})

// And some parameters when reading and writing with JSON
entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

entrySchema.plugin(unique, { message: 'Error, name should be unique' })
module.exports = mongoose.model('Entry', entrySchema)