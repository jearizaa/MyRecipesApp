const express = require('express')
const router = express.Router()
const { Dish } = require('../db.js');

router.use(express.json())

router.get('/', (req, res) => {
    Dish.findAll()
        .then(dishes => res.json(dishes)) 
        .catch(err => res.send('Error')) 
})

module.exports = router;
