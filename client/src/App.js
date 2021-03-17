import React from 'react'
import {Route} from 'react-router-dom'
import Home from './components/Home.js'
import AddRecipe from './components/AddRecipe.js'
import Recipes from './components/Recipes.js'
import RecipeDetail from './components/RecipeDetail.js'

function App() {
    return (
      <React.Fragment>
        <Route exact path='/' component={Home}/>
        <Route path='/details/:id' component={RecipeDetail}/>
        <Route path='/recipe' component={AddRecipe}/>
        <Route path='/recipes' component={Recipes}/>
      </React.Fragment>
    ); 
}

export default App;
