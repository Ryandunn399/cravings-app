const { compare } = require('bcryptjs');
const mongoose = require('mongoose')
const User = require('./User')

module.exports.connect = async (mongoServer) => {
    await mongoServer.start();
    const uri = mongoServer.getUri()
    await mongoose.connect(uri , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports.closeDatabase = async (mongoServer) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports.createUser = async (username, password) => {
    try {
        const newUser = new User({username: username, password: password});
        await newUser.save();
        return newUser
    } catch (err) {
        throw err;
    }
}

const supportedIntolerances = 
    ["Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat"];

module.exports.addIntolerance = async (user, String) => {
    if (!supportedIntolerances.includes(String)) {
        throw new Error("String doesn't match any supported intolerances. Check capitalization.");
    } else if (user.intolerances.includes(String)) {
        throw new Error("Intolerance already included.");
    } else {
        await user.intolerances.addToSet(String);
    }
}

module.exports.verifyPassword = async (user, password) => {
    user.comparePassword(password, function(err, isMatch) {
        if(err) throw err;
        if(!isMatch) throw new Error("Incorrect username or password.");
    });
}

module.exports.obtainUserInfo = async (username, password) => {
    const doc = await User.findOne({username: username});
    if (doc === null) throw new Error("Incorrect username or password.");
    this.verifyPassword(doc, password);
    const omitPassword = await JSON.parse(JSON.stringify(doc));
    delete omitPassword.password;
    return omitPassword;
}