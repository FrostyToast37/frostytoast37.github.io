
const loginForm = document.getElementById("login_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");
let tempJSON  = fetch("/logins.json");

class AccountInfo {
  constructor(password, username) {
    this.password = password;
    this.username = username;
  }
}

let accountList = JSON.parse(tempJSON)

loginForm.addEventListener("submit", function (event){
  event.preventDefault();
  let tempUser = usernameInput.value;
  let tempPass = passwordInput.value;

  let outputFlag;
  listCheck: for (const AccountObj of accountList) {
    if (AccountObj.username === tempUser) {
      if (AccountObj.password === tempPass) {
        outputFlag = "Logged In";
        break listCheck;
      }  else {outputFlag = "Wrong Password";}
    } else {outputFlag = "That Username doesn't exist";}
  }
  outputDiv.innerHTML = outputFlag;
})
