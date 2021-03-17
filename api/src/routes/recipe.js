const express = require('express')
const router = express.Router()
const { Recipe, Diet, Dish } = require('../db.js');

router.post('/', async (req, res) => {
    let {image, name, summary, score, healthyScore, ...rest} = req.body
    //console.log(rest)
    let steps = [{
        steps: []
    }]
    let diets = []
    let dishes = []
    for(let [key, value] of Object.entries(rest)){
        //console.log(key.substring(0, 5))
        if(key.substring(0, 5) === 'step'){
            key = parseInt(key.substring(4))
            steps[0].steps[key] = {
                number: key+1,
                step: value,
            }
        }else if(key[0] === 't' && value === 'on'){
            diets.push(key.substring(1))
        }else if(key[0] === 'h' && value === 'on'){
            dishes.push(key.substring(1))
        } 
    }

    steps = JSON.stringify(steps)

    if(name && summary){
        let recipe = await Recipe.create({
            image,
            name,
            summary,
            score,
            healthyScore,
            steps,
        })

        diets = await Promise.all(diets.map(async (el) => {
            let [createdDiet, created] = await Diet.findOrCreate({
                where: {name: el}
            })
            return createdDiet
        }))

        dishes = await Promise.all(dishes.map(async (el) => {
            let [createdDish, created] = await Dish.findOrCreate({
                where: {name: el}
            })
            return createdDish
        }))

        await recipe.addDiets(diets)
        await recipe.addDishes(dishes)

        res.redirect(`http://localhost:3000/details/${recipe.dataValues.id}`)
    }else{
        res.redirect('http://localhost:3000/recipe')
    }    
})

module.exports = router;
