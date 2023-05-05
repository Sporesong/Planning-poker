var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mysql = require("mysql2");
const connection = require("./conn");
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require("./routes/login");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/login", loginRouter);

module.exports = app;
