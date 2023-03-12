const { token } = require('./token.json')

/**
 * This will include the host and api key we need to make a fetch request.
 * In order for this to work appropriately, you must create a token.json file in the utilities
 * folder and give the json object a property of "token": "api-key"
 */
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': token,
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

/**
 * This will act as the interface for availble options when making a call to the spoonacular api.
 * 
 * To get a breakdown of each option, checkout https://spoonacular.com/food-api/docs
 */
export interface SearchOptions {
    query: string,
    cuisine? : string[],
    excludedCuisine?: string[],
    diet?: string[],
    intolerances? : string[],
    equipment?: string[],
    includeIngredients?: string[],
    excludeIngredients?: string[],
    type?: string,
    instructionsRequired?: boolean,
    fillIngredients?: boolean,
    addRecipeInformation?: boolean,
    addRecipeNutrition?: boolean,
    maxReadyTime?: number,
    sort?: string,
    number?: number,
    offset?: number
}

/**
 * Interface for RecipePage
 */
export interface RecipeOptions {

}



/**
 * This will make an api request for searching recipes.
 * 
 * @param searchOptions the options available to the search.
 * @returns a promise of the json file obtained from the api call.
 */
async function sendSearchCall(searchOptions: SearchOptions) {
    let url: string = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?`;

    // Append the string with our search options
    Object.keys(searchOptions).forEach((key) => {
        const option = String(key);
        const value = String(searchOptions[key as keyof SearchOptions]);
        url += `&${option}=${value}`
    })

    return fetch(url, options)
        .then(res => res.json());
}


/**
 * This search will retrieve the recipe given the ID of said recipe.
 * 
 * @param id the id of the recipe we are attempting to retrieve.
 * @returns a promise of the json file obtained from the api call.
 */
async function getRecipeInformation(id: number) {
    let url: string = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=true`
    return fetch(url, options)
        .then(res => res.json());
}

export { sendSearchCall, getRecipeInformation }