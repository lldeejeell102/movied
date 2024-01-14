//////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////////
const express = require("express")
const Movie = require("../models/Movie.js")


//////////////////////////////////////////////////////////////////////////////////
// ROUTER
//////////////////////////////////////////////////////////////////////////////////
const router = express.Router()


//////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
    console.table(req.session)
    if(req.session.loggedIn){
        next()
    } else{
        res.redirect("/user/signup")
    }
})

//////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////
// SEED
router.get("/seed", async (req, res) => {
    try{
        const startMovie = [
            { Title: "Autobiography 1", Year: 2024, Released: "01 Jan 2024", Actors: "Daniel Ji, Dan Ji", Plot: "The main character, Daniel Ji, shows off his hot mess of a life", Poster: "https://i.imgur.com/hXZxSmM.png", username: "user1"}
        ]
        await Movie.deleteMany({})
        const movies = await Movie.create(startMovie)
        res.json(movies)
    } catch(error){
        console.log(error.message)
        res.send("There was an error, read logs for error details")
    }
})

// INDEX
router.get("/", async (req, res) => {
    try{
        // const username = req.session.username
        // const movies = await Movie.find({username})
        res.render("movies/index.ejs")
    }catch(error) {
        console.log(error.message)
        // res.send("There was an error, read logs for error details")
    }
})

//////////////////////////////////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////////////////////////////////
module.exports = router