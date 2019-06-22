import '@testing-library/react/cleanup-after-each'
import 'jest-dom/extend-expect'
jest.mock('./services/blogs')

const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})