import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
import { getNextDays } from "./date.js";

const sideBarTaskContainer = document.querySelector(
  ".sideBar-display-tasks-box"
);
const sideBar_tasks_container_heading = document.querySelector(
  ".siderBar-tasks-heading"
);

const sideBar_today_task_nr = document.querySelector(".today-task-notis-nr");
export function renderPeriodTasks(period) {
  let todayCounter = 0;
  let TASKS_STORAGE = getLocalStorageObject("Tasks");
  let month = new Date().getMonth() + 1;
  if (month < 9) {
    month = `0${month}`;
  }
  let day = new Date().getDate();
  if (day < 9) {
    day = `0${day}`;
  }

  sideBar_today_task_nr.textContent = todayCounter;
  let today = `${new Date().getFullYear()}-${month}-${day}`;
  sideBarTaskContainer.innerHTML = "";
  if (period === "today") {
    todayCounter = 0;

    for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
      if (TASKS_STORAGE.tasks[i].due === today) {
        todayCounter++;
        sideBar_tasks_container_heading.textContent = "Today";
        sideBarTaskContainer.innerHTML += `
      <div class="task-box side-bar-task ${TASKS_STORAGE.tasks[i].priority}-priority">
        <div class="task-title-div">
          <h3>${TASKS_STORAGE.tasks[i].title}</h3>
          <h6>${TASKS_STORAGE.tasks[i].due}</h6>
        </div>
        <div class="task-msg-div">
          <p>${TASKS_STORAGE.tasks[i].message}</p>
        </div>
        <div class="task-opt-container">
          <div class="done-box">
            <input class="task-done" type="checkbox" />
          </div>
          <div class="edit-box">
            <input class="edit-task" type="checkbox" />
          </div>
          <div class="remove-box">
            <input class="remove-task" type="checkbox" />
          </div>
        </div>
      </div>
        `;
      }
      sideBar_today_task_nr.textContent = todayCounter;
    }
    // END OF IF === today ↓
  } else if (period === "week") {
    let week = Number(`${getNextDays(6)}`.split(" ")[2]);

    for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
      let due = Number(`${TASKS_STORAGE.tasks[i].due}`.split("-")[2]);
      console.log(due);
    }
  }
}
