const { MongoMemoryServer } = require('mongodb-memory-server')
const dbfunc = require('../dbfunc')

//To run unit tests: npm test

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {await dbfunc.connect(mongoServer)});

afterEach(async () => {await dbfunc.clearDatabase(mongoServer)});

afterAll(async () => {await dbfunc.closeDatabase(mongoServer)});

//tests for user creation
describe("Creating users", () => {

    test("Create basic user", async () => {
        const user = await dbfunc.createUser("cravingsapp", "password123");
        expect(user.username).toEqual("cravingsapp");
        user.comparePassword("password123", function(err, isMatch) {
            if(err) throw err;
            expect(isMatch).toEqual(true);
        });
    })

    test("Attempt to create two users with the same username", async () => {
        //attempting duplicate usernames should result in an error being thrown
        expect.assertions(1);
        try {
            await dbfunc.createUser("cravingsapp", "password123");
            await dbfunc.createUser("cravingsapp", "password123");
        } catch (err) {
            expect(err.message).toMatch("E11000 duplicate key error collection: Username already exists");
        }
    })

    test("Attempt to create a user with no username or password", async () => {
        //attempting to create a user with no username should result in an error being thrown
        expect.assertions(1);
        try {
            await dbfunc.createUser();
        } catch (err) {
            expect(err.message).toMatch("User validation failed: username: Path `username` is required.");
        }
    })
 })

//tests for modifying users
describe("Modifying users", () => {

    test('Attempt to change username', async () => {
        //Assuming username is allowed to be changed, must be modified otherwise
        let user = await dbfunc.createUser("cravingsapp", "password123");
        expect(user.username).toEqual("cravingsapp");
        user.username = "newusername";
        await user.save();              
        expect(user.username).toEqual("newusername");
    })

    test('Attempt to change password', async () => {
        let user = await dbfunc.createUser("cravingsapp", "password123");
        user.comparePassword("password123", function(err, isMatch) {
            if(err) throw err;
            expect(isMatch).toEqual(true);
        });
        user.password = "newpassword";
        await user.save();  
        user.comparePassword("newpassword", function(err, isMatch) {
            if(err) throw err;
            expect(isMatch).toEqual(true);
        });
    })

    test("Attempt to add a supported intolerance", async () => {
        const user = await dbfunc.createUser("cravingsapp", "password123");
        await dbfunc.addIntolerance(user, "Dairy");
        expect(user.intolerances[0] === "Dairy");
    })

    test("Attempt to add an unsupported intolerance", async () => {
        const user = await dbfunc.createUser("cravingsapp", "password123");
        try {
            await dbfunc.addIntolerance(user, "Squid");
        } catch (err) {
            expect(err.message).toMatch("String doesn't match any supported intolerances. Check capitalization.");
        }
    })

    test("Attempt to add duplicate intolerances", async () => {
        const user = await dbfunc.createUser("cravingsapp", "password123");
        try {
            await dbfunc.addIntolerance(user, "Dairy");
            await dbfunc.addIntolerance(user, "Dairy");
        } catch (err) {
            expect(err.message).toMatch("Intolerance already included.");
        }
    })
})

describe("Obtaining data", () => {
    test("Obtain user account information omitting password", async () => {
        await dbfunc.createUser("cravingsapp", "yuuri");
        const result = await dbfunc.obtainUserInfo("cravingsapp", "yuuri");
        expect(result.username).toEqual("cravingsapp");
        expect(result.password).toEqual(undefined);
    })
})