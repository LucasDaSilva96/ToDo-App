import "./style.css";
import { menuSlider } from "./menu-slide.js";
import { closeAddTaskModal } from "./add-task-modal.js";
import { openAddTaskModalHome } from "./add-task-modal.js";
import { clockFunction } from "./clock.js";
import { greetingFunction } from "./greeting.js";
document.querySelector("body").classList.add("dayBackground");

menuSlider();
closeAddTaskModal();
openAddTaskModalHome();
// Clock-function ↓
clockFunction();
setInterval(function () {
  clockFunction();
}, 1000);
// *********

greetingFunction();
