import { renderHeader } from "./header.ts";

export function renderLogin() {
  const loginContainer = document.getElementById("loginContainer");

  const loginWrapper = document.createElement("div");
  loginWrapper.id = "loginWrapper";

  const loginForm = document.createElement("form");
  loginForm.id = "loginForm";

  const usernameLabel = document.createElement("label");
  usernameLabel.id = "usernameLabel";
  usernameLabel.innerText = "Username";

  const usernameInput = document.createElement("input");
  usernameInput.id = "usernameInput";
  usernameInput.type = "text";

  const passwordLabel = document.createElement("label");
  passwordLabel.id = "passwordLabel";
  passwordLabel.innerText = "Password";

  const passwordInput = document.createElement("input");
  passwordInput.id = "passwordInput";
  passwordInput.type = "password";

  const loginButton = document.createElement("button");
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

        const requestHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        console.log(requestHeaders);

        // Clear the loginContainer after successful login
        loginContainer.innerHTML = "";

        // Render the header after successful login
        renderHeader();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Failed to log in: ${err.message}`);
    }
  });

  loginContainer?.append(loginWrapper);
  loginWrapper.append(loginForm);
  loginForm.append(usernameLabel, usernameInput, passwordLabel, passwordInput, loginButton);
}
