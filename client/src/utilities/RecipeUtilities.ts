/**
 * Interface for RecipePage
 */
export interface RecipeOptions {

}

/**
 * RecipeListData Type
 * Used for displaying the explore cards
 */
export type RecipeListData = {
    calories: number;
    carbs: number;
    comments: string;
    cooktime: number;
    fat: number;
    fiber: number;
    id: string;
    ingredients: string[];
    instructions: string;
    name: string;
    preptime: number;
    protein: number;
    satfat: number;
    servings: number;
    source: string;
    sugar: number;
    tags: string[];
    waittime: number;
}

/**
 * Function to obtain RecipeListData.
 * Uses a private hosted API made specifically for the cravings app
 */
async function getRecipeListData() {
    const url:string = "https://wayofvod.com/files/recipePageList.json";
    return fetch(url).then(res => res.json());
}


export { getRecipeListData }