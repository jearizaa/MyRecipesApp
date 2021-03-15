const express = require('express')
const router = express.Router()
const { Diet, Dish } = require('../db.js');

router.use(express.json())

router.get('/', (req, res) => {
    Diet.findAll()
        .then(diets => res.json(diets)) 
        .catch(err => res.send('Error')) 
})

module.exports = router;
