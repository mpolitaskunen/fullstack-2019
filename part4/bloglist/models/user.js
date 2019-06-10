const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    name: String,
    passwordHash: {
        type: String,
    },
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        // Filter passwordHash out, so it's never displayed
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)