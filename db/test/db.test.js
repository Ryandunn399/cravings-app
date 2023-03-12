const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const db = require ('./dbtest')
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
        //Assuming username is allowed to be changed, must be modified otherwise
        let user = await createUser("cravingsapp");
        expect(user.username).toEqual("cravingsapp");
        user.username = "newusername";
        await user.save();              
        expect(user.username).toEqual("newusername");
    })

    test("Attempt to add a supported intolerance", async () => {
        const user = await createUser("cravingsapp");
        await db.addIntolerance(user, "Dairy");
        expect(user.intolerances[0] === "Dairy");
    })

    test("Attempt to add an unsupported intolerance", async () => {
        const user = await createUser("cravingsapp");
        try {
            await db.addIntolerance(user, "Squid");
        } catch (err) {
            expect(err.message).toMatch("String doesn't match any supported intolerances. Check capitalization.");
        }
    })

    test("Attempt to add duplicate intolerances", async () => {
        const user = await createUser("cravingsapp");
        try {
            await db.addIntolerance(user, "Dairy");
            await db.addIntolerance(user, "Dairy");
        } catch (err) {
            expect(err.message).toMatch("Intolerance already included.");
        }
    })
})
