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

            return res.render("create-point.html", { saved : true })
        }
    
        db.run(query, values, afterInsertData) 
})


// server.get("/search", (req, res) => {
//     const search = req.query.search
//     if(search == "") {
//         return res.render("search-results.html", { total : 0 })
//     }

// })

server.get("/search", (req, res) => {
    // get data from database

    const search = req.query.search
    if(search == "") {
        return res.render("search-results.html", { total : 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows) {
            if(err) {
                console.log(err)
                return res.send("Erro no Cadastro")
            }
            
            const total = rows.length

            // show data from database
            return res.render("search-results.html", { places : rows, total : total})
        })
 })

// start server
server.listen(3000) 