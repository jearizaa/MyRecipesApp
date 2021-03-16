import { INCREMENT_PAGE, DECREMENT_PAGE, UPDATE_RECIPES } from '../actions';
import axios from 'axios'

const  initialState = {
  page: 1,
  recipes: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT_PAGE:
        return {
          page: state.page+1,
          recipes: state.recipes,
        }
      case DECREMENT_PAGE:
        return {
          page: state.page-1,
          recipes: state.recipes,
        }
      case UPDATE_RECIPES:
           return {
            page: state.page,
            recipes: action.payload,
          }
      default:
        return state;
    }
};

export async function updateRecipes(dispatch){
  const recipes = await axios.get('http://localhost:3001/recipes')
  dispatch({type: UPDATE_RECIPES, payload: recipes.data})
}

export default rootReducer