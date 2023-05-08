const { compare } = require('bcryptjs');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./User')

module.exports.connectLocalDatabase = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/cravings-app')
}

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
                if(module.exports.verifyUserExists(username) === true)
                    throw new Error("E11000 duplicate key error collection: Username already exists")
                else if(!username)
                    throw new Error("User validation failed: username: Path `username` is required.");
        }    
     
}

module.exports.deleteUser = async (username) => {
    User.deleteOne({username: username}).then(() => console.log("deleted " + username))
    return true;
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

/**
 * Verifies if a username that is passed to the server exists in our database.
 */
module.exports.verifyUserExists = async(username) => {
    const doc = await User.findOne({username: username})

    if (doc === null) {
        return false;
    }

    return true;
}

/**
 * Probably deprecated
 */
module.exports.verifyPassword = async (user, password) => {
    user.comparePassword(password, function(err, isMatch) {
        if(err) {
            console.log(err)
        }

        if(!isMatch) {}
    });
}

module.exports.obtainUserInfo = async (username, password) => {
    const doc = await User.findOne({username: username});

    if (doc === null) {
        return null;
    } 
    
    const validPassword = await bcrypt.compare(password, doc.password)
    if (!validPassword) {
        return null;
    }

    const omitPassword = await JSON.parse(JSON.stringify(doc));
    delete omitPassword.password;
    return omitPassword;
}