const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        immutable: true,
    },
    intolerances: [String],
    favoriteRecipes: [String]
})

module.exports = mongoose.model("User", userSchema);