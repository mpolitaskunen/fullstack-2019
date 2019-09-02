const bloglistRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

bloglistRouter.get('/', async (req, res) => {
    const entries = await Entry
        .find({})
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { comment: 1 })

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

bloglistRouter.post('/', async (req,res,next) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if(!req.token ||!decodedToken.id) {
            return res.status(401).json({ error: 'The authorization token is missing' })
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
    } catch(error) {
        next(error)
    }
})

bloglistRouter.post('/:id/comments', async (req,res,next) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'The Authorization token is missing' })
        }

        const entry = await Entry.findById(req.params.id.trim())

        const comment = new Comment({
            comment: body.comment,
            entry: req.params.id.trim()
        })

        const savedComment = await comment.save()
        entry.comments = entry.comments.concat(savedComment._id)
        await entry.save()
        res.json(savedComment.toJSON())
    } catch(error) {
        next(error)
    }
})

bloglistRouter.delete('/:id', async (req,res,next) => {
    const body = req.body
    console.log(body)

    try{
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'The authorization token is missing' })
        }

        const user = await User.findById(decodedToken.id)
        const entry = await Entry.findById(req.params.id.trim())

        if (entry === undefined || entry === null) {
            return res.status(400).json({ error: 'Invalid entry ID' })
        }

        if (entry.user.toString() === user.id) {
            await Entry.findByIdAndRemove(req.params.id.trim())
            res.status(204).end()
        }
    } catch(error) {
        next(error)
    }
})

bloglistRouter.put('/:id', async (req,res,next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'The Authorization token is missing' })
    }

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