import React from 'react'
import './Recipe.css'

function Recipe({recipe}) {
    return (
      <div className="recipe">
            <div className='header'>
                <h1>{recipe.name}</h1> 
                <img className='recipeImage' src={recipe.image} alt={recipe.image}/> 
            </div>
            <div className='types'>
                <div className='diets'>
                    {
                        recipe.diets.map((diet, index) => {
                            return (
                                <div className='diet' key={`RecipeDiet${index}`}>{diet.name}</div>
                            )
                        })
                    }
                </div> 
                <div className='dishes'>
                    {
                        recipe.dishes.map((dish, index) => {
                            return (
                                <div className='dish' key={`RecipeDish${index}`}>{dish.name}</div>
                            )
                        })
                    }
                </div>
            </div>
      </div>
    );
  }
  
  export default Recipe;