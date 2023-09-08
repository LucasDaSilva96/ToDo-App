// ** Import Statements ***
import "./style.css";
import { menuSlider } from "./menu-slide.js";
import { closeAddTaskModal } from "./add-task-modal.js";
import { openAddTaskModalHome } from "./add-task-modal.js";
import { clockFunction } from "./clock.js";
import { greetingFunction } from "./greeting.js";
import { getUserLocation } from "./weather.js";
import { setCalenderDates } from "./date.js";
import { openAddTaskModalSideBar } from "./add-task-modal.js";
import { showAddProjectInput } from "./add-task-modal.js";
import { projectInputListener } from "./storage.js";
import { setLocalStorage } from "./storage.js";
import { changeCalenderValue } from "./add-task-modal.js";
import { addTaskFunction } from "./add-task-modal.js";
import { renderTaskHomePage } from "./add-task-modal.js";
import { taskDoneFunction } from "./add-task-modal.js";
import { seeTaskDetailsFunction } from "./add-task-modal.js";
import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
// *****

// ******
let day_nr = undefined;

menuSlider();
closeAddTaskModal();

// Clock-function ↓
clockFunction();
setInterval(function () {
  clockFunction();
}, 1000);
// *********

greetingFunction();
getUserLocation();
//change background of the html-body
// depending on the current time. Run this every 10min / 600 000 ms

setInterval(function () {
  greetingFunction();
}, 600000);

showAddProjectInput();

projectInputListener();

// *****

window.addEventListener("DOMContentLoaded", function () {
  setLocalStorage();
  removeDoneTaskFromLocalStorage();
  setCalenderDates();
  changeCalenderValue();
  renderTaskHomePage(0);
  // EDIT LATER ↓
  taskDoneFunction();
  seeTaskDetailsFunction();
});

const openAddTaskModalHomeBtn = document.querySelector(".add-task-svg-box");
const openAddTaskModalSidebarBtn = document.querySelector(
  ".sideBar-add-task-btn-box"
);

openAddTaskModalHomeBtn.addEventListener("click", function () {
  openAddTaskModalHome();
  addTaskFunction();
});

openAddTaskModalSidebarBtn.addEventListener("click", function () {
  openAddTaskModalSideBar();
  addTaskFunction();
});

const date_containers = document.querySelectorAll(".calender-box-container");
date_containers.forEach((el) => {
  el.addEventListener("click", function () {
    day_nr = Number(el.children[0].firstChild.className.split("-")[1]);
    return renderTaskHomePage(day_nr);
  });
});

const calenderBoxes = document.querySelectorAll(".calender-box-container");
calenderBoxes.forEach((el) => {
  el.addEventListener("click", function () {
    taskDoneFunction();
    seeTaskDetailsFunction();
  });
});

function removeDoneTaskFromLocalStorage() {
  const PROJECT_STORAGE = getLocalStorageObject("Projects");
  const TASKS_STORAGE = getLocalStorageObject("Tasks");

  for (let i = TASKS_STORAGE.tasks.length - 1; i >= 0; i--) {
    if (TASKS_STORAGE.tasks[i].done === true) {
      TASKS_STORAGE.tasks.splice(i, 1);
    }
  }

  for (let x = PROJECT_STORAGE.projects.length - 1; x >= 0; x--) {
    if (PROJECT_STORAGE.projects[x].project_tasks.length >= 1) {
      for (
        let y = PROJECT_STORAGE.projects[x].project_tasks.length - 1;
        y >= 0;
        y--
      ) {
        if (PROJECT_STORAGE.projects[x].project_tasks[y].done === true) {
          PROJECT_STORAGE.projects[x].project_tasks.splice(y, 1);
        }
      }
    }
  }
  pushDataToLocalStorage("Tasks", TASKS_STORAGE);
  pushDataToLocalStorage("Projects", PROJECT_STORAGE);
}
