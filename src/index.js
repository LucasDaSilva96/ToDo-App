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
