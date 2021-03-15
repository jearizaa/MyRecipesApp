require('dotenv').config();
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { Recipe, Diet, Dish } = require('../db.js');

const { YOUR_API_KEY } = process.env
const number = 100
const urlRecipes = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=${number}`
//const urlRecipes = `https://rickandmortyapi.com/api/character/`

router.use(express.json())

router.get('/', (req, res) => {
    const {name} = req.query
    Recipe.findAll({include: {all: true}}).then( async (recipes) => {
        //console.log(recipes.length)
        if(recipes.length < number){
            let {data} = await axios.get(urlRecipes)
            let {results, offset, number, totalResults} = data
            //console.log(results[0])

            let recipeDiets = results.map(result => {
                let {glutenFree, vegan, vegetarian, diets} = result
                if(glutenFree && !diets.includes('gluten free')) diets.push('gluten free') 
                if(vegan && !diets.includes('vegan')) diets.push('vegan') 
                if(vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian') 
                return diets
            })
        
            let recipeDishes = results.map(result => result.dishTypes)            

            recipeDiets = await Promise.all(recipeDiets.map(async (arr) => {
                return await Promise.all(arr.map(async (el) => {
                    let [createdDiet, created] = await Diet.findOrCreate({
                        where: {name: el}
                    })
                    //if(created) console.log(createdDiet)                    
                    return createdDiet
                })
            )}))
           
            recipeDishes = await Promise.all(recipeDishes.map(async (arr) => {
                return await Promise.all(arr.map(async (el) => {
                    let [createdDish, created] = await Dish.findOrCreate({
                        where: {name: el}
                    })
                    //if(created) console.log(createdDiet)                    
                    return createdDish
                })
            )}))

            results = results.map(result => {
                return  Recipe.create({
                    apiID: result.id,
                    image: result.image,
                    name: result.title,
                    summary: result.summary,
                    // name: result.name,
                    // summary: result.species,
                    score: result.spoonacularScore,
                    healthyScore: result.healthScore,
                    steps: result.sourceUrl,
                })
            })
            //console.log(results[0])
            recipes = await Promise.all(results)

            await Promise.all(recipes.map(async (item, index) => {
                await item.addDiets(recipeDiets[index])
                await item.addDishes(recipeDishes[index])
            }))
            
            recipes = await Recipe.findAll({include: {all: true}})

            if(name){
                res.json(recipes.filter(recipe => {
                    return recipe.name.toLowerCase().includes(name.toLowerCase())
                }))
            }else{
                res.json(recipes)
            }  
          
        }else{
            if(name){
                res.json(recipes.filter(recipe => {
                    return recipe.name.toLowerCase().includes(name.toLowerCase())
                }))
            }else{
                res.json(recipes)
            }            
        }
    })    
})

router.get('/:idReceta', async (req, res) => {
    let {idReceta} = req.params
    let {api} = req.query
    if(api){
        const urlInfo = `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`
        let {data} = await axios.get(urlInfo)
        res.json(data)
    }else{
        let recipe = await Recipe.findAll({include: { all: true }, where: {id: idReceta}})
        if(recipe.length === 1){
            res.json(recipe)
        }else{
            res.send('La id no corresponde con ninguna receta.')
        }
    }   
    
})

module.exports = router;
