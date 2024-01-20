//////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES & CONNECTION
//////////////////////////////////////////////////////////////////////////////////
const mongoose = require("./connection.js")

//////////////////////////////////////////////////////////////////////////////////
// DEFINE MODEL
//////////////////////////////////////////////////////////////////////////////////

// destructure Schema and model into their own variables
// const {Schema, model} = mongoose
// above is the same as two lines below
// const Schema = mongoose.Schema
// const model = mongoose.model

const movieSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Released: String,
    Actors: String,
    Plot: String,
    Poster: String,
    username: String,
    Watched: String,
}, {timestamps: true});

// Model - object for interacting with the db
const Movie = mongoose.model("Movie", movieSchema)

// Export Model
module.exports = Movie