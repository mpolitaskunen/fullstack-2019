const Entry = require('../models/entry')

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

const nonExistingId = async () => {
    const entry = new Entry({
        title: 'Test-case for nonexistingid',
        author: 'Seppo Taskunen',
        url: 'non validated string',
        likes: 9959512
    })

    await entry.save()
    await entry.remove()

    return entry._id.toString()
}

const entriesInDb = async () => {
    const entries = await Entry.find({})
    return entries.map(entry => entry.toJSON())
}

module.exports = {
    entriesInDb,
    nonExistingId,
    initialEntries
}