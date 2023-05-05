import './style.css'


import { renderLogin } from './login';
import { renderHeader } from "./header";
import { renderAdminCreateView } from './adminView';

renderHeader()
renderLogin()
renderAdminCreateView();

// const token = localStorage.getItem("token");
// if (token) {
//   renderHeader();

//   window.addEventListener("load", () => {
//     headerContainer.style.display = "block";
//   });
// } else {
//   renderLogin();
// }



