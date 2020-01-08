// check if we're running in production enviroment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

// modules
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 16200;
// to store users 
const users = [];

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
/* app.use(myConnection(mysql, {
    host: 'xav-p-mariadb01.xavizus.com',
    user: 'Moohammad',
    password: 'oq14XwiHjk9TygJP',
    database: 'Moohammad',
    port: 16200
}, 'single')); */
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudappdb',
}, 'single'));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// import 
const crudRouter = require('./routes/crud');
const initializePassport = require('./passport-config.js');

// init passport
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

// routes
app.use('/crud', checkAuthenticated, crudRouter);

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {
        nameVar: req.user.name
    });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});