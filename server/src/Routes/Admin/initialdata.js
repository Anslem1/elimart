const { initialData } = require('../../Controllers/Admin/Initaldata');

const router = require('express').Router()

router.post('/initialdata', initialData)

module.exports = router
