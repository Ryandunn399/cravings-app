const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const db = require ('./db')
const User = require('../User')
const createUser = require('../createUser')
const { findOneAndUpdate } = require('../User')

//To run unit tests: npm test

beforeAll(async () => {await db.connect()});

afterEach(async () => {await db.clearDatabase()});

afterAll(async () => {await db.closeDatabase()});

//tests for user creation
describe("Creating users", () => {

    test("Create basic user", async () => {
        const user = await createUser("cravingsapp");
        expect(user.username).toEqual("cravingsapp");
    })

    test("Attempt to create two users with the same username", async () => {
        //attempting duplicate usernames should result in an error being thrown
        expect.assertions(1);
        try {
            await createUser("cravingsapp");
            await createUser("cravingsapp");
        } catch (err) {
            expect(err.message).toMatch("E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"cravingsapp\" }");
        }
    })

    test("Attempt to create a user with no username", async () => {
        //attempting to create a user with no username should result in an error being thrown
        expect.assertions(1);
        try {
            await createUser();
        } catch (err) {
            expect(err.message).toMatch("User validation failed: username: Path `username` is required.");
        }
    })
})

//tests for modifying users
describe("Modifying users", () => {

    test('Attempt to change username', async () => {
        //Assuming username is allowed to be changed
        let user = await createUser("cravingsapp");
        expect(user.username).toEqual("cravingsapp");
        user.username = "newusername";              //i have no idea why this isn't working
        await user.save();              
        //user = await User.findOneAndUpdate({username: "cravingsapp"}, {$set: {username: "newusername"}}, {new: true}); 
        expect(user.username).toEqual("newusername");
    })
})