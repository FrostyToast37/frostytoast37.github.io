let menu = document.getElementById("nav-icon3");

menu.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menu.innerHTML += '<table> <tr><td id="home">Home</td></tr> <tr><td id="sign-up">Sign up</td></tr> <tr><td id="login">Login</td></tr> <tr><td id="log-out">Log Out</td></tr> </table>';