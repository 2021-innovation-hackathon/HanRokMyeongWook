
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
  
  var fuck1;
  
  db.collection("Users").doc("kevin7498@naver.com")
  .withConverter(cityConverter)
  .get().then((doc) => {
    if (doc.exists){
        // Convert to City object
        fuck1 = doc.data();
        // Use a City instance method
        console.log(fuck1.toString());
    } else {
        console.log("No such document!");
    }}).catch((error) => {
    console.log("Error getting document:", error);
    });
  