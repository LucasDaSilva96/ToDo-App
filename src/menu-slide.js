const menuBtn = document.querySelector(".menu");
const sideBarSection = document.querySelector(".sideBar-section");
const closeModalSvg = document.querySelector(".close-svg");

import { checkWhichDayIsClicked } from "./add-task-modal.js";
import { renderProjects } from "./storage.js";
import { taskDoneFunction } from "./add-task-modal.js";
import { renderPeriodTasks } from "./render-sidebar-task.js";
import { seeTaskDetailsFunction } from "./add-task-modal.js";
import { renderTaskNr } from "./render-sidebar-task.js";
import { toggleIsSelectedSidebarAtrr } from "./render-sidebar-task.js";
import { ProjectSideBarShowTasks } from "./render-sidebar-task.js";
import { toggleProjectSelectedSidebarAtrr } from "./render-sidebar-task.js";

// *******
const sideBar_today = document.querySelector(".sideBar-today");
const sideBar_week = document.querySelector(".sideBar-week");
const sideBar_month = document.querySelector(".sideBar-month");
// *******
const sideBarperiods = document.querySelectorAll(".notis");

// This function is for showing the sideBar section and hide
// the other sections
export function menuSlider() {
  menuBtn.addEventListener("click", function () {
    sideBarSection.classList.toggle("slide-sideBar");
    if (sideBarSection.classList.contains("slide-sideBar")) {
      closeModalSvg.dataset.navigation = "sideBar";
      // ****
      sideBarperiods[0].dataset.period = "true";
      sideBarperiods[1].dataset.period = "false";
      sideBarperiods[2].dataset.period = "false";
      // ****
      renderPeriodTasks("Today");
      renderTaskNr();
    } else {
      checkWhichDayIsClicked();
      closeModalSvg.dataset.navigation = "home";
    }

    // ***
    if (closeModalSvg.dataset.navigation === "sideBar") {
      sideBar_today.addEventListener("click", function () {
        toggleProjectSelectedSidebarAtrr("none");
        renderPeriodTasks("Today");
        toggleIsSelectedSidebarAtrr("Today");
        renderTaskNr();
        seeTaskDetailsFunction();
        taskDoneFunction();
      });
      sideBar_week.addEventListener("click", function () {
        renderPeriodTasks("Week");
        toggleIsSelectedSidebarAtrr("Week");
        renderTaskNr();
        seeTaskDetailsFunction();
        taskDoneFunction();
      });
      sideBar_month.addEventListener("click", function () {
        toggleProjectSelectedSidebarAtrr("none");
        renderPeriodTasks("Month");
        toggleIsSelectedSidebarAtrr("Month");
        renderTaskNr();
        seeTaskDetailsFunction();
        taskDoneFunction();
      });
    } else if (closeModalSvg.dataset.navigation === "home") {
      sideBar_today.removeEventListener("click", renderPeriodTasks);
      sideBar_week.removeEventListener("click", renderPeriodTasks);
      sideBar_month.removeEventListener("click", renderPeriodTasks);
    }
    seeTaskDetailsFunction();
    renderProjects();
    taskDoneFunction();
    // ***
    setTimeout(function () {
      ProjectSideBarShowTasks();
    }, 100);
  });
}
