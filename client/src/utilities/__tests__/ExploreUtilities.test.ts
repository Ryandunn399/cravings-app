import { getExploreData } from '../ExploreUtilities'


/**
 * This will test the getExploreData function
 */
test('Testing the getExploreData function', async () => {
    return getExploreData().then(data => {
        expect(data.results.length).toBeGreaterThan(0);
    })
})



