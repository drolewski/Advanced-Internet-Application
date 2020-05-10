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


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
