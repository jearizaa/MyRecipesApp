import React from 'react'

function Recipe({recipe}) {
    return (
      <div className="Recipe">
          <h1>{recipe.name}</h1> 
          <img src={recipe.image} alt={recipe.image}/> 
          <div className='Diets'>
            {
                recipe.diets.map((diet, index) => {
                    return (
                        <div key={`RecipeDiet${index}`}>{diet.name}</div>
                    )
                })
            }
          </div> 
          <div className='Dishes'>
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