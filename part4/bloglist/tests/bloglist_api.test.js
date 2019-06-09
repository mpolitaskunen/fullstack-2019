const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Entry = require('../models/entry')

const api = supertest(app)


// Before any tests begin, let's clear the database, then recreate it with out entries...
beforeAll(async () => {
    await Entry.deleteMany({})

    await helper.initialEntries.forEach(function (entries) {
        const object = new Entry(entries)
        object.save()
    })
})

// First basic tests..
describe('The basic entry tests..', () => {
    test('The Bloglist is returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('There are six(6) entries in the database..', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialEntries.length)
    })

    test('The entry titles contain Type wars', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(contents).toContain(
            'Type wars'
        )
    })
})

// Formatting tests
describe('Field formatting tests..', () => {
    test('Check if ID field is correct..', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body

        expect(contents[0].id).toBeDefined()
    })
})

// HTTP POST tests
describe('HTTP POST tests..', () => {
    test('Check if you can add a new entry', async () => {
        const newEntry = {
            title: 'This is a new Entry',
            author: 'Seppo Taskunen',
            url: 'https://google.fi',
            likes: 9999999
        }

        await api
            .post('/api/blogs')
            .send(newEntry)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body.length).toBe(helper.initialEntries.length + 1)
        expect(contents).toContain(
            'This is a new Entry'
        )
    })

    test('Check that likes gets 0 if it\'s not supplied', async () => {
        const newEntry = {
            title: 'This an entry for the Likes = 0 test',
            author: 'Seppo Taskunen',
            url: 'https://high.fi'
        }

        await api
            .post('/api/blogs')
            .send(newEntry)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(function (r) {
            return { title: r.title, likes: r.likes }
        })
        expect(contents[contents.length - 1].likes).toBeDefined()
    })

    test('Check that HTTP POST without title or URL fields fails...', async () => {
        const newEntry = {
            author: 'Seppo Taskunen'
        }

        await api
            .post('/api/blogs')
            .send(newEntry)
            .expect(400)
    })
})

describe('Deletion tests..', () => {
    test('Deletion succeeds if ID is valid', async () => {
        const entriesAtStart = await helper.entriesInDb()
        const entryToDelete = entriesAtStart[0]

        await api
            .delete(`/api/blogs/${entryToDelete.id}`)
            .expect(204)

        const entriesAtEnd = await helper.entriesInDb()

        expect(entriesAtEnd.length).toBe(
            entriesAtStart.length - 1
        )

        const contents = entriesAtEnd.map(r => r.title)

        expect(contents).not.toContain(entryToDelete.title)
    })
})

describe('Update tests..', () => {
    test('Test updating the like field', async () => {
        const entriesAtStart = await helper.entriesInDb()
        const updatedEntry = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 57000,
        }

        const entryToBeUpdated = entriesAtStart[4]

        await api
            .put(`/api/blogs/${entryToBeUpdated.id}`)
            .send(updatedEntry)
            .expect(200)

        const theUpdate = await api
            .get(`/api/blogs/${entryToBeUpdated.id}`)
            .expect(200)

        expect(theUpdate.body.likes).toBe(57000)
    })
})

// Close connections after the tests have ended
afterAll(() => {
    mongoose.connection.close()
})