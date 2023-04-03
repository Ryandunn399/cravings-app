/**
 * Verifies if a user is found in the database.
 */
async function verifyUserExists(user: string) {
    const postRoute = `http://localhost:3080/users/user-verify`

    return fetch(postRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user
        })
    }).then((res) => res.json().then((data) => data.exists))
}

/**
 * Will make a request to the server to create a user account. The server
 * will respond with a json object to tell the client whether or not the
 * account creation was successful and any corresponding message.  This function
 * returns that json object.
 */
async function createUserAccount(user: string, pass: string) {
    const postRoute = `http://localhost:3080/users/user-create`

    return fetch(postRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            password: pass
        })
    }).then((res) => res.json())
}

/**
 * This function will make a post request to the server in order to
 * obtain user information.  If the server finds a matching username and
 * password, it will return the user object associated with the database
 * as part of its json response.  Otherwise, it will send a corresponding
 * json object with the respective status and status msg.  For more information
 * on the json formats, view the UserRoutes.js file in the server/routes directory.
 */
async function retrieveUserAccount(user: string, pass: string) {
    const postRoute = `http://localhost:3080/users/user-login`

    return fetch(postRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            password: pass
        })
    }).then((res) => res.json())
}

export { verifyUserExists, createUserAccount, retrieveUserAccount}