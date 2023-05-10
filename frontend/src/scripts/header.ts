const headerContainer = document.getElementById("headerContainer");
import { socket } from "./socket";

export function updateHeader() {
  let headerWrapper = document.getElementById("headerWrapper");

  // If the header elements already exist, remove them
  if (headerWrapper) {
    headerContainer?.removeChild(headerWrapper);
  }

  // Create the header elements
  headerWrapper = document.createElement("div");
  headerWrapper.id = "headerWrapper";

  // Create and configure the logo image
  const logoImg = document.createElement("img");
  logoImg.src = "cards-logo.png";
  logoImg.alt = "Planning Poker Logo";
  logoImg.classList.add("logo-image-small");

  // Append the logo image to the header container
  headerWrapper.appendChild(logoImg);

  const userName = localStorage.getItem("userName");

  if (userName) {
    const capUserName = userName.charAt(0).toUpperCase() + userName.slice(1);

    // Create and configure the welcome text
    const welcomeText = document.createElement("p");
    welcomeText.id = "welcome-text";
    welcomeText.innerText = `Welcome, ${capUserName}`;

    // Create and configure the logout button
    const logoutContainer = document.createElement("div");
    logoutContainer.id = "logout-container";

    const logoutButton = document.createElement("button");
    logoutButton.id = "logoutButton";
    logoutButton.classList.add("headerButton");
    logoutButton.innerHTML = "Logout";

    logoutButton.addEventListener("click", function () {
      const username = localStorage.getItem("userName");
      socket.emit("userLogout", username);
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      location.reload();
    });

    // Append the welcome text and logout button to the header container
    headerWrapper.appendChild(welcomeText);
    logoutContainer.appendChild(logoutButton);
    headerWrapper.appendChild(logoutContainer);
  }

  // Append the header wrapper to the header container
  headerContainer?.appendChild(headerWrapper);
}

export function renderHeader() {
  updateHeader();
}

// Render the initial header
renderHeader();
