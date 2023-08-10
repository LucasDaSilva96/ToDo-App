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
import { changePrioritySelected } from "./add-task-modal.js";
import { renderTaskHomePage } from "./add-task-modal.js";

// ******

menuSlider();
closeAddTaskModal();
openAddTaskModalHome();
openAddTaskModalSideBar();
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

setCalenderDates();

showAddProjectInput();

projectInputListener();

// *****

window.addEventListener("DOMContentLoaded", function () {
  setLocalStorage();
  changeCalenderValue();
});

const openAddTaskModalHomeBtn = document.querySelector(".add-task-svg-box");
const openAddTaskModalSidebarBtn = document.querySelector(
  ".sideBar-add-task-btn-box"
);

openAddTaskModalHomeBtn.addEventListener("click", function () {
  addTaskFunction();
  changePrioritySelected();
});

openAddTaskModalSidebarBtn.addEventListener("click", function () {
  addTaskFunction();
  changePrioritySelected();
});

let day_nr = undefined;
const date_containers = document.querySelectorAll(".calender-box-container");
date_containers.forEach((el) => {
  el.addEventListener("click", function () {
    day_nr = Number(el.children[0].childNodes[1].classList[0].split("-")[1]);
    return renderTaskHomePage(day_nr);
  });
});
