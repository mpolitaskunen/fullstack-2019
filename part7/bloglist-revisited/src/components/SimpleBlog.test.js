import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'
import { fireEvent } from '@testing-library/react/dist'

test('SimpleBlog test #1', () => {
    let component

    const blog = {
        title: 'This is a test title',
        author: 'This is the name of the author',
        likes: 59
    }

    const onClick = jest.fn()

    component = render(
        <SimpleBlog blog={blog} onClick={onClick}/>
    )

    const button = component.container.querySelector('button')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'This is a test title',
        'This is the name of the author',
        'blog has',
        '59',
        'likes'
    )
    expect(onClick.mock.calls.length).toBe(1)
})


test('SimpleBlog test #2', () => {
    let component

    const blog = {
        title: 'This is a test title',
        author: 'This is the name of the author',
        likes: 59
    }

    const onClick = jest.fn()

    component = render(
        <SimpleBlog blog={blog} onClick={onClick}/>
    )

    const button = component.container.querySelector('button')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'This is a test title',
        'This is the name of the author',
        'blog has',
        '59',
        'likes'
    )
    expect(onClick.mock.calls.length).toBe(2)
})