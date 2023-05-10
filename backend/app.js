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
const registerRouter = require("./routes/register");


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
app.use("/register", registerRouter);

let ACTIVE_SESSION = {
  isActive: false,
  users: [],
  voteResults: []
};

GLOBAL_USERS = [];

io.on('connection', (socket) => { //när någon tar upp en klient
    console.log('user connected: ' + socket.id);

    socket.on('votes', (data) => {
        ACTIVE_SESSION.voteResults.push(data);
        console.log('Votes: ', ACTIVE_SESSION.voteResults);
        io.emit('votes', data);
        //get average story points
        let sumOfPoints = ACTIVE_SESSION.voteResults.map(data => data.storyPoint).reduce((prev, next) => prev + next);
        let sumOfAverage = Math.round(sumOfPoints / (ACTIVE_SESSION.voteResults.length))
        //get closest
        const allowedNumbers = [0, 1, 3, 5, 8]
        let closest = allowedNumbers.reduce(function(prev, curr) {
           return (Math.abs(curr - sumOfAverage) < Math.abs(prev - sumOfAverage) ? curr : prev);
        });
        io.emit('averageVotes', closest);
    });

    socket.on('userLogin', (user) => {
        GLOBAL_USERS.push(user);
        io.emit('updateOnlineUsers', GLOBAL_USERS);
    });

    socket.on('userLogout', (username) => {
      GLOBAL_USERS.forEach((user, index) => {
        if (user.username === username) {
          GLOBAL_USERS.splice(index, 1);
          console.log(`User ${username} logged out.`);
    
        }
      });
    });
    

    socket.on('userJoin', (user) => {
      ACTIVE_SESSION.users.push(user);
      if(user.username === "admin") {
        socket.data.admin = true;
      }
      // check if this user is an admin?
      // if (user_is_admin) {
      // socket.data.admin = true;
      //}
      io.emit('updateSessionUsers', ACTIVE_SESSION.users);
  });    

    socket.on('createSession', (tasks) => {
      ACTIVE_SESSION.isActive = true;
      ACTIVE_SESSION.tasks = tasks;
      io.emit('sessionActive');
      //io.emit('sessionActiveVote', ACTIVE_SESSION.tasks[0] ); uncomment this row to test on frontend!
    });

    socket.on('adminStartSession', () => {
      ACTIVE_SESSION.currentTaskIndex = 0;
      console.log(ACTIVE_SESSION);
      io.emit('startSession', {
        tasks: ACTIVE_SESSION.tasks,
        currentTaskIndex: ACTIVE_SESSION.currentTaskIndex
      });
      console.log('admin started session');
      startSession();
    })

    socket.on('adminUpdateCurrentTask', () => {
      ACTIVE_SESSION.currentTaskIndex++;
      if (ACTIVE_SESSION.tasks.length == (ACTIVE_SESSION.currentTaskIndex+1)) {
        console.log('slut på tasks!');
        io.sockets.sockets.forEach((socket) => {
            if (socket.data && socket.data.admin) {
              socket.emit('disableNextTaskBtn');
            }

        })
      }
      io.emit('updateCurrentTask', {
        tasks: ACTIVE_SESSION.tasks,
        currentTaskIndex: ACTIVE_SESSION.currentTaskIndex
      });
    })

    socket.on('adminEndSession', () => {
      ACTIVE_SESSION = {
        isActive: false,
        users: [],
        voteResults: []
      };

      io.emit('sessionEnded');
    })

});

function startSession() {

}


module.exports = { app: app, server: server };
