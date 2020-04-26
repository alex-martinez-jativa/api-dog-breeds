require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveByQuery = require('./retrieve-by-query')
const { mongoose, models: {Dog} } = require('data')

describe('retrieve by query', () => {
    before(() => mongoose.connect(TEST_MONGODB_URL, {seNewUrlParser: true, useUnifiedTopology: true})
        .then(() => Dog.deleteMany())
    )
    let breedName, image, description, height, weight, life, breedGroup, _id
    let dogInfo

    beforeEach(() => {
        breedName = `breedName-${random()}`
        image = `image-${random()}`
        description = `description-${random()}`
        height = `h-${random()}`
        weight = `w-${random()}`
        life = `l-${random()}`
        breedGroup = `group-${random()}`

        dogInfo = {height, weight, life, breedGroup}
    })

    describe('create dog', () => {
        beforeEach(() => {
            return Dog.create({breedName, image, description, dogInfo})
            .then(({id}) => _id = id)
        })

        it('should succeed on query exist', () => {
            let filter = {query: breedName}
            return retrieveByQuery(filter)
            .then((results) => {
                expect(results).to.be.not.undefined
                expect(results[0].breedName).to.equal(breedName)
                expect(results[0].image).to.equal(image)
                expect(results[0].description).to.equal(description)
                expect(results[0].dogInfo[0].height).to.equal(height)
                expect(results[0].dogInfo[0].weight).to.equal(weight)
                expect(results[0].dogInfo[0].life).to.equal(life)
                expect(results[0].dogInfo[0].breedGroup).to.equal(breedGroup)
            })
        })
    })
    describe('when the dog does not exist', () => {
        beforeEach(() => 
            Dog.deleteMany()
            .then(() => {})
        )
        it('should fail on retrieve not exists dog', () => {
            let filter = {query: breedName}
            return retrieveByQuery(filter)
            .then(() => { throw new Error('should not reach this point')})
            .catch(({message}) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`there are not results with the query: ${filter.query}`)
            })
        })
    })

    describe('unhappy paths', () => {
        it('should fail on non object filter query', () => {
            let filter = 123
            expect(() => retrieveByQuery(filter)).to.throw(TypeError, `filter ${filter} is not a Object`)
        })
        it('should fail on non object filter query', () => {
            let filter = true
            expect(() => retrieveByQuery(filter)).to.throw(TypeError, `filter ${filter} is not a Object`)
        })
        it('should fail on non object filter query', () => {
            let filter = 'dog'
            expect(() => retrieveByQuery(filter)).to.throw(TypeError, `filter ${filter} is not a Object`)
        })
    })

    after(() => Dog.deleteMany() .then(() => mongoose.disconnect() ))
})