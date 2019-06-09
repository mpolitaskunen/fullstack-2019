const bloglistRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')

bloglistRouter.get('/', async (req, res) => {
    Entry.find({}).then(entries => {
        res.json(entries.map(entry => entry.toJSON()))
    })
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

    const user = await User.findById(body.userId)

    const entry = new Entry({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        userId: user._id
    })

    try {
        const savedEntry = await entry.save()
        user.entries = user.entries.concat(savedEntry._id)
        await user.save()
        res.json(savedEntry.toJSON())
    } catch(exception) {
        next(exception)
    }
})

bloglistRouter.delete('/:id', async (req,res,next) => {
    Entry.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
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