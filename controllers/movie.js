//////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////////
const express = require("express")
const Movie = require("../models/Movie.js")
const url = process.env.URL_API


//////////////////////////////////////////////////////////////////////////////////
// ROUTER
//////////////////////////////////////////////////////////////////////////////////
const router = express.Router()


//////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
    // console.table(req.session)
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
        const username = req.session.username
        const movies = await Movie.find({username})
        res.render("movies/index.ejs", {movies, username})
    }catch(error) {
        console.log(error.message)
        // res.send("There was an error, read logs for error details")
    }
})


// NEW
router.get("/add", (req, res) => {
    res.render("movies/new.ejs")
})


// CREATE/ADD
router.post("/", async (req, res) => {
    try{
        const poster = req.body.poster
        const title = req.body.title
        const year = req.body.year
        const actors = req.body.actors
        const plot = req.body.plot
        const released = req.body.released
        const username = req.session.username
        await Movie.create(
            {Title: title,
            Year: year,
            Released: released,
            Actors: actors,
            Plot: plot,
            Poster: poster,
            username: username,}
        )
        console.log()
        res.redirect("/movies")
    }catch(error) {
        console.log(error.message)
        res.send("There was an error, read logs for error details")
    }
})

// Delete
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    await Movie.findByIdAndDelete(id)
    res.redirect("/movies")
})


// SHOW
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const movie = await Movie.findById(id)
        res.render("movies/results.ejs")
    }catch(error) {
        console.log(error.message)
        res.send("There was an error, read logs for error details")
    }
})

// SEARCH
router.post("/results", async (req, res) => {
    let title = req.body.title
    let year = req.body.year
    if (title.length !== 0 && year.length !== 0){
        console.log("both inputs")
        title = req.body.title.toLowerCase().replaceAll(" ","+")
        year = req.body.year
        const apiRequest = (`${url}&t=${title}&y=${year}`)
        await fetch(apiRequest)
        .then(res => {
            return res.json();
        })
        .then(data => {
            res.render("movies/results.ejs", {data})
        })
    }
    if (title.length !== 0 && year.length === 0){
        console.log("title only")
        title = req.body.title.toLowerCase().replaceAll(" ","+")
        const apiRequest = (`${url}&t=${title}`)
        await fetch(apiRequest)
        .then(res => {
            return res.json();
        })
        .then(data => {
            res.render("movies/results.ejs", {data})
        })
    }
    if (title.length === 0 && year.length === 0){
        console.log("no inputs")
        res.redirect("/movies/add")
        // figure out how to print message then redirect to /add
    }
})
//////////////////////////////////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////////////////////////////////
module.exports = router