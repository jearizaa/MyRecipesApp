require('dotenv').config();
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { Recipe } = require('../db.js');

const { YOUR_API_KEY } = process.env

const urlRecipes = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`


router.use(express.json())

router.get('/', (req, res) => {
    Recipe.findAll().then( async recipes => {
        if(recipes.length === 0){
            let {data} = await axios.get(urlRecipes)
            let {results, offset, number, totalResults} = data
            results.map(result => {
                return  Recipe.create({
                    apiID: result.id,
                    image: result.image,
                    name: result.title,
                    summary: result.summary,
                    score: result.spoonacularScore,
                    healthyScore: result.healthScore,
                    steps: result.sourceUrl,
                })
            })
            Promise.all(results)
            .then(result => {
                console.log("Request sent to API and loaded to DB");
                res.json(result)
            }); 
        }else{
            res.json(recipes)
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
        let recipe = await Recipe.findAll({where: {id: idReceta}})
        if(recipe.length === 1){
            res.json(recipe)
        }else{
            res.send('La id no corresponde con ninguna receta.')
        }
    }   
    
})

module.exports = router;
