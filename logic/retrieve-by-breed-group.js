const { models: { Dog } } = require('data')
const { validate } = require('utils')
const { NotFoundError } = require('errors')

/**
 * retrieve dogs by breed group
 * @param {String} name of the breed group
 * @throws {NotFoundError} if the breed group does not exist
 * @returns {Object} list of all the dogs that belong to that group
 */

module.exports = (breedGroup) => {
    
    validate.string(breedGroup, 'breed group')

    switch(breedGroup){
        case 'companion':
            breedGroup = 'companion dogs'
            break
        case 'herding':
            breedGroup = 'herding dogs'
            break
        case 'hound':
            breedGroup = 'hound dogs'
            break
        case 'hybrid':
            breedGroup = 'hybrid dogs'
            break
        case 'mixed':
            breedGroup = 'mixed breed dogs'
            break
        case 'sporting':
            breedGroup = 'sporting dogs'
            break
        case 'terrier':
            breedGroup = 'terrier dogs'
            break
        case 'working': 
            breedGroup = 'working dogs'
            break
    }

    return (async() => {

        const results = await Dog.find({'dogInfo.breedGroup': breedGroup}).lean()
        if(results.length === 0) throw new NotFoundError(`breed group ${breedGroup} does not exist`)
        debugger
        results.forEach(dog => {
            dog.id = dog._id.toString()
            delete dog._id
            delete dog.__v
        })

        return results

    })()
}