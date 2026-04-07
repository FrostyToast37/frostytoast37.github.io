let menu = document.getElementById("nav-icon3");

menu.addEventListener("click", () => {
  menu.classList.toggle("open");
});

body.innerHTML += 
<table>
  <td id="home">Home</td>
  <td id="sign-up">Sign up</td>
  <td id="login">Login</td>
  <td id="log-out">Log Out</td>
</table>;