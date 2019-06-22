import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import App from './App'

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
        const component = render(
            <App />
        )

        component.rerender(<App />)

        await waitForElement(
            () => component.container.querySelector('.blog')
        )

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(3)

        expect(component.container).toHaveTextContent( 'Title' )
    })
})