const { models: { Dog } } = require('data')
const { validate } = require('utils')
const { NotFoundError } = require('errors')

/**
 * retrieve dogs by query string
 * @param {Object} with the query
 * @throws {NotFoundError} if there are not results
 * @returns {Object} list of all the dogs that belong to that query
 */

module.exports = (filter) => {

    validate.type(filter, 'filter', Object)

    const {query} = filter

    let regex = new RegExp(query, 'i')

    return (async() =>{
        debugger
        const results = await Dog.find({
            $or:[ 
                {breedName: regex},
                {description: regex},
                {'dogInfo.height': regex},
                {'dogInfo.weight': regex},
                {'dogInfo.life': regex}
            ]
        }).lean()
        if(results.length === 0) throw new NotFoundError(`there are not results with the query: ${query}`)

        results.forEach(dog => {
            dog.id = dog._id.toString()
            delete dog._id
            delete dog.__v
        })

        return results

    })()
}