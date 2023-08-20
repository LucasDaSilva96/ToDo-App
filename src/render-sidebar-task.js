import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
import { getNextDays } from "./date.js";
import { addHandleRemoveTaskClick } from "./add-task-modal.js";
import { seeTaskDetailsFunction } from "./add-task-modal.js";
import { taskDoneFunction } from "./add-task-modal.js";

const sideBarTaskContainer = document.querySelector(
  ".sideBar-display-tasks-box"
);
const sideBar_tasks_container_heading = document.querySelector(
  ".siderBar-tasks-heading"
);
const closeModalSvg = document.querySelector(".close-svg");

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
    sideBar_tasks_container_heading.textContent = "Month";
    for (let i = 0; i < TASKS_STORAGE.tasks.length; i++) {
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
  const projectsSidebarHeadings = document.querySelectorAll(".project-box");

  projectsSidebarHeadings.forEach((element) => {
    element.addEventListener("click", function () {
      toggleProjectSelectedSidebarAtrr(element.id);
      sideBar_tasks_container_heading.textContent = element.id;
      toggleIsSelectedSidebarAtrr("none");
      renderProjectTasks(element.id);
      renderTaskNr();
      seeTaskDetailsFunction();
      taskDoneFunction();
    });
  });
}

export function toggleProjectSelectedSidebarAtrr(data) {
  const projectsSidebarHeadings = document.querySelectorAll(".project-box");
  projectsSidebarHeadings.forEach((el) => {
    if (el.id === data) {
      el.dataset.project = "true";
    } else {
      el.dataset.project = "false";
    }
  });
}

export function renderProjectTasks(data_id) {
  let PROJECT_STORAGE = getLocalStorageObject("Projects");
  sideBarTaskContainer.innerHTML = "";

  let index = PROJECT_STORAGE.projects.findIndex((element) => {
    return element.project_name === data_id;
  });

  if (index >= 0) {
    if (PROJECT_STORAGE.projects[index].project_tasks.length >= 1) {
      for (
        let i = 0;
        i < PROJECT_STORAGE.projects[index].project_tasks.length;
        i++
      ) {
        sideBarTaskContainer.innerHTML += `
      <div class="task-box side-bar-task ${
        PROJECT_STORAGE.projects[index].project_tasks[i].priority
      }-priority ${
          PROJECT_STORAGE.projects[index].project_tasks[i].done === true
            ? "task-done"
            : ""
        }">
      <div class="task-title-div">
      <h3>${PROJECT_STORAGE.projects[index].project_tasks[i].title}</h3>
      <h6>${PROJECT_STORAGE.projects[index].project_tasks[i].due}</h6>
      </div>
      <div class="task-msg-div">
      <p>${PROJECT_STORAGE.projects[index].project_tasks[i].message}</p>
      </div>
      <div class="task-opt-container">
      <div class="done-box">
      <input class="task-done" type="checkbox" ${
        PROJECT_STORAGE.projects[index].project_tasks[i].done === true
          ? "checked"
          : ""
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
      addRemoveTaskSideBarProject();
    } else {
      sideBarTaskContainer.innerHTML = `
      <h3 class"notask">No task added to this project</h3>
      `;
    }
  } else {
    return;
  }
}

function addRemoveTaskSideBarProject() {
  const remove_task_boxes = document.querySelectorAll(".remove-box");

  remove_task_boxes.forEach((el) => {
    el.addEventListener("click", function () {
      removeTaskSideBarProject(el);
    });
  });
}

function removeTaskSideBarProject(element) {
  let PROJECT_STORAGE = getLocalStorageObject("Projects");
  let TASKS_STORAGE = getLocalStorageObject("Tasks");
  const title =
    element.parentElement.parentElement.parentElement.firstElementChild
      .firstElementChild.firstElementChild.textContent;

  const due =
    element.parentElement.parentElement.parentElement.firstElementChild
      .firstElementChild.lastElementChild.textContent;

  // TASKS Storage
  let taskIndex = TASKS_STORAGE.tasks.findIndex((element) => {
    return element.title === title && element.due === due;
  });
  // PROJECTS storage
  let projectIndex = PROJECT_STORAGE.projects.findIndex((project) => {
    return project.project_name === TASKS_STORAGE.tasks[taskIndex].project;
  });

  let taskArrayIndex = PROJECT_STORAGE.projects[
    projectIndex
  ].project_tasks.findIndex((task) => {
    return (
      task.project === PROJECT_STORAGE.projects[projectIndex].project_name &&
      task.title === title &&
      task.due === due
    );
  });

  TASKS_STORAGE.tasks.splice(taskIndex, 1);
  PROJECT_STORAGE.projects[projectIndex].project_tasks.splice(
    taskArrayIndex,
    1
  );

  pushDataToLocalStorage("Tasks", TASKS_STORAGE);
  pushDataToLocalStorage("Projects", PROJECT_STORAGE);

  if (closeModalSvg.dataset.navigation === "sideBar") {
    sideBarperiods.forEach((el) => {
      if (el.dataset.period === "true") {
        renderPeriodTasks(el.textContent);
        toggleIsSelectedSidebarAtrr(el.textContent);
      }
      renderTaskNr();
      seeTaskDetailsFunction();
    });
    const projectsSidebarHeadings = document.querySelectorAll(".project-box");
    projectsSidebarHeadings.forEach((el) => {
      if (el.dataset.project === "true") {
        renderProjectTasks(el.id);
      } else {
        renderProjectTasks("General");
      }
    });
  }
}
