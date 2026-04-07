let menu = document.getElementById("nav-icon3");
let menuList = document.getElementById("menu-list");

menu.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuList.classList.toggle("open");
});

body.innerHTML += '<div id="menu-list"><table> <tr><td id="home">Home</td></tr> <tr><td id="sign-up">Sign up</td></tr> <tr><td id="login">Login</td></tr> <tr><td id="log-out">Log Out</td></tr> </table></div>';