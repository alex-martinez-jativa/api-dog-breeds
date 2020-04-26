const {models: { Dog }} = require('data')
const { NotFoundError } = require('errors')

/**
 * retrieve all dogs
 * @throws {NotFoundError} if there are not dogs
 * @returns {Object} with all of dogs
 */

module.exports = () => {

    return(async() => {
        const results = await Dog.find({}).lean()
        if(!results) throw new NotFoundError('Not found dogs')

        results.forEach(dog => {
            dog.id = dog._id.toString()
            delete dog._id

            delete dog.__v
        })
        
        return results
    })()
}