const {models: { Dog} } = require('data')
const { NotFoundError } = require('errors')
const { validate } = require('utils')

/**
 * retrieve dogs by query string
 * @param {String} with the dog's unique id
 * @throws {NotFoundError} if the id does not exist
 * @returns {Object} dog that belong with that id
 */

module.exports = (id) => {
    validate.string(id, 'id')

    return(async() => {
        const result = await Dog.findById(id).lean()
        if(!result) throw new NotFoundError(`there are not dog with id: ${id}`)

        result.id = result._id.toString()
        delete result._id
        delete result.__v

        return result
    })()
}