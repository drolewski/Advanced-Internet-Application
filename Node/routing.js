const express = require('express');
const router = express.Router();
const mysql = require('mysql')

module.exports = router;

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

router.get('/shop', (req, res) => {
    let sql = 'SELECT *, count(*) AS Ilosc FROM express.books group by Title'
    let query = connection.query(sql, (err, result) => {
        if (err) throw err
        res.render('index', { 'books': result })
    })
})

router.post('/add/:bookid', (req, res) =>{
    if(!req.session.cart){
        req.session.cart = []
    }
    let sql = `SELECT * FROM express.books WHERE id = ?`
    let query = connection.query(sql, [req.params.bookid], (err, result) => {
        if (err) throw err

        if(result.length <= 0 || result[0].quantity <= 0) {
            res.redirect('/shop', 204)
        } else{
            let redir = false;
            let record = result[0]
            let inCart = false;
            for(var i = 0; i < req.session.cart.length; i++){
                if(req.session.cart[i].title === record.Title) {
                    if(result[0].quantity <= req.session.cart[i].count){
                        redir = true;       
                    }
                    if(!redir){
                        req.session.cart[i].count++
                        inCart = true;
                    }
                }
            }
            if(!redir){
                if(!inCart){
                    let book = {
                        id: record.id,
                        title: record.Title,
                        author: record.Author,
                        pageNum: record.PagesNum,
                        price: record.price,
                        count: 1
                    }
                    req.session.cart.push(book)
                }
            }
            if(redir){
                res.redirect('/shop', 204) 
            }else{
                res.redirect('/shop', 200)
            }
        }
    })
})

router.get('/cart', (req, res) => {
    let totalPrice = 0
    if(!req.session.cart){
        req.session.cart = []
    }
    for(let i = 0; i < req.session.cart.length; i++){
        totalPrice += req.session.cart[i].price * req.session.cart[i].count
    }
    res.render('cart', { 'books': req.session.cart, 'totalPrice': totalPrice })
})

router.post('/cart/buy', (req, res) => {
    let sql
    req.session.cart.forEach((item) => {
        sql = `UPDATE express.books SET quantity = (quantity - ?) where id = ?`
        let query = connection.query(sql, [item.count, item.id], (err, result) => {
            if (err) throw err
        })
    })
    req.session.cart = []
    res.redirect('/shop', 200)
})

router.post('/cart/delete/:id', (req, res) => {
    for(let i = 0; i < req.session.cart.length; i++){
        if(req.session.cart[i].id == req.params.id){
            req.session.cart.splice(i, 1)
        }
    }
    res.redirect('/cart', 200)
})

router.post('/cart/delete', (req, res) => {
    cart = []
    res.redirect('/shop', 200)
})

router.get('/', (req, res) => res.send('Hello World!'))