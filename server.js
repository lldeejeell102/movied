//////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const MovieRouter = require("./controllers/movie.js")
const UserRouter = require("./controllers/user.js")
const MongoStore = require("connect-mongo")




const {DATABASE_URL, SECRET, PORT, URL_API} = process.env
const URL = URL_API


// Create App Object
const app = express()

//////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////////////////////////////////////
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}))



//////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////
app.get("", (req, res) => {
    res.redirect("/movies")
})

app.use("/movies", MovieRouter)
app.use("/user", UserRouter)


//////////////////////////////////////////////////////////////////////////////////
// LISENTER
//////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})