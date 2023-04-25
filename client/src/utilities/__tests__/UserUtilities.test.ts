import { callCreateUser, addUserIntolerance } from '../UserUtilities';

//Tests for creating a new user
describe("Creating a new user", () => {

	test("Calling callCreateUser", async() => {
		const user = await callCreateUser("johndoe");
		expect(user).toEqual("johndoe");
	})

	test("Attempting to change username", async() => {
		const user = await callCreateUser("johndoe");
		expect(user).toEqual("johndoe");
	})

	test("Making a duplicate username", async() => {
		const user = await callCreateUser("johndoe");
		expect(user).toEqual("johndoe");
	})

})
