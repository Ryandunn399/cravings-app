const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongoServer = new MongoMemoryServer();

module.exports.connect = async () => {
    await mongoServer.start();
    const uri = mongoServer.getUri()
    await mongoose.connect(uri , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports.closeDatabase = async () => {
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