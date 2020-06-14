// server
const express = require("express")
const server = express()

// how to show files
server.use(express.static("public"))

// how to use template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// config routes
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu Marketplace de coleta de Resíduos"})
})

server.get("/create-point", (req, res) => {
   return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
 })

// start server
server.listen(3000) 