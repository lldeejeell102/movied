//////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////////////////
const express = require("express")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const { Cookie } = require("express-session")


//////////////////////////////////////////////////////////////////////////////////////////
// ROUTER
//////////////////////////////////////////////////////////////////////////////////////////
const router = express.Router()


//////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////////

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    try{
        // console.table(req.body)
        req.body.password = await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(10)
        )
        // console.log("Hased Password:", req.body.password)
        await User.create(req.body)
        res.redirect("/user/login")
    }catch(error) {
        console.log(error.message)
        res.send("There was an error, read logs for error details")
    }
})

router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", async (req,res) => {
    try{
        const {username, password} = req.body
        // console.log(username)
        const user = await User.findOne({username})
        if (!user){
            throw new Error("User Error: User Doesn't Exist")
        }
        const result = await bcrypt.compare(password, user.password)
        if (!result){
            throw new Error("User Error: Password Doesn't Match")
        }
        req.session.username = username
        req.session.loggedIn = true
        // console.log(req.session.username, req.session.loggedIn)
        // console.log("SUCCESS")
        res.redirect("/movies")
    }catch(error) {
        console.log(error.message)
        res.send("There was an error, read logs for error details")
    }
})


router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/user/login")
    })
})


//////////////////////////////////////////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////////////////////////////////////////
module.exports = router