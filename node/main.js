let test = document.getElementById("test");
let input = document.getElementById("chat_input");

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

async function sendChat(message) {
  socket.emit("msg", message);
}


socket.on("rsp", (res) => {
  test.innerText = res; // world
});

input.addEventListener("submit", (event) => {
  event.preventDefault();
})