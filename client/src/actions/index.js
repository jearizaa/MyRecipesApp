export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';
export const UPDATE_RECIPES = 'UPDATE_RECIPES';
export const FILTER_RECIPES = 'FILTER_RECIPES';
export const SORT_RECIPES = 'SORT_RECIPES';
export const RESTORE_RECIPES = 'RESTORE_RECIPES';

export const increment = () => ({
  type: INCREMENT_PAGE,
});

export const decrement = () => ({
  type: DECREMENT_PAGE,
});

export const filter = (payload) => ({
  type: FILTER_RECIPES,
  payload 
})

export const sort = (payload) => ({
  type: SORT_RECIPES,
  payload,
})

export const refresh = (payload) => ({
  type: RESTORE_RECIPES,
})

