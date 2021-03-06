import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('Renders its children', () => {
        component.container.querySelector('.testDiv')
    })

    test('At start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('After clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('The toggled content can be closed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const closeButton = component.getByText('Cancel')
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

})