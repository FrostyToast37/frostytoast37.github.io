
const loginForm = document.getElementById("login_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");

class AccountInfo {
  constructor(password, username) {
    this.password = password;
    this.username = username;
  }
}


loginForm.addEventListener("submit", function (event){
  event.preventDefault();
  let tempUser = usernameInput.value;
  let tempPass = passwordInput.value;

})
