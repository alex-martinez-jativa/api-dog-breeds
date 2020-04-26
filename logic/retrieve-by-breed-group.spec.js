require('dotenv').config()
const {env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveByBreedGroup = require('./retrieve-by-breed-group')
const { mongoose, models: { Dog } } = require('data')

describe('retrieve by breed group', () => {
    before(() => mongoose.connect(TEST_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => Dog.deleteMany())
    )
    let breedName, image, description, height, weight, life, dogInfo, breedGroup
    let breedGroupList = ['companion dogs', 'herding dogs', 'hound dogs', 'hybrid dogs', 'mixed breed dogs', 'sporting dogs', 'terrier dogs' ,'working dogs']

    beforeEach(() => {
        breedName = `breedName-${random()}`
        image = `image-${random()}`
        description = `description-${random()}`
        height = `h-${random()}`
        weight = `w-${random()}`
        life = `l-${random()}`
        breedGroup = breedGroupList[floor(random()*breedGroupList.length)+1]
        console.log(breedGroup)

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

        dogInfo = {height, weight, life, breedGroup}
    })
    
    describe('create dog', () => {
        beforeEach(() => {
            return Dog.create({breedName, image, description, dogInfo})
        })

        it('should succeed, on correct breed group', () => {
            return retrieveByBreedGroup(breedGroup)
            .then((results) =>{
                expect(results).not.to.be.undefined
                expect(results[0].dogInfo[0].breedGroup).to.equal(breedGroup)
                expect(results[0].breedName).to.equal(breedName)
                expect(results[0].image).to.equal(image)
                expect(results[0].description).to.equal(description)
                expect(results[0].dogInfo[0].height).to.equal(height)
                expect(results[0].dogInfo[0].weight).to.equal(weight)
                expect(results[0].dogInfo[0].life).to.equal(life)
            })
        })

        describe('when the dog does not exist', () => {
            beforeEach(() => 
                Dog.deleteMany()
                .then(() => {})
            )
            it('should fail on non-exist dog', () => {
                return retrieveByBreedGroup(breedGroup)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({message}) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`breed group ${breedGroup} does not exist`)
                })
            })
        })

        describe('unhappy paths', () => {
            it('should fail on non-string breed name', () => {
                let breedGroup = 123
                expect(() => retrieveByBreedGroup(breedGroup)).to.throw(TypeError, `breed group ${breedGroup} is not a string`)

                breedGroup = false
                expect(() => retrieveByBreedGroup(breedGroup)).to.throw(TypeError, `breed group ${breedGroup} is not a string`)

                breedGroup = {}
                expect(() => retrieveByBreedGroup(breedGroup)).to.throw(TypeError, `breed group ${breedGroup} is not a string`)
            })
        })
    })

    after(() => Dog.deleteMany() .then(() => mongoose.disconnect() ))
})