const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  //outputRoomName(room);
  //outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += '   ' + `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = "새 채팅방";
// }

/*"https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js";
"https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js";
"https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js";
"https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js";

const collection = "Users"
const firebaseConfig = {
    apiKey: "AIzaSyDhDAsu763cvxiR7cyHxYm5onM8Q0AwR6Y",
    authDomain: "jnu-test.firebaseapp.com",
    projectId: "jnu-test",
    storageBucket: "jnu-test.appspot.com",
    messagingSenderId: "1085946242507",
    appId: "1:1085946242507:web:4f9232c942ccab7ea0424e",
    measurementId: "G-N8GDG17QZC"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var standard;
db.collection('Users').doc("kevin7498@naver.com").get().then((mine)=>{
    standard = mine.data().name;
    //document.getElementById("profile").innerHTML=mine.data().name;
    //console.log(standard);
})*/



        
// Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText =  user.username;
//     userList.appendChild(li);
//   });
// }

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('정말로 나가시겠습니까?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
