const clientDiscord = new Discord.Client();
const hook = new Discord.WebhookClient("", "");
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var date = new Date();
var h = addZero(date.getHours());
var m = addZero(date.getMinutes());
var s = addZero(date.getSeconds());
date = h + ":" + m + ":" + s;

firebase
  .database()
  .ref("messages")
  .on("child_removed", function (snapshot) {
    document.getElementById("message-" + snapshot.key).innerHTML =
      "Ce message a été supprimer";
  });

function deleteMessage(self) {
  var messageId = self.getAttribute("data-id");
  firebase.database().ref("messages").child(messageId).remove();
}
function sendMessage() {
  var message = document.getElementById("message").value;
  firebase.database().ref("messages").push().set({
    message: message,
    sender: myName,
  });
  hook.send(message + " par " + myName + " " + date);
  return false;
}
