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
var roomName = localStorage.getItem("roomName")

function send(){
      var msg = document.getElementById("mensagem").value
      firebase.database().ref(`/kwitter/${roomName}`).push({
            name:userName,
            mensagem:msg,
            like:0
      })
document.getElementById("mensagem").value = ""
}

function getData() { firebase.database().ref("/kwitter/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
console.log(firebaseMessageId)
console.log(messageData)

var nome = messageData ["name"]
var msg = messageData ["mensagem"]
var like = messageData ["like"]
var exibirNome = `<h4>${nome} <img class="user_tick" src="tick.png"></h4>`
var exibirMensagem = `<h4 class="message_h4"> ${msg} </h4>`
var botaoLike = `<button class="btn btn-warning" id="${firebaseMessageId}" value="${like}" onclick="updateLike(this.id)">`
var iconeLike = `<span class="glyphicon glyphicon-thumbs-up">like: ${like} </span></button> <hr> `
var row = exibirNome + exibirMensagem + botaoLike + iconeLike

document.getElementById("output").innerHTML += row

//Fim do código
      } });  }); }
getData();

function updateLike(id){
var likes = document.getElementById(id).value
var likesAtt = Number(likes) + 1
firebase.database().ref("/kwitter/" + roomName).child(id).update({
      like: likesAtt
})
}

function logout(){
localStorage.removeItem("usuário")
localStorage.removeItem("roomName")
window.location = "index.html"
}

