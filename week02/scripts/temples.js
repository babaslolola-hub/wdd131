const menuButton = document.getElementById("menu-button");

const navMenu = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {

        menuButton.textContent = "X";

    } else {

        menuButton.textContent = "☰";

    }

});

document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;