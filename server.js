//////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

const {DATABASE_URL, SECRET, PORT, URL_API} = process.env
const URL = URL_API


// Create App Object
const app = express()

//////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////
app.get("", (req, res) => {
    // res.send("It's alive!")
    res.redirect(`${URL}&i=tt3896198`)
})


//////////////////////////////////////////////////////////////////////////////////
// LISENTER
//////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})