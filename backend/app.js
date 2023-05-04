var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let voteResults = [];

io.on('connection', (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on('votes', (data) => {
        voteResults.push(data);
        console.log('Votes: ', voteResults);
        // console.log("Users: ", users[1].user);
        io.emit('votes', voteResults);
    });

});

module.exports = app;
