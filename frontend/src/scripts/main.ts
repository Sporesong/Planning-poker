import '../styles/style.css';


import { renderLogin } from './login';
import { renderHeader } from "./header";
import { renderAdminCreateView } from './adminView';
import { renderTeamView } from './teamview';

renderHeader()
renderLogin()
renderAdminCreateView();
renderTeamView();

// const token = localStorage.getItem("token");
// if (token) {
//   renderHeader();

//   window.addEventListener("load", () => {
//     headerContainer.style.display = "block";
//   });
// } else {
//   renderLogin();
// }



