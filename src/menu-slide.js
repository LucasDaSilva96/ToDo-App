const menuBtn = document.querySelector(".menu");
const sideBarSection = document.querySelector(".sideBar-section");
const closeModalSvg = document.querySelector(".close-svg");

import { checkWhichDayIsClicked } from "./add-task-modal.js";
import { renderProjects } from "./storage.js";
import { taskDoneFunction } from "./add-task-modal.js";
import { renderPeriodTasks } from "./render-sidebar-task.js";

// *******
const sideBar_today = document.querySelector(".sideBar-today");
const sideBar_week = document.querySelector(".sideBar-week");
// *******

// This function is for showing the sideBar section and hide
// the other sections
export function menuSlider() {
  menuBtn.addEventListener("click", function () {
    renderProjects();
    sideBarSection.classList.toggle("slide-sideBar");

    if (sideBarSection.classList.contains("slide-sideBar")) {
      closeModalSvg.dataset.navigation = "sideBar";
      renderPeriodTasks("today");
    } else {
      checkWhichDayIsClicked();
      closeModalSvg.dataset.navigation = "home";
      taskDoneFunction();
    }

    // ***
    if (closeModalSvg.dataset.navigation === "sideBar") {
      sideBar_today.addEventListener("click", function () {
        renderPeriodTasks("today");
      });
      sideBar_week.addEventListener("click", function () {
        renderPeriodTasks("week");
      });
    } else if (closeModalSvg.dataset.navigation === "home") {
      sideBar_today.removeEventListener("click", renderPeriodTasks);
      sideBar_week.removeEventListener("click", renderPeriodTasks);
    }
  });
}
