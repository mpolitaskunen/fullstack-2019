import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
    title: 'This is a test title',
    author: 'Author-field',
    url: 'The url',
    likes: 69,
    user: {
        username: 'Matti',
        name: 'Matti'
    }
}

const user = {
    username: 'Matti'
}

test('Content rendering', () => {
    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'This is a test title',
        'Author-field'
    )
    expect(component.container).not.toHaveTextContent(
        'The url'
    )
})

test('Test that the blog frame opens up correctly', async () => {
    let component

    component = render(
        <Blog blog={blog} user={user} />
    )

    expect(component.container).toHaveTextContent(
        'This is a test title',
        'Author-field'
    )
    expect(component.container).not.toHaveTextContent(
        'The url'
    )

    const dev = component.container.querySelector('.shortform')
    fireEvent.click(dev)

    expect(component.container).toHaveTextContent(
        'This is a test title',
        'Author-field',
        'The url',
        'Likes:',
        '69',
        'Entry owner:',
        'Matti'
    )
})