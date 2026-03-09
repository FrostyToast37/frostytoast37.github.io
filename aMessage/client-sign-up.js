const signUpForm = document.getElementById("sign_up_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");


async function signup(createdUser, createdPassword) {
  try {
    const res = await fetch("/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: createdUser,
        password: createdPassword
      })
    });


    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Registration Failed :(");
    } else if (data.success) {
    window.location.href = "/main";
    }
    outputDiv.textContent = "Registration Success!"
  } catch (err) {
    outputDiv.textContent = err.message;
  }
}

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  signup(usernameInput.value, passwordInput.value);
});