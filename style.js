let menu = document.getElementById("drop-menu");

menu.insertAdjacentHTML('beforeend', '<div id="menu-list"><table> <tr><td id="home"><a href="/index.html">Home<a/></td></tr> <tr><td id="sign-up"><a href="/aMessage/sign-up.html">Sign Up<a/></td></tr> <tr><td id="login"><a href="/aMessage/login.html">Login<a/></td></tr> <tr><td id="log-out"><a href="/aMessage/log-out.html">Log Out<a/></td></tr> </table></div>');

let icon = document.getElementById("nav-icon3");
let menuList = document.getElementById("menu-list");

icon.addEventListener("click", () => {
  icon.classList.toggle("open");
  menuList.classList.toggle("open");
});

