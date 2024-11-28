import * as actionName from './action';

const initializeState = {
    user: null,
    recipes: [],
    selectedRecipe: null,
    category: [],
    categories: [],
    cart: []
}


const Reducer = (state = initializeState, action) => {

    switch (action.type) {
        case actionName.SET_CATEGORIES:
            {
                return { ...state, categories: action.data };
            }
        case actionName.SET_USER: {
            const user = action.data;
            state.user = user;
            return {
                ...state, user
            }
        }
        case actionName.SET_RECIPIES: {
            const recipe5 = action.data
            state.recipes = recipe5;
            return {
                ...state, recipe5
            }
        }
        case actionName.SET_SELECTED_RECIPE: {
            return { ...state, selectedRecipe: action.data }
        }
        case actionName.GET_RECIPIES: {
            const recipe = action.data;
            state.recipe = recipe;
            return {
                ...state, recipe
            }
            // return {...state, recipes: action.data}
        }
        // case actionName.ADD_USER:{return{}}
        // case actionName.GET_RECIPIES:{return{}}
        // case actionName.DELITE_RECIPE:{return{}}
        // case actionName.EDIT_RECIPE:{return{}}
        // case actionName.ADD_RECIPE:{return{}}
        case actionName.GET_CATEGORY: {
            state.category = action.data;
            return { ...state }
        }
        // case actionName.ADD_CATEGORY:{return{}}
        // case actionName.ADD_TO_LIST:return{}

        case actionName.EDIT_RECIPE:
            {
                const updatedRecipe = action.data;
                const updatedRecipes = state.recipes.map(recipe =>
                    recipe.Id === updatedRecipe.Id ? updatedRecipe : recipe
                );
                return {
                    ...state,
                    recipes: updatedRecipes
                };
            }
        case actionName.ADD_RECIPE:
            {
                const newRecipe = action.data;
                return {
                    ...state,
                    recipes: [...state.recipes, newRecipe]
                };
            }
        case actionName.ADD_TO_CART: {
            const newProduct = action.data;
            return {
                ...state,
                cart: [...state.cart, newProduct]
            }
        }
        case actionName.DELETE_FROM_CART: {
            const existsProduct = action.data;
            const updatedCart = state.cart.filter(prod => prod.Name !== existsProduct.Name && prod.Count !== existsProduct.Count)
            return {
                ...state,
                cart: updatedCart
            }
        }
        case actionName.SET_CART:
            {
                return { ...state, cart: action.data };
            }
        default: return { ...state }

    }
}
export default Reducer;