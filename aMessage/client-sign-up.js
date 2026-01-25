const signUpForm = document.getElementById("sign-up-form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");

fetch("/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user: "alice",
    password: "1234"
  })
});

fetch("https://frostytoast37.cookiechaos.xyz/aMessage/server-sign-up.js", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    user: "john",
    password: "secret123"
  })
});