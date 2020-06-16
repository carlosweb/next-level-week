//import
const sqlite3 = require("sqlite3").verbose()

// init data
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// how to use the data object for operations
// db.serialize( () => {
//     // create table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // insert data on table
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items

//     ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1565886728041-a239b6a3ec42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim America",
//         "Numero 280",
//         "Salvador",
//         "Bahia",
//         "Papeis e Papelão"
//     ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com Sucesso")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData) 
        
    //Consult data on table
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    // Delete data on table
    // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro Deletado com Sucesso")
    // })
// })