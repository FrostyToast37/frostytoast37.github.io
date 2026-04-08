const outputDiv = document.getElementById("output");

async function logout() {
  try {
    const res = await fetch("/aMessage/api/logout", {
      method: "POST"
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Logout Failed");
    } else if (data.success === true) {
      outputDiv.textContent = data.message;
      window.location.href = "/index.html";
    } else {
      outputDiv.textContent = "Yeah idk how the heck you got here"
    }
    
  } catch (err) {
    outputDiv.textContent = err.message;
  }
}

logout();