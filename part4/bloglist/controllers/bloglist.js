const bloglistRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

bloglistRouter.get('/', async (req, res) => {
    const entries = await Entry
        .find({})
        .populate('user', { username: 1, name: 1 })

    res.json(entries.map(entry => entry.toJSON()))
})

bloglistRouter.get('/:id', async (req,res,next) => {
    Entry.findById(req.params.id)
        .then(entry => {
            if (entry) {
                res.json(entry.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

bloglistRouter.post('/', async (req, res,next) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if(!req.token ||!decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const entry = new Entry({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedEntry = await entry.save()
        user.entries = user.entries.concat(savedEntry._id)
        await user.save()
        res.json(savedEntry.toJSON())
    } catch(exception) {
        next(exception)
    }
})

bloglistRouter.delete('/:id', async (req,res,next) => {
    try{
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        console.log('The token is...', req.token)
        console.log('The Decoded token is...', decodedToken)

        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing' })
        }

        const user = await User.findById(decodedToken.id)
        const entry = await Entry.findById(req.params.id)

        if (entry === undefined || entry === null) {
            return res.status(400).json({ error: 'Invalid entry ID' })
        }

        try{
            if (entry.user.toString() === user.id) {
                Entry.findByIdAndDelete(req.params.id)
                res.status(204).end()
            }
        } catch (exception) {
            next(exception)
        }
    } catch(exception) {
        next(exception)
    }
})

bloglistRouter.put('/:id', async (req,res,next) => {
    const body = req.body

    const entry = {
        title: body.title,
        author: body.author,
        likes:body.likes
    }

    Entry.findByIdAndUpdate(req.params.id, entry, { new: true })
        .then(updatedEntry => {
            res.json(updatedEntry.toJSON())
        })
        .catch(error => next(error))
})

module.exports = bloglistRouter