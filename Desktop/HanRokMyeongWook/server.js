var firebase = require("firebase/app");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhDAsu763cvxiR7cyHxYm5onM8Q0AwR6Y",
  authDomain: "jnu-test.firebaseapp.com",
  projectId: "jnu-test",
  storageBucket: "jnu-test.appspot.com",
  messagingSenderId: "1085946242507",
  appId: "1:1085946242507:web:4f9232c942ccab7ea0424e",
  measurementId: "G-N8GDG17QZC"
};
require("firebase/auth");
require("firebase/firestore");
//const email = require('./public/js/test.js');
//console.log(email);
//const test = require('./public/test.html')
// require("email");
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
//db.collection('users').doc(email).set({1:1})


// var foo = require('./public/test.html');
// foo();


const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';













class City {
  constructor (name) {
      this.name = name;
      //this.sid = sid;
      //this.major = major;
  }
  toString() {
    return this.name;
    //return this.name + ', ' + this.sid + ', ' + this.major;
  }
}

// Firestore data converter
var cityConverter = {
  toFirestore: function(city) {
      return {
          name: city.name,
          //sid: city.sid,
          //major: city.major
          };
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new City(data.name);
      //return new City(data.name, data.sid, data.major);
  }
};

var fuck;

db.collection("Users").doc("kevin7498@naver.com")
.withConverter(cityConverter)
.get().then((doc) => {
  if (doc.exists){
      // Convert to City object
      fuck = doc.data();
      // Use a City instance method
      console.log(fuck.toString());
  } else {
      console.log("No such document!");
  }}).catch((error) => {
  console.log("Error getting document:", error);
  });
















// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
