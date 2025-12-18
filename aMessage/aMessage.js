
const loginForm = document.getElementById("login_form");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const outputDiv = document.getElementById("output_div");

async function loadJSON() {
  try {
    // get file
    const logins = await fetch("/logins.json");

    // parse
    const parsedJSON = await logins.json();
    const accountList = parsedJSON.AccountInfo;

    return parsedJSON;

  } catch (error) {
    console.error("Error loading file:", error);
  }
}

class AccountInfo {
  constructor(password, username) {
    this.password = password;
    this.username = username;
  }
}

loadJSON();

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
