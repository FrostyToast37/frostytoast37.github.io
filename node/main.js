let test = document.getElementById("test");
const form = document.getElementById("chatdocumnet_form");
const input = document.getElementById("chat_input");

const receivedMessages = document.getElementById("received_messages");
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
  function sendDM(to, message) {
    const data = { to, message };
    socket.emit("send_dm", data);
  }
  function readDM(ID, to) {
    const data = { messageID, messageSender }
    socket.emit("read", data);
  }

  //listeners
  socket.on("receive_dm", (data) => {
    const { from, message, msg_id, timestamp } = data;

    const p = document.createElement("p");
    p.setAttribute("data-id", msg_id);
    // textContent treats everything as plain text, neutralizing scripts
    p.textContent = `${timestamp}: ${from} said: ${message}`;

    receivedMessages.appendChild(p);
  });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChat(input.value);
})

dmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDM(dmAddress.value, dmContent.value);
});