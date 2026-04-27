let test = document.getElementById("test");
const form = document.getElementById("chatdocumnet_form");
const input = document.getElementById("chat_input");

const recievedMessages = document.getElementById("received_messages");
const dmForm = document.getElementById("dm_form");
const dmAddress = document.getElementById("dm_address");
const dmContent = document.getElementById("dm_content");

const socket = io();

//testing
async function testFunc() {
  try {
    const res = await fetch("/api/aMessage/main", {
      method: "POST",
    });

    const data = await res.json();
    const user = data.username;

    test.innerHTML = `Hey ${user}! You successfully logged in!`;
  } catch (err) {
      console.error(err);
  }
}
function sendChat(message) {
  socket.emit("msg", message);
}
socket.on("rsp", (res) => {
  test.innerText = res; // world
});

//dms
  //senders func
  function sendDM(to, content) {
    const data = { to, content };
    socket.emit("send_dm", data);
  }
  function readDM(ID, to) {
    const data = { ID, to }
    socket.emit("read", data);
  }

  //listeners
  socket.on("receive_dm", (data) => {
    const { from, message, msg_id, timestamp } = data;
    recievedMessages.innerHTML += `<p data-id="${msg_id}">${timestamp}:\n${from} said: ${message}</p>`
  });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChat(input.value);
})

dmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDM(dmAddress.value, dmContent.value);
});