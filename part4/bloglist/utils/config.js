require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let MONGODB_USERURI = process.env.MONGODB_USERURI

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
    MONGODB_USERURI = process.env.TEST_MONGODB_USERURI
}

module.exports = {
    MONGODB_URI,
    MONGODB_USERURI,
    PORT
}