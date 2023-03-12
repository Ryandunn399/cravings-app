/**
 * Interface for ExplorePage
 */
export interface ExploreOptions {

}

/**
 * ExploreCardData Type
 * Used for displaying the explore cards
 */
export type ExploreCardData = {
    image: string;
    url: string;
    title: string;
    title_url: string;
    duration: string;
    duration_url: string;
}

/**
 * Function to obtain ExploreCardData.
 * Uses a private hosted API made specifically for the cravings app
 */
async function getExploreCardData() {
    const url:string = "https://wayofvod.com/files/exploreCardData.json";
    return fetch(url).then(res => res.json());
}


/**
 * Function to get a random meal.
 * Used 
 */
async function getRandomMeal() {
    const url:string = "www.themealdb.com/api/json/v1/1/random.php";
    return fetch(url).then(res => res.json());
}

export { getExploreCardData, getRandomMeal }