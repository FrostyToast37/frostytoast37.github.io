let test = document.getElementById("test");

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