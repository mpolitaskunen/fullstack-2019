const mongoose = require('mongoose')

// Read the password from the command-line variables
const password = process.argv[2]
// Read the phonebook entry's name from the variables
const name = process.argv[3]
// And read the phonebook entry's number from the variables
const number = process.argv[4]

// Let's define the URL for the mongoDB connection, including the variable for password...
const url = `mongodb+srv://phonebookapp:${password}@cluster0-idyxk.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model('Entry', phonebookSchema)

const entry = new Entry({
    name: `${name}`,
    number: `${number}`,
})


// Main conditional for the program... If only password supplied, display entries inside
// the MongoDB... If name and number is supplied too, add the entry to the phonebook...
// and if the entry count doesn't match, display a message.
if (process.argv.length === 3) {
    Entry.find({}).then(result => {
        console.log('Phonebook: ')
        result.forEach(entry => {
            console.log([entry.name,entry.number].join(' '))
        })
        mongoose.connection.close
        process.exit(1)
    })
} else if(process.argv.length === 5) {
    entry.save().then(response => {
        console.log(`Added entry with the name ${name} and number ${number} to the Phonebook`)
        mongoose.connection.close()
        process.exit(1)
    })
} else if( process.argv.length < 5 ) {
    console.log('Give the password, name and number as an arguments, in that order')
    process.exit(1)
}


