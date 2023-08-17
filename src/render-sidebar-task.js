import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
import { getNextDays } from "./date.js";
import { addHandleRemoveTaskClick } from "./add-task-modal.js";

const sideBarTaskContainer = document.querySelector(
  ".sideBar-display-tasks-box"
);
const sideBar_tasks_container_heading = document.querySelector(
  ".siderBar-tasks-heading"
);

let todayCounter = 0;
let weekCounter = 0;
let monthCounter = 0;
const sideBar_today_task_nr = document.querySelector(".today-task-notis-nr");
const sideBar_week_task_nr = document.querySelector(".week-task-notis-nr");
const sideBar_month_task_nr = document.querySelector(".month-task-notis-nr");
//
export function renderPeriodTasks(period) {
  let TASKS_STORAGE = getLocalStorageObject("Tasks");
  let month = new Date().getMonth() + 1;
  if (month < 9) {
    month = `0${month}`;
  }
  let day = new Date().getDate();
  if (day < 9) {
    day = `0${day}`;
  }
  let today = `${new Date().getFullYear()}-${month}-${day}`;
  sideBarTaskContainer.innerHTML = "";
  if (period === "Today") {
    sideBar_tasks_container_heading.textContent = "Today";

    for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
      if (TASKS_STORAGE.tasks[i].due === today) {
        sideBarTaskContainer.innerHTML += `
      <div class="task-box side-bar-task ${
        TASKS_STORAGE.tasks[i].priority
      }-priority ${TASKS_STORAGE.tasks[i].done === true ? "task-done" : ""}">
        <div class="task-title-div">
          <h3>${TASKS_STORAGE.tasks[i].title}</h3>
          <h6>${TASKS_STORAGE.tasks[i].due}</h6>
        </div>
        <div class="task-msg-div">
          <p>${TASKS_STORAGE.tasks[i].message}</p>
        </div>
        <div class="task-opt-container">
          <div class="done-box">
            <input class="task-done" type="checkbox" ${
              TASKS_STORAGE.tasks[i].done === true ? "checked" : ""
            } />
          </div>
          <div class="edit-box">
            <input class="edit-task" type="checkbox"  />
          </div>
          <div class="remove-box">
            <input class="remove-task" type="checkbox" />
          </div>
        </div>
      </div>
        `;
      }
    }
    //
  } else if (period === "Week") {
    sideBar_tasks_container_heading.textContent = "Week";
    let week = Number(`${getNextDays(6)}`.split(" ")[2]);
    for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
      let due = Number(`${TASKS_STORAGE.tasks[i].due}`.split("-")[2]);
      if (due <= week) {
        sideBarTaskContainer.innerHTML += `
        <div class="task-box side-bar-task ${
          TASKS_STORAGE.tasks[i].priority
        }-priority ${TASKS_STORAGE.tasks[i].done === true ? "task-done" : ""}">
          <div class="task-title-div">
            <h3>${TASKS_STORAGE.tasks[i].title}</h3>
            <h6>${TASKS_STORAGE.tasks[i].due}</h6>
          </div>
          <div class="task-msg-div">
            <p>${TASKS_STORAGE.tasks[i].message}</p>
          </div>
          <div class="task-opt-container">
            <div class="done-box">
              <input class="task-done" type="checkbox" ${
                TASKS_STORAGE.tasks[i].done === true ? "checked" : ""
              } />
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
    }
    //
  } else if (period === "Month") {
    for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
      sideBar_tasks_container_heading.textContent = "Month";
      let monthDue = `${TASKS_STORAGE.tasks[i].due}`.split("-")[1];

      if (monthDue === month) {
        sideBarTaskContainer.innerHTML += `
        <div class="task-box side-bar-task ${
          TASKS_STORAGE.tasks[i].priority
        }-priority ${TASKS_STORAGE.tasks[i].done === true ? "task-done" : ""}">
          <div class="task-title-div">
            <h3>${TASKS_STORAGE.tasks[i].title}</h3>
            <h6>${TASKS_STORAGE.tasks[i].due}</h6>
          </div>
          <div class="task-msg-div">
            <p>${TASKS_STORAGE.tasks[i].message}</p>
          </div>
          <div class="task-opt-container">
            <div class="done-box">
              <input class="task-done" type="checkbox" ${
                TASKS_STORAGE.tasks[i].done === true ? "checked" : ""
              } />
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
    }
  }
  const remove_task_boxes = document.querySelectorAll(".remove-box");
  remove_task_boxes.forEach((el) => {
    el.addEventListener("click", addHandleRemoveTaskClick);
  });
}

export function renderTaskNr() {
  todayCounter = 0;
  weekCounter = 0;
  monthCounter = 0;
  let TASKS_STORAGE = getLocalStorageObject("Tasks");
  let month = new Date().getMonth() + 1;
  if (month < 9) {
    month = `0${month}`;
  }
  let day = new Date().getDate();
  if (day < 9) {
    day = `0${day}`;
  }
  let today = `${new Date().getFullYear()}-${month}-${day}`;
  let week = Number(`${getNextDays(6)}`.split(" ")[2]);
  for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
    let due = Number(`${TASKS_STORAGE.tasks[i].due}`.split("-")[2]);
    let monthDue = `${TASKS_STORAGE.tasks[i].due}`.split("-")[1];
    if (TASKS_STORAGE.tasks[i].due === today) {
      todayCounter++;
    }
    if (due <= week) {
      weekCounter++;
    }

    if (monthDue === month) {
      monthCounter++;
    }
  }
  sideBar_today_task_nr.textContent = todayCounter;
  sideBar_week_task_nr.textContent = weekCounter;
  sideBar_month_task_nr.textContent = monthCounter;
}

const sideBarperiods = document.querySelectorAll(".notis");

export function toggleIsSelectedSidebarAtrr(period) {
  sideBarperiods.forEach((el) => {
    if (el.textContent === period) {
      el.dataset.period = "true";
    } else {
      el.dataset.period = "false";
    }
  });
}

export function ProjectSideBarShowTasks() {
  let PROJECT_STORAGE = getLocalStorageObject("Projects");
  const projectsSidebarHeadings = document.querySelectorAll(".project-box");

  console.log(projectsSidebarHeadings[1]);
  projectsSidebarHeadings.forEach((element) => {
    element.addEventListener("click", function () {
      sideBar_tasks_container_heading.textContent = element.id;
    });
  });
}
