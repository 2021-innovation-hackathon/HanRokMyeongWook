

// //var user = require('public/test');

// //데이터 입력
// const data = {
//   name: '김정욱',
//   email: ' qjawls65@naver.com',
//   major: '소프트웨어공학전공'
// };

// const res = db.collection('Users').doc('175678').set(data);

// //데이터 불러오기
// var docRef = db.collection("cities").doc("LA");

// docRef.get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });


// //데이터 변환해서 출력
// class City {
//   constructor (state, country ) {
//       // this.name = name;
//       this.state = state;
//       this.country = country;
//   }
//   toString() {
//       return  this.state + ', ' + this.country;
//   }
// }

// // Firestore data converter
// var cityConverter = {
//   toFirestore: function(city) {
//       return {
//           // name: city.name,
//           state: city.state,
//           country: city.country
//           };
//   },
//   fromFirestore: function(snapshot, options){
//       const data = snapshot.data(options);
//       return new City(data.state, data.country);
//   }
// };

// db.collection("cities").doc("LA")
//   .withConverter(cityConverter)
//   .get().then((doc) => {
//     if (doc.exists){
//       // Convert to City object
//       var city = doc.data();
//       // Use a City instance method
//       console.log(city.toString());
//     } else {
//       console.log("No such document!");
//     }}).catch((error) => {
//       console.log("Error getting document:", error);
//     });



// //데이터 집합출력
// var citiesRef = db.collection("cities");

// citiesRef.doc("SF").set({
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });
// citiesRef.doc("LA").set({
//     name: "Los Angeles", state: "CA", country: "USA",
//     capital: false, population: 3900000,
//     regions: ["west_coast", "socal"] });
// citiesRef.doc("DC").set({
//     name: "Washington, D.C.", state: null, country: "USA",
//     capital: true, population: 680000,
//     regions: ["east_coast"] });
// citiesRef.doc("TOK").set({
//     name: "Tokyo", state: null, country: "Japan",
//     capital: true, population: 9000000,
//     regions: ["kanto", "honshu"] });
// citiesRef.doc("BJ").set({
//     name: "Beijing", state: null, country: "China",
//     capital: true, population: 21500000,
//     regions: ["jingjinji", "hebei"] });

//     db.collection("cities").where("capital", "==", true)
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });