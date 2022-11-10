config = require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Allow requests from Vue front end
app.use(function (req, res, next) {

    if(process.env.APP_ENVIRONMENT == 'development') {
        res.header("Access-Control-Allow-Origin", "*");    
    }
    else if(process.env.APP_ENVIRONMENT == 'production') {
        res.header("Access-Control-Allow-Origin", "https://deadmanswitchapp.herokuapp.com/");  ;
    };

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'public', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'dist', 'js')));

app.use('/', indexRouter);

module.exports = app;
