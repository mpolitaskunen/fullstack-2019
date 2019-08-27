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

// Return the author with the most blogs with the count of blogs as well
const mostBlogs = function (blogs) {
    let result = _(blogs) // Let's create a variable to work with...
        .countBy('author') // Count data via the author field...
        .map((blogs, author) => ({ author, blogs })) // Map the data into proper fields...

    return result.reduce(function (prev,current) { // And return just the highest value object.
        return (prev.blogs > current.blogs)
            ? prev
            : current
    })
}

const mostLikes = function (blogs) {
    // Let's first create a variable to save our first results...
    let result = _(blogs)
        .groupBy('author') // Then group the blogs data by the author field...
        .map((likes, author) => ({ // Map the fields we want into new fields in the variable/collection
            author: author,
            likes: _.sumBy(likes, 'likes') // And sum by the amount of likes
        }))
        .value()

    return result.reduce(function (prev,current) { // And return the object with the maximum value in 'likes'
        return (prev.likes > current.likes)
            ? prev
            : current
    })
}

// Export the modules above
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}