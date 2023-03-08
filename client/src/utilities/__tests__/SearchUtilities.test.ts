import { sendSearchCall, getRecipeInformation } from '../SearchUtilities'

/**
 * This will test to determine if the base functionality of the
 * search query is working by checking the number of results
 * which are expected to be ten.
 */
test('Testing the default search for chicken', () => {
    const searchParams = {
        query: 'chicken'
    }

    return sendSearchCall(searchParams).then(data => {
        expect(data.number).toBe(10);
    })
})

/**
 * This will test to determine if retrieving more detailed information about
 * a particular recipe is retrievable.  Because the api might change, in order
 * to avoid this constantly breaking by checking exact ID we will just check
 * for whether or not
 */
test('Testing more detailed search query', () => {
    const searchParams = {
        query: 'chicken',
        addRecipeNutrition: true
    }

    return sendSearchCall(searchParams).then(data => {
        expect(data.results[0].servings).toBeGreaterThan(0);
    })
})

/**
 * This will test the functionailty of our function for retrieving
 * recipe information by id.
 */
test('Testing the retrieval of recipe information', () => {
    const testId = 716429;
    const expectedString = 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs';

    return getRecipeInformation(testId).then(data => {
        expect(data.title).toBe(expectedString);
    })
})