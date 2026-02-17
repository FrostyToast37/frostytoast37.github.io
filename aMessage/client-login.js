const loginForm = document.getElementById("login_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");

async function login(user, password) {
  try {
    const res = await fetch("http://localhost:3000/datacheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        password: password
      })
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Login Failed, check your password");
    }
    outputDiv.textContent = "Login Success!"
  } catch (err) {
    outputDiv.textContent = err.message;
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  login(usernameInput.value, passwordInput.value);
});