let test = document.getElementById("test");
const form = document.getElementById("chat_form");
const input = document.getElementById("chat_input");

const loadForm = document.getElementById("load_form");
const loadInput = document.getElementById("load_input");

const receivedMessages = document.getElementById("received_messages");
const dmForm = document.getElementById("dm_form");
const dmAddress = document.getElementById("dm_address");
const dmContent = document.getElementById("dm_content");

const socket = io();

//get session data
  async function getSession() {
    try {
      const sessionRes = await fetch("/api/aMessage/sessionData", {
      method: "GET",
      credentials: "include"});
      return await sessionRes.json(); 
    } catch (err) {
      test.innerHTML = "Error: " + err.message;
      return null;
    } 
  }
  let user = null;
  async function init() {
    user = await getSession();
  }

  //init funcs
  init();
  
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
  function readDM(messageID, messageSender) {
    const data = { messageID, messageSender }
    socket.emit("read", data);
  }
  async function loadMessages(to) {
    const from = user.username;
    const res = await fetch(`/api/aMessage/loadMessages/${to}`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json()

    if (data.success) { 
      data.logs.forEach(msg => {
        const { id, sender_username, receiver_username, message_content, read_at, created_at } = msg;
        
        const p = document.createElement("p");
        p.setAttribute("data-id", id);
        // textContent treats everything as plain text, preventing XSS
        if (sender_username === user.username) {
          p.textContent = `${created_at}: You --> ${receiver_username}: ${message_content}`;
          p.setAttribute("class", "sent");
        } else {
          p.textContent = `${created_at}: ${sender_username} --> You: ${message_content}`;
          p.setAttribute("class", "received");
        }

        receivedMessages.appendChild(p);
      });
    }
  }

  //listeners
  socket.on("receive_dm", (data) => {
    const { to, from, message, msg_id, timestamp } = data;

    const p = document.createElement("p");
    p.setAttribute("data-id", msg_id);
    // textContent treats everything as plain text, preventing XSS
    if (from === user.username) {
      p.textContent = `${timestamp}: You --> ${to}: ${message}`;
      p.setAttribute("class", "sent");
    } else {
      p.textContent = `${timestamp}: ${from} --> You: ${message}`;
      p.setAttribute("class", "received");
    }

    receivedMessages.appendChild(p);
  });

//form listeners
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChat(input.value);
  })

  dmForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendDM(dmAddress.value, dmContent.value);
    dmContent.value = "";
    dmForm.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  loadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loadMessages(loadInput.value);
  })