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
        res.render("movies/index.ejs", {movies})
    }catch(error) {
        console.log(error.message)
        // res.send("There was an error, read logs for error details")
    }
})

// NEW
router.get("/add", (req, res) => {
    res.render("movies/new.ejs")
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
        // res.send("Please enter a movie title")
        // figure out how to print message then redirect to /add
    }

})

    // build a link to movie API to get all movies matched, if not return message
    // res.redirect("/movies/add")

// CREATE/ADD
// router.post("/", async (req, res) => {
//     try{
//         // const title = req.body.Title
//         // const year = req.body.Year

//     }catch(error) {
//         console.log(error.message)
//         res.send("There was an error, read logs for error details")
//     }
// })

//////////////////////////////////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////////////////////////////////
module.exports = router