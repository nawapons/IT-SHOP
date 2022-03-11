const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const conn = require('./database');
const { body, validationResult } = require('express-validator');
const router = require('./routes/pages');
const tools = require('./routes/tools')
var session = require('express-session')
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    createParentPath: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 //set 1hr timeout
}))


//declair middleware
app.use(function(req, res, next) {
    res.locals.fname = req.session.fname;
    res.locals.lname = req.session.lname;
    res.locals.UserID = req.session.UserID;
    res.locals.role = req.session.role;
    res.locals.cartCount = req.session.cartCount;
    next();
  });

app.use(session({
    secret: 'keyboard b',
    resave: false,
    saveUninitialized: true
}))


app.use(router);
//Difine Routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/search',require('./routes/search'));


//Logout 
app.get('/logout', (req, res) => {
    //session destroy
    req.session = null;
    res.redirect('/');
})


app.listen(3000, () => console.log("Server is running!"));

