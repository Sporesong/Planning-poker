import '../styles/style.css';
import { renderLogin } from './login';
import { updateHeader } from "./header";

document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("loginContainer")!;

  const token = localStorage.getItem("token");

  if (token) {
    loginContainer.innerHTML = ""; // Clear the login container
  } else {
    renderLogin(); // Render the login form
  }

  updateHeader(); // Render the header initially

});

