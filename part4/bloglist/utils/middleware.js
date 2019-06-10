const logger = require('./logger')

const requestLogger = (req,res,next) => {
    logger.info('Method: ', req.method)
    logger.info('Path:   ', req.path)
    logger.info('Body:   ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req,res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error,req,res,next) => {
    logger.info(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'Malformatted ID' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token'
        })
    }

    next(error)
}

const tokenExtractor = (req,res,next) => {
    const auth = req.get('authorization')

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}