const express = require('express')
const router = express.Router()
const dbFunc = require('../db/dbfunc')

/**
 * Route to determine if a user exists based on the given username.
 */
router.post('/user-verify', async (req, res) => {

    const username = req.body.username
    let exists = await dbFunc.verifyUserExists(username)
    
    let responseObj = {
        exists: exists
    }

    res.send(JSON.stringify(responseObj))
})

/**
 * Will attempt to create an acccount based on the username and password
 * passed in the body of the request. It will respond with a JSON object
 * that correlates to the status of the request to create a new user and a
 * message with more detail.
 */
router.post('/user-create', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    let responseObj = {status: 'unfulfilled', statusMsg: ''}

    let exists = await dbFunc.verifyUserExists(username)

    if (exists) {
        responseObj = {
            status: 'failed',
            statusMsg: 'User already exists.'
        }
    } else {
        if (dbFunc.createUser(username, password)) {
            responseObj = {
                status: 'success',
                statusMsg: 'User account created successfully!'
            }
        } else {
            responseObj = {
                status: 'failed',
                statusMsg: 'Server side error'
            }
        }
    }

    res.send(JSON.stringify(responseObj))
})

/**
 * Will handle a post request from the client attempting to login
 * with the given credentials.  If the user successfully enters
 * a matching username and password, we will send the client the corresponding
 * user object that will contain all the user information.
 */
router.post('/user-login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    let responseObj = {status: 'unfulfilled', statusMsg: '', userObj: undefined}

    let userInfo = await dbFunc.obtainUserInfo(username, password);

    if (userInfo === null) {
        responseObj = {
            status: 'failed',
            statusMsg: 'Incorrect username or password',
            userObj: undefined
        }
    } else {
        responseObj = {
            status: 'success',
            statusMsg: 'User has successfully logged in',
            userObj: userInfo
        }
    }

    res.send(JSON.stringify(responseObj))
})

module.exports = router