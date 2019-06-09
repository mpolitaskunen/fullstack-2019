const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Entry = require('../models/entry')

const api = supertest(app)

// Let's create initial entries for the test database...
const initialEntries = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
]

// Before any tests begin, let's clear the database, then recreate it with out entries...
beforeAll(async () => {
    await Entry.deleteMany({})

    await initialEntries.forEach(function (entries) {
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

        expect(response.body.length).toBe(initialEntries.length)
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

        expect(response.body.length).toBe(initialEntries.length + 1)
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

// Close connections after the tests have ended
afterAll(() => {
    mongoose.connection.close()
})