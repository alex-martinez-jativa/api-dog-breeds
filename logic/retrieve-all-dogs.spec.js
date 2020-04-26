require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveAllDogs = require('./retrieve-all-dogs')
const { mongoose, models: { Dog } } = require('data')


describe('retrieve all dogs', () => {
    before(() => mongoose.connect(TEST_MONGODB_URL, {seNewUrlParser: true, useUnifiedTopology: true})
        .then(() => Dog.deleteMany())
    )

    let breedName, image, description, height, weight, life, breedGroup
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
        })
    
        it('should succeed on there are dogs', () => {

            return retrieveAllDogs()
            .then((dogs) => {
                expect(dogs).to.be.not.undefined
                
                dogs.forEach(dog => {
                    expect(dog.breedName).to.be.a('string')
                    expect(dog.image).to.be.a('string')
                    expect(dog.description).to.be.a('string')
                    expect(dog.dogInfo).to.be.instanceOf(Array)
                    expect(dog.dogInfo[0].height).to.be.a('string')
                    expect(dog.dogInfo[0].weight).to.be.a('string')
                    expect(dog.dogInfo[0].life).to.be.a('string')
                    expect(dog.dogInfo[0].breedGroup).to.be.a('string')
                })
            })
        })
    })

    after(() => Dog.deleteMany() .then(() => mongoose.disconnect() ))
})