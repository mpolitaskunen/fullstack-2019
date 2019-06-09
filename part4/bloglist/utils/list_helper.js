const _ = require('lodash')

// Dummy function that always returns 1
const dummy = (blogs) => {
    return 1
}

// Let's count the total likes on entries input...
const totalLikes = (blogs) => blogs.reduce((total, { likes: value }) => total + value, 0)

// Return the entry with the most likes
const favoriteBlog = function (blogs) {
    return blogs.reduce(function (prev, current) {
        return (prev.likes > current.likes)
            ? prev
            : current
    }, 0)
}

const mostBlogs = function (blogs) {
    var result = _(blogs)
        .countBy('author')
        .map((blogs, author) => ({ author, blogs }))

    return result.reduce(function (prev,current) {
        return (prev.blogs > current.blogs)
            ? prev
            : current
    })
}

const mostLikes = function (blogs) {
    var result = _(blogs)
        .groupBy('author')
        .map((likes, author) => ({
            author: author,
            likes: _.sumBy(likes, 'likes')
        }))
        .value()

    return result.reduce(function (prev,current) {
        return (prev.likes > current.likes)
            ? prev
            : current
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}