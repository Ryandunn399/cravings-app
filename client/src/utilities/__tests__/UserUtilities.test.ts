/**
 * These series of tests provide full statement coverage for the UserUtilites functions.
 * However, due to issues with promise resolution in jest it's impossible to fully test
 * system testing using these functions and can only rely on additional server related testing.
 */
import { createUserAccount, deleteUserAccount, verifyUserExists, retrieveUserAccount } from '../UserUtilities'

const user = 'johndoe'
const pass = 'password123'
const nonUser = '12345678987654321'

/**
 * Will fail the first time tests are run if the user doesn't already
 * exist in the mongo database.
 */
test('Test creation of user that already exists', async () => {
    const expectedString = 'failed'

    return createUserAccount(user, pass).then(data => {
        expect(data.status).toBe(expectedString)
    })
})

test('Deletion of a user account that does not exist', async () => {
    const expectedString = 'failed'

    return deleteUserAccount(nonUser).then(data => {
        expect(data.status).toBe(expectedString)
    })
})

test('Verify user that does not exist', async () => {
    const expectedString = false

    return verifyUserExists(nonUser).then(data => {
        expect(data).toBe(expectedString)
    })
})

test('Attempting to retrieve an account that does not exist', async () => {
    const expectedString = 'failed'

    return retrieveUserAccount(nonUser, pass).then(data => {
        expect(data.status).toBe(expectedString);
    })
})