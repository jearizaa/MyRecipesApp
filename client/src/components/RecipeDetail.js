//import {Link} from 'react-router-dom'
import Nav from './Nav.js'
import { connect } from 'react-redux'


function RecipeDetail({store, match}) {  
  let [recipe] = store.filter((el) => {
    return parseInt(el.id) === parseInt(match.params.id)
  })

  if(recipe){
    return (
      <>
        <Nav/>
        <div className="RecipeDetail">        
          <h1>{recipe.name}</h1>
          <h2>{`Puntuacion: ${recipe.score}`}</h2>
          <h2>{`Saludable: ${recipe.healthyScore}`}</h2>
          <img src={recipe.image} alt={recipe.image}/>
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          {/* <div>{ recipe.summary }</div> */}
          <div className='Diets'>
            {
                recipe.diets.map((diet, index) => {
                    return (
                        <div className='Diet' key={`RecipeDiet${index}`}>{diet.name}</div>
                    )
                })
            }
          </div> 
          <div className='Dishes'>
            {
                recipe.dishes.map((dish, index) => {
                    return (
                        <div className='Dish' key={`RecipeDish${index}`}>{dish.name}</div>
                    )
                })
            }
          </div>
          <ol className='Steps'>
            {recipe.steps.map((step, index) => {
              if(step.step !== ''){
                return (
                  <li key={`RecipeStep${index}`}>{step.step}</li>
                )
              } 
              return <></>             
            })}
          </ol>          
        </div>
      </>    
    );
  }else{
    return (
      <>
        <Nav/>     
          <h1>No hay receta.</h1>
      </> 
    )
  }
  
}

function mapStateToProps(state){
  return{
    store: state.recipes,
  }
}

export default connect(mapStateToProps)(RecipeDetail);