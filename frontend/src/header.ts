const headerContainer = document.getElementById("header");

export function renderHeader() {
    let headerWrapper = document.createElement("div");
    headerWrapper.id = "headerWrapper";

    headerContainer?.append(headerWrapper);

    let logoutContainer = document.createElement("div");
    logoutContainer.id = "logout-container";

    let welcomeText = document.createElement("p");
    welcomeText.id = "welcome-text";

    const userName = localStorage.getItem("userName");
    if (userName) {
        const capUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
        welcomeText.innerText = `Välkommen, ${capUserName}`;
    } else {
        welcomeText.innerText = `Välkommen`;
    }

    let logoutButton = document.createElement("button");
    logoutButton.id = "logoutButton";
    logoutButton.classList.add("headerButton");
    logoutButton.innerHTML = "Logga ut";

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        location.reload();
      });

      headerWrapper.append(welcomeText);
      headerWrapper.append(logoutContainer);
      logoutContainer.append(logoutButton);
}