// modules
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();
const port = 3001;

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudappdb',
}, 'single'));

// settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// import routes
const crudRouter = require('./routes/crud');

// use routes
app.use('/crud', crudRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});