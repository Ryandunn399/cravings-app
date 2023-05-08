/**
 * These series of tests provide full statement coverage for both the UserUtilities functions
 * and all the available paths provided by the server/routes/UserRoute.js.
 */
import { createUserAccount, deleteUserAccount, verifyUserExists, retrieveUserAccount } from '../UserUtilities'

const user = 'johndoe'
const pass = 'password123'
const nonUser = '12345678987654321'

/**
 * This will fail on the first run if john doe does not exist in the database.
 * Additionally, to ensure that the sequential test of delete is not called simultaneously
 * we will sleep for 100ms
 */
test('Test the deletion of a user.', async () => {
    const expectedString = 'success'

    await new Promise(r => setTimeout(r, 100))
    return deleteUserAccount(user).then(data => {
        expect(data.status).toBe(expectedString)
    })
})

/**
 * Test the deletion of a non-existent user
 */
test('Test the deletion of a user that does not exist', async () => {
    const expectedString = 'failed'
    return deleteUserAccount(nonUser).then(data => {
        expect(data.status).toBe(expectedString)
    })
})

/**
 * Test the creation of a user
 */
test('Test the creation of a user.', async () => {
    const expectedString = 'success'

    let res = await createUserAccount(user, pass)

    expect(res.status).toBe(expectedString)
})

/**
 * Test the creation of a user that was created in the previous test.
 * 
 * We need to sleep the test to avoid simulatenous create user calls.  While the database
 * will not allow the creation of multiple users with the same name since they will have the same
 * key value, it will seem as if both are successful if they take place at the exact same time
 */
test('Test the creation of a user that already exists', async () => {
    const expectedString = 'failed'

    // Pause the test for 200ms
    await new Promise(r => setTimeout(r, 200))
    let res = await createUserAccount(user, pass)

    expect(res.status).toBe(expectedString)
})

/**
 * Test to verify an existing user returns true.
 */
test('Test the verification of existing user', async () => {
    const expectedValue = true

    let res = await verifyUserExists(user);
    expect(res).toBe(true)
})

/**
 * Test to verify a non-existing user returns false.
 */
test('Test the verification of a non-existing user', async () => {
    const expectedValue = false

    let res = await verifyUserExists(nonUser)
    expect(res).toBe(false)
})

/**
 * Test to verify that an account is retrievable given the correct username and password.
 */
test('Test the retrieval of an account that exists', async () => {
    const expectedValue = 'success'

    let res = await retrieveUserAccount(user, pass)
    expect(res.status).toBe(expectedValue)
})

/**
 * Test to verify that an account is not retrievable given an existing username but incorrect password.
 */
test('Test the retrieval of an account that exists but provide incorrect pas', async () => {
    const expectedValue = 'failed'

    let res = await retrieveUserAccount(user, 'incorrect')
    expect(res.status).toBe(expectedValue)
})

/**
 * Test to verify that an account is not retrievable if it doesn't exist.
 */
test('Test the retrieval of an account that does not exist', async () => {
    const expectedValue = 'failed'

    let res = await retrieveUserAccount(nonUser, pass)
    expect(res.status).toBe(expectedValue)
})