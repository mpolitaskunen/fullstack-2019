const bloglistRouter = require('express').Router()
const Entry = require('../models/entry')

bloglistRouter.get('/', (req, res) => {
    Entry.find({}).then(entries => {
        res.json(entries.map(entry => entry.toJSON()))
    })
})

bloglistRouter.get('/:id', (req,res,next) => {
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

bloglistRouter.post('/', (req, res,next) => {
    const body = req.body

    const entry = new Entry({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    entry
        .save()
        .then(savedEntry => {
            res.json(savedEntry.toJSON())
        })
        .catch(error => next(error))
})

bloglistRouter.delete('/:id', (req,res,next) => {
    Entry.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

bloglistRouter.put('/:id', (req,res,next) => {
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