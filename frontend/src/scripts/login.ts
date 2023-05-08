
// import { renderHeader } from "./header.js";

import { renderTeamView } from "./teamview";
import { renderAdminCreateView } from "./adminView";

export function renderLogin() {

const loginCont = document.getElementById("loginContainer") as HTMLElement;
// const mainContainer = document.getElementById("headerContainer") as HTMLElement;

  let loginWrapper = document.createElement("div");
  loginWrapper.id = "loginWrapper";

  let logoWrapper = document.createElement("div");
  logoWrapper.id = "logoWrapper";

  loginWrapper.append(logoWrapper);

  let loginLogoImg = document.createElement("img");
  loginLogoImg.src = "cards-logo.png";
  loginLogoImg.alt = "Planning Poker Logo";
  loginLogoImg.classList.add("logo-image-small");

  logoWrapper.append(loginLogoImg);


  let loginForm = document.createElement("form");
  loginForm.id = "loginForm";

  let usernameLabel = document.createElement("label");
  usernameLabel.id = "usernameLabel";
  usernameLabel.innerText = "Username";

  let usernameInput = document.createElement("input");
  usernameInput.id = "usernameInput";
  usernameInput.type = "text";

  let passwordLabel = document.createElement("label");
  passwordLabel.id = "passwordLabel";
  passwordLabel.innerText = "Password";

  let passwordInput = document.createElement("input");
  passwordInput.id = "passwordInput";
  passwordInput.type = "password";

  let loginButton = document.createElement("button");
  loginButton.id = "loginButton";
  loginButton.type = "submit";
  loginButton.innerText = "Login";

  loginButton.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
      const username = usernameInput.value;
      const password = passwordInput.value;

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, userPassword: password }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("userName", username);

        if (username === "admin")
        renderAdminCreateView();
        else
        renderTeamView();

        const requestHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        console.log(requestHeaders)

        loginCont.innerHTML = "" as string;

        // mainContainer.style.display = "block";

        
        // renderHeader();
        
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Failed to log in: ${err.message}`);
    }
  });


  loginCont.append(loginWrapper);
  loginWrapper.append(loginForm);
  loginForm.append(usernameLabel, usernameInput, passwordLabel, passwordInput, loginButton);
}