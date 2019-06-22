import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

let savedItems = {}

const user = {
    username: 'Testi',
    password: 'salasana',
    name: 'Testaaja',
    token: '1234'
}

const localStorageMock = {
    setItem: (key, item) => { savedItems[key] = item },
    getItem: (key) => savedItems[key],
    clear: savedItems = {}
}

describe('<App />', () => {
    test('If no user logged in, the blogs are not rendered', async () => {
        const component = render(
            <App />
        )

        component.rerender(<App />)

        await waitForElement(
            () => component.getAllByText('Bloglist')
        )

        // expectations here
        expect(component.container).not.toHaveTextContent( 'Title' )
    })

    test('If user logged in, the blogs are rendered', async () => {
        localStorageMock.setItem('loggedBloglistappUser', JSON.stringify(user))

        Object.defineProperty(window, 'localStorage', { value: localStorageMock })

        let component = render(
            <App />
        )

        component.rerender(<App />)

        await waitForElement(
            () => component.container.querySelector('.blogEntry')
        )

        const blogs = component.container.querySelectorAll('.blogEntry')
        expect(blogs.length).toBe(3)

        expect(component.container).toHaveTextContent( 'HTML is easy' )
        expect(component.container).toHaveTextContent( 'Browser can execute only javascript' )
        expect(component.container).toHaveTextContent( 'The most important methods of HTTP are GET and POST')
    })
})