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

async function getExploreVideoData() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&tags=under_30_minutes';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ee73605729mshcbc28e80a1004d1p1a68e1jsne2bd35272f98',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        return fetch(url, options).then(res => res.json())
    } catch (error) {
        return null;
    }
}


/**
 * Function to get a random meal.
 * Used 
 */
async function getRandomMeal() {
    const url:string = "www.themealdb.com/api/json/v1/1/random.php";
    return fetch(url).then(res => res.json());
}

export { getExploreCardData, getRandomMeal, getExploreVideoData }