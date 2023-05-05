import './style.css'

import { renderLogin } from './login';
import { renderHeader } from "./header";

renderHeader()
renderLogin()

// const token = localStorage.getItem("token");
// if (token) {
//   renderHeader();

//   window.addEventListener("load", () => {
//     headerContainer.style.display = "block";
//   });
// } else {
//   renderLogin();
// }



