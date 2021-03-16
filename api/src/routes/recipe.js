const express = require('express')
const router = express.Router()
const { Recipe, Diet, Dish } = require('../db.js');

router.post('/', async (req, res) => {
    let {image, name, summary, score, healthyScore, steps, diets, dishes} = req.body
    if(name && summary){
        let recipe = await Recipe.create({
            image,
            name,
            summary,
            score,
            healthyScore,
            steps,
        })
        res.redirect(`http://localhost:3000/details/${recipe.dataValues.id}`)
    }else{
        res.redirect('http://localhost:3000/recipe')
    }    
})

module.exports = router;
