import '../styles/style.css';
import { renderLogin } from './login';
import { renderHeader } from "./header";
import { renderAdminCreateView } from './adminView';
import { renderTeamView } from './teamview';

const loginContainer = document.getElementById("loginContainer") as HTMLElement;

const token = localStorage.getItem("token");

renderHeader(); // Render the header initially

if (token) {
  loginContainer.innerHTML = ""; // Clear the login container
} else {
  renderLogin(); // Render the login form
}
renderAdminCreateView();
renderTeamView();
