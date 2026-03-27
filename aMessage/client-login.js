const loginForm = document.getElementById("login_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");

async function login(user, password) {
  try {
    const res = await fetch("/aMessage/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        username: user,
        password: password
      })
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Login Failed, check your password");
    } else if (data.success === true) {
      outputDiv.textContent = "Login Success!"
      window.location.href = "/aMessage/main";
    } else {
      outputDiv.textContent = "Yeah idk how the heck you got here"
    }
    
  } catch (err) {
    outputDiv.textContent = err.message;
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  login(usernameInput.value, passwordInput.value);
});