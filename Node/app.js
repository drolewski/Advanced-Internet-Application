const express = require('express')
const routing = require('./routing');
const path=require('path')
const app = express()
const port = 3000
const parser=require('body-parser')
var session=require('express-session')


app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized:true
}));
app.use(express.static(path.join(__dirname,"public")));
app.use(parser.urlencoded({extended:false}))
app.use('/', routing);
app.use(parser.json());
app.set('view engine', 'ejs');

app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}: ${new Date()}`);
    next();
})
initDb()
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function initDb(){
    var mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'dominik4',
        database: 'express',
        insecureAuth : true
    })
    connection.connect((err) => {
        if(err) throw err
        console.log('MySQL connected...')
    })
    let sql = 'CREATE DATABASE IF NOT EXISTS `express`'
    let query = connection.query(sql, (err) => {
        if (err) throw err
        console.log('Database Created')
    })


    // ????? zamiast konkretnych danych


    sql = 'CREATE TABLE IF NOT EXISTS `express`.`books` (`id` INT NOT NULL AUTO_INCREMENT, `Title` VARCHAR(45) NULL DEFAULT NULL,' +
            '`Author` VARCHAR(45) NULL DEFAULT NULL,`PagesNum` INT NULL DEFAULT NULL,`quantity` INT NULL DEFAULT NULL,`price` DECIMAL(5,2) NULL DEFAULT \'9.99\','+
            'PRIMARY KEY (`id`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci'
    query = connection.query(sql, (err) => {
        if (err) throw err
        console.log('Table Created')
    })
    sql = 'insert into express.books(Title, Author, PagesNum, quantity, price) VALUES (?,?,?,?,?);'
    query = connection.query(sql, ['Gra o Tron','G.R.R. Martin',971,33, 49.22], (err) => {
        if (err) throw err
        console.log('Gra o tron added')
    })
    sql = 'insert into express.books(Title, Author, PagesNum, quantity, price) VALUES (?,?,?,?,?);'
    query = connection.query(sql, ['Diuna','Frank Herbert',891,2, 39.22], (err) => {
        if (err) throw err
        console.log('Diuna added')
    })
    sql = 'insert into express.books(Title, Author, PagesNum, quantity, price) VALUES (?,?,?,?,?);'
    query = connection.query(sql, ['To','Stephen King',1024,3, 29.22], (err) => {
        if (err) throw err
        console.log('To added')
    })
}
