import '@testing-library/react/cleanup-after-each'
import 'jest-dom/extend-expect'
jest.mock('./services/blogs')

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: savedItems = {}

}

const user = {
    username: 'Testi',
    password: 'salasana',
    name: 'Testaaja'
}

const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
})

afterAll(() => {
    console.error = originalError
})

window.localStorage = localStorageMock