const { Schema, model } = require('mongoose')

const DogSchema = new Schema({
    breedName: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    dogInfo: [{
        height: {type: String, required: true},
        weight: {type: String, required: true},
        life: {type: String, required: true},
        breedGroup: {type: String, required: true}
    }]
})

module.exports = model('Dog', DogSchema)