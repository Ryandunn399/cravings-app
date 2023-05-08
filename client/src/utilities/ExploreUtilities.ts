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
 * Function to obtain data for explore card.
 * Uses the tasty api
 */
async function getExploreData() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=100&tags=under_30_minutes';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c229cee9c0msh2f6c01c3a7bf50ap1421d8jsn0202e6e8a9c4',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        return fetch(url, options).then(res => res.json())
    } catch (error) {
        return null;
    }
}

export { getExploreData }