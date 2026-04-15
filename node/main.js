let test = document.getElementById("test");
const form = document.getElementById("chat_form");
const input = document.getElementById("chat_input");

const socket = io();

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChat(input.value);
})