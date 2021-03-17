import { INCREMENT_PAGE, DECREMENT_PAGE, UPDATE_RECIPES, SORT_RECIPES, FILTER_RECIPES, RESTORE_RECIPES } from '../actions';
import axios from 'axios'

const  initialState = {
  page: 1,
  recipes: [],
  diets: [],
  dishes: [],
  db: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT_PAGE:
        if(state.page < Math.ceil(state.recipes.length/9)){
          return {
            ...state,
            page: state.page+1,
          }
        }else{
          return state
        }
      case DECREMENT_PAGE:
        if(state.page > 1){
          return {
            ...state,
            page: state.page-1,
          }
        }else{
          return state
        }   
      case FILTER_RECIPES: 
        let {types} = action.payload
        if(types.length > 0) {
          let filteredRecipes = state.recipes.filter(recipe => {
            let dietsAndDishes = [...recipe.diets, ...recipe.dishes]
            for(let i = 0; i < types.length; i++){
              let index = dietsAndDishes.findIndex(el => {
                return el.name === types[i]
              })
              if(index >= 0) return true
            }
            return false
          })
          console.log(filteredRecipes)
          return {
            ...state,
            page: 1,
            recipes: filteredRecipes,
          }
        }
        return state
      case SORT_RECIPES:
        return state      
      case UPDATE_RECIPES:
        let {recipes, diets, dishes} = action.payload
           return {
            page: 1,
            recipes,
            diets,
            dishes,
            db: recipes,
          }
      case RESTORE_RECIPES:
        return {
          ...state,
          page: 1,
          recipes: state.db
        }
      default:
        return state;
    }
};
export function updateRecipes(name){
  return async function update(dispatch){
    const recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`)
    const diets = await axios.get(`http://localhost:3001/types`)
    const dishes = await axios.get(`http://localhost:3001/dishes`)
    const payload = {recipes: recipes.data, diets: diets.data, dishes: dishes.data}
    dispatch({type: UPDATE_RECIPES, payload})
  }
}


export default rootReducer