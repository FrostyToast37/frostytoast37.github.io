const signUpForm = document.getElementById("sign_up_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");

async function signup(createdUser, createdPassword) {
let debugText;
  try {
    const res = await fetch("/api/aMessage/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: createdUser,
        password: createdPassword
      })
    });

    const clone = res.clone(); // Clone the response so you can read it twice
    debugText = await clone.text(); 


    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Registration Failed :(");
    } else if (data.success) {
      outputDiv.textContent = "Registration Success!"
      window.location.href = "/aMessage/login.html"
    }
    
  } catch (err) {
    outputDiv.textContent = err.message;
    //outputDiv.textContent += ("\nFULL SERVER RESPONSE:", debugText);
  }
}

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  signup(usernameInput.value, passwordInput.value);
});