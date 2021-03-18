import React from 'react'
import './Recipe.css'

function Recipe({recipe}) {
    return (
      <div className="recipe">
          <h1>{recipe.name}</h1> 
          <img className='recipeImage' src={recipe.image} alt={recipe.image}/> 
          <div className='diets'>
            {
                recipe.diets.map((diet, index) => {
                    return (
                        <div key={`RecipeDiet${index}`}>{diet.name}</div>
                    )
                })
            }
          </div> 
          <div className='dishes'>
            {
                recipe.dishes.map((dish, index) => {
                    return (
                        <div key={`RecipeDish${index}`}>{dish.name}</div>
                    )
                })
            }
          </div>
      </div>
    );
  }
  
  export default Recipe;