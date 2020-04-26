const { retrieveDogById } = require('../../logic')
const { ContentError } = require('errors')

module.exports = (req, res) => {

    const {params: {id} } = req

    try{
        retrieveDogById(id)
        .then(dog => {
            res.status(200).json(dog)
        })
        .catch(error => {
            const { message } = error
            res.status(400).json({error: message})
        })

    }catch(error){
        let status = 400

        if(error instanceof TypeError || error instanceof ContentError){
            status = 406
        }
        const { message } = error

        res.status(status).json({error: message})
    }
}