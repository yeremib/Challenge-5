const { equal } = require('assert')
const express = require('express')
const req = require('express/lib/request')
const app = express ()
const fs = require('fs')
const users = []
const port = 3000
const user = require('./db/user.json')
let isLogin = false


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use(express.static('Assets'));
app.use((req, res, next) => {
    if(req.url == "/game" && !isLogin) {
        res.redirect("/login")
    }
    next();
})

app.get("/home", (req, res) => {
    res.render("index.ejs")
})

app.get("/game", (req, res) => {
    res.render("game")
})

app.get("/login", (req, res) => {
    res.render("login", {
        error: '',
    })
})

app.post("/login", (req, res) => {
    if(user.username == req.body.myUsername && user.password == req.body.myPassword) {
        isLogin = true;
        res.redirect("/game");
    } else {
        res.render("login", {
            error: 'Your Email or Password was Wrong',
        })
    }
})

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "are you lost?"
    })
}

app.use(notFoundHandler)

app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})

