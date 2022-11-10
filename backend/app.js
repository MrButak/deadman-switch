var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Allow requests from Vue front end
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', express.static(path.join(__dirname, 'frontend', 'public', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'frontend', 'public', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'frontend', 'public', 'dist', 'js')));

app.use('/', indexRouter);

module.exports = app;
