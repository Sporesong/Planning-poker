const headerContainer = document.getElementById("headerContainer") as HTMLElement;

export function renderHeader() {
    const headerWrapper = document.createElement("div");
    headerWrapper.id = "headerWrapper";
    console.log("Den här körs");
  
    const logoutContainer = document.createElement("div");
    logoutContainer.id = "logout-container";
  
    const welcomeText = document.createElement("p");
    welcomeText.id = "welcome-text";
  
    const userName = localStorage.getItem("userName");
    if (userName) {
      const capUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
      welcomeText.innerText = `Welcome, ${capUserName}`;
    } else {
      welcomeText.innerText = `Welcome`;
    }
  
    const logoutButton = document.createElement("button");
    logoutButton.id = "logoutButton";
    logoutButton.classList.add("headerButton");
    logoutButton.innerHTML = "Logout";
  
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      location.reload();
    });
  
    headerWrapper.append(welcomeText, logoutContainer);
    logoutContainer.append(logoutButton);
    headerContainer.appendChild(headerWrapper);

    const imgContainer = document.getElementById("imgContainer");
    const logoWrapper = document.createElement("div");
    logoWrapper.id = "logoWrapper";

    const logoImg = document.createElement("img");
    logoImg.src = "cards-logo.png";
    logoImg.alt = "Planning Poker Logo";
    logoImg.classList.add("logo-image-small");

    logoWrapper.append(logoImg);
    imgContainer?.append(logoWrapper);
  }
  