const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req,res) => {
    const users = await User.find({})
    res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        // Let's define how many salting rounds we're doing..
        const saltRounds = 10
        // Let's define the minimum length
        const minLength = 3
        try {
            if (body.username.lenght < minLength) {
                let err = new Error
                err.name = 'ValidationError'
                err.message = `Username has to be longer than ${minLength} characters`
                throw err
            }

            if (body.password.length < minLength) {
                let err = new Error
                err.name = 'ValidationError'
                err.message = `The password has to be longer than ${minLength} characters`
                throw err
            }
        } catch(err) {
            next(err)
        }

        const passwordHash = await bcryptjs.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        res.json(savedUser)
    }
    catch(exception) {
        next(exception)
    }
})

module.exports = usersRouter