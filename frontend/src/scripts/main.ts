import '../styles/style.css';
import { renderLogin } from './login';
import { renderHeader } from "./header";
import { renderAdminCreateView } from './adminView';
import { renderTeamView } from './teamview';

const loginContainer = document.getElementById("loginContainer") as HTMLElement;
const cardsLogo = document.getElementById("cardsLogo") as HTMLElement;

const token = localStorage.getItem("token");

renderHeader(); // Render the header initially

if (token) {
  cardsLogo.style.display = "block"; // Show the PNG image
  loginContainer.innerHTML = ""; // Clear the login container
} else {
  renderLogin(loginContainer); // Pass the loginContainer to renderLogin
}
renderAdminCreateView();
renderTeamView();
