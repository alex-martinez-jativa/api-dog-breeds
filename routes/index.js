const { Router } = require('express')
const { retrieveAllDogs, retrieveDogById, retrieveByQuery, retrieveByBreedGroup } = require('./handlers')

const router = new Router()

router.get('/dogs', retrieveAllDogs)
router.get('/dog/:id', retrieveDogById)
router.get('/dogs/:group', retrieveByBreedGroup)
router.get('/search', retrieveByQuery)

module.exports = router