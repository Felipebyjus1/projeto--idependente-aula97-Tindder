//ADICIONE SEUS LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDvr1q66OS1qwnRfh1zpWoe_TgKqKHdz7E",
  authDomain: "kwitter-9a700.firebaseapp.com",
  databaseURL: "https://kwitter-9a700-default-rtdb.firebaseio.com",
  projectId: "kwitter-9a700",
  storageBucket: "kwitter-9a700.appspot.com",
  messagingSenderId: "511601161157",
  appId: "1:511601161157:web:56fb973b856988ed7451ac"
};

firebase.initializeApp(firebaseConfig)

var userName = localStorage.getItem("usuário")
document.getElementById("exibirUsuário").innerHTML = "Bem vindo(a): " + userName
 
function addRoom(){
  var roomName = document.getElementById("roomName").value
  firebase.database().ref("/kwitter").child(roomName).update({
    purpose: "addRoom"
  })
  localStorage.setItem("roomName", roomName)
  window.location = "kwitterPage.html"
}

function getData() {
  firebase.database().ref("/kwitter").on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        roomNames = childKey;
        row = `<div class="roomName" id="${roomNames}" onclick="redirecionar(this.id)"> #${roomNames}</div> <hr>`
        document.getElementById("output").innerHTML += row
      });
    });
}

getData();

function redirecionar(sala){
  localStorage.setItem("roomName", sala)
  window.location = "kwitterPage.html"
}

function logout(){
  window.location = "index.html"
}
