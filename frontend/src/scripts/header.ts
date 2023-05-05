const headerContainer = document.getElementById("loginContainer");

export function renderHeader() {
    let headerWrapper = document.createElement("div");
    headerWrapper.id = "headerWrapper";
    console.log("Den här körs")

    headerContainer?.append(headerWrapper);

    let logoutContainer = document.createElement("div");
    logoutContainer.id = "logout-container";

    let welcomeText = document.createElement("p");
    welcomeText.id = "welcome-text";

    const userName = localStorage.getItem("userName");
    if (userName) {
        const capUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
        welcomeText.innerText = `Welcome, ${capUserName}`;
    } else {
        welcomeText.innerText = `Welcome`;
    }

    let logoutButton = document.createElement("button");
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
}