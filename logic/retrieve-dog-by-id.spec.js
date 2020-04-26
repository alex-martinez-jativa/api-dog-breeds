require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveDogById = require('./retrieve-dog-by-id')
const { mongoose, models: { Dog } } = require('data')

describe('retrieve dog by id', () => {
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

        it('retrieve dog on correct id', () => {
            return retrieveDogById(_id)
            .then((dog) => {
                expect(dog).to.be.not.undefined
                expect(dog.breedName).to.be.equal(breedName)
                expect(dog.description).to.be.equal(description)
                expect(dog.image).to.be.equal(image)
                expect(dog.dogInfo[0].height).to.be.equal(height)
                expect(dog.dogInfo[0].weight).to.be.equal(weight)
                expect(dog.dogInfo[0].life).to.be.equal(life)
                expect(dog.dogInfo[0].breedGroup).to.be.equal(breedGroup)
            })
        })
    })
    describe('when the dog does not exist', () => {
        beforeEach(() => 
            Dog.deleteMany()
            .then(() => {})
        )
        it('should fail on retrieve not exists dog', () => {
            return retrieveDogById(_id)
            .then(() => { throw new Error('should not reach this point')})
            .catch(({message}) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`there are not dog with id: ${_id}`)
            })
        })
    })
    describe('unhappy paths', () => {
        it('should fail on non-string id', () => {
            let id = 12345
            expect(() => retrieveDogById(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = true
            expect(() => retrieveDogById(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = undefined
            expect(() => retrieveDogById(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = []
            expect(() => retrieveDogById(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = {}
            expect(() => retrieveDogById(id)).to.throw(TypeError, `id ${id} is not a string`)
        })
        
    })

    after(() => Dog.deleteMany() .then(() => mongoose.disconnect() ))
})