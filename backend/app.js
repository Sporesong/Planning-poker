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
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/login", loginRouter);

let voteResults = [];

io.on('connection', (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on('votes', (data) => {
        voteResults.push(data);
        console.log('Votes: ', voteResults);
        io.emit('votes', data);
        //get average story points
        let sumOfPoints = voteResults.map(data => data.storyPoint).reduce((prev, next) => prev + next);
        let sumOfAverage = Math.round(sumOfPoints / (voteResults.length))
        //get closest
        const allowedNumbers = [0, 1, 3, 5, 8]
        let closest = allowedNumbers.reduce(function(prev, curr) {
           return (Math.abs(curr - sumOfAverage) < Math.abs(prev - sumOfAverage) ? curr : prev);
        });
        io.emit('averageVotes', closest);
    });

    socket.on('userLogin', (user) => {
        GLOBAL_USERS.push(user);
        console.log('Online users:', GLOBAL_USERS);

        io.emit('updateOnlineUsers', GLOBAL_USERS);
    });
});

module.exports = { app: app, server: server };
