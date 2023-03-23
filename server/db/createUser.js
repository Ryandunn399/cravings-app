const User = require('./User')

module.exports = async function createUser(username) {
    try {
        const newUser = new User({username});
        await newUser.save();
        return newUser
    } catch (err) {
        throw err;
    }
}
