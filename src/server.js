// server
const express = require("express")
const server = express()

// get db
const db = require("./database/db.js")

// how to show files
server.use(express.static("public"))

// habilty req body
server.use(express.urlencoded({ extended: true }))

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

server.post("/savepoint", (req, res) => {
    const query = `
            INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
    
       ) VALUES (?,?,?,?,?,?,?);
       `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items,
        ]
    
        function afterInsertData(err) {
            if(err) {
                return console.log(err)
            }
            console.log("Cadastrado com Sucesso")
            console.log(this)

            return res.send("ok")
        }
    
        db.run(query, values, afterInsertData) 
})

server.get("/search-results", (req, res) => {
    // get data from database

    db.all(`SELECT * FROM places`, function(err, rows) {
            if(err) {
                return console.log(err)
            }
            
            const total = rows.length

            // show data from database
            return res.render("search-results.html", { places : rows, total : total})
        })
 })

// start server
server.listen(3000) 