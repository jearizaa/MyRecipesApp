const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes.js')
const recipeRouter = require('./recipe.js')
const typesRouter = require('./types.js')
const dishesRouter = require('./dishes.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dishes', dishesRouter)
router.use('/recipes', recipesRouter)
router.use('/recipe', recipeRouter)
router.use('/types', typesRouter)


module.exports = router;
