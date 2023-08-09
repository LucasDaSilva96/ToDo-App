const menuBtn = document.querySelector(".menu");
const sideBarSection = document.querySelector(".sideBar-section");
const closeModalSvg = document.querySelector(".close-svg");

import { renderProjects } from "./storage.js";

// This function is for showing the sideBar section and hide
// the other sections
export function menuSlider() {
  menuBtn.addEventListener("click", function () {
    renderProjects();
    sideBarSection.classList.toggle("slide-sideBar");

    if (sideBarSection.classList.contains("slide-sideBar")) {
      closeModalSvg.dataset.navigation = "sideBar";
    } else {
      closeModalSvg.dataset.navigation = "home";
    }
  });
}
