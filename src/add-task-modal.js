import { projectsExist } from "./classes.js";
import { renderProjectSelections } from "./storage.js";
import { TASK } from "./classes.js";

const addTaskModalSection = document.querySelector(".add-task-modal-section");
const overlay = document.querySelector(".overlay");
const closeModalSvg = document.querySelector(".close-svg");
const sideBarSection = document.querySelector(".sideBar-section");
let newTask;

export function closeAddTaskModal() {
  closeModalSvg.addEventListener("click", function () {
    if (closeModalSvg.dataset.navigation === "home") {
      overlay.classList.add("hidden");
      addTaskModalSection.classList.add("hidden");
      renderTaskHomePage(0);
    } else if (closeModalSvg.dataset.navigation === "sideBar") {
      addTaskModalSection.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    } else {
      addTaskModalSection.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      sideBarSection.classList.add("slide-sideBar");
    }
  });
}

const addTaskHomeBtn = document.querySelector(".add-task-svg-box");

export function openAddTaskModalHome() {
  addTaskHomeBtn.addEventListener("click", function () {
    if (projectsExist()) {
      resetAddTaskValues();
      renderProjectSelections();
      closeModalSvg.dataset.navigation = "home";
      overlay.classList.remove("hidden");
      addTaskModalSection.classList.remove("hidden");
    } else {
      window.alert("You need to create a project first");
      return;
    }
  });
}

const addTaskSideBarBtn = document.querySelector(".sideBar-add-task-btn");

export function openAddTaskModalSideBar() {
  addTaskSideBarBtn.addEventListener("click", function () {
    if (projectsExist()) {
      renderProjectSelections();
      closeModalSvg.dataset.navigation = "sideBar";
      overlay.classList.remove("hidden");
      addTaskModalSection.classList.remove("hidden");
    } else {
      window.alert("You need to create a project first");
      return;
    }
  });
}

const openProjectInputBtn = document.querySelector(".add-project-svg");
const projectInputContainer = document.querySelector(".project-input-div");
const cancelAddProjectBtn = document.querySelector(".cancel");
const projectInputField = document.getElementById("project-input");

export function showAddProjectInput() {
  openProjectInputBtn.addEventListener("click", function () {
    projectInputContainer.classList.remove("hidden");
    openProjectInputBtn.classList.add("hidden");
    projectInputField.textContent = "";
    projectInputField.value = "";
  });

  cancelAddProjectBtn.addEventListener("click", function () {
    projectInputContainer.classList.add("hidden");
    openProjectInputBtn.classList.remove("hidden");
    projectInputField.textContent = "";
    projectInputField.value = "";
  });
}

const selectProjectHtml = document.getElementById("project-selection");
const priorityDivs = document.querySelectorAll(".priority");
const taskTitle = document.querySelector(".title");
const taskMessage = document.getElementById("message");
const defaultProjectSelected = document.querySelector(".default-opt");
function isProjectSelected() {
  if (selectProjectHtml.value === "Select Project") {
    return false;
  } else {
    return true;
  }
}

let prioritySelected;

function isPrioritySelected() {
  let isLegit = false;

  priorityDivs.forEach((el) => {
    if (el.dataset.selected === "true") {
      isLegit = true;
      prioritySelected = el.id;
    }
  });

  return isLegit;
}

function isTaskTitleLegit() {
  if (taskTitle.value === "" || taskTitle.value === " ") {
    return false;
  } else {
    return true;
  }
}

export function changePrioritySelected() {
  priorityDivs.forEach((el) => {
    el.addEventListener("click", function () {
      if (el.dataset.selected === "false") {
        el.dataset.selected = "true";
      } else if (el.dataset.selected === "true") {
        el.dataset.selected = "false";
      }
    });
  });
}

const dueDateCalender = document.getElementById("calender");

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date = new Date()) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export function changeCalenderValue() {
  dueDateCalender.value = formatDate();
  dueDateCalender.addEventListener("change", function () {
    const selectedDate = dueDateCalender.value;
    return (dueDateCalender.value = selectedDate);
  });
}

const addTaskBtn = document.querySelector(".add-task-box");

let project = undefined;
export function addTaskFunction() {
  // ****
  project = selectProjectHtml.value;

  selectProjectHtml.addEventListener("change", function () {
    project = selectProjectHtml.value;
  });
  // ***
  addTaskBtnFunction();
}
function addTaskBtnFunction() {
  addTaskBtn.addEventListener("click", function () {
    if (isPrioritySelected() && isProjectSelected() && isTaskTitleLegit()) {
      newTask = new TASK(
        project,
        taskTitle.value,
        taskMessage.value,
        dueDateCalender.value,
        prioritySelected
      );

      if (
        checkForTitleDuplicate(newTask.task_title, project, newTask.task_due)
      ) {
        newTask.saveTaskToProject();
      } else {
        window.alert("You already have this title on the selected project");
        resetAddTaskValues();
      }
    } else {
      return;
    }
  });
}

function checkForTitleDuplicate(title, projectName, dueDate) {
  const data = window.localStorage.getItem("Projects");
  const data_1 = JSON.parse(data);

  const project = data_1.projects.find(
    (project) => project.project_name === projectName
  );
  if (!project) {
    return true; // Project doesn't exist, so title can't be a duplicate
  }

  const index_proj = data_1.projects.findIndex((el) => {
    return el.project_name === projectName;
  });

  const duplicateTask = data_1.projects[index_proj].project_tasks.find(
    (task) => task.title === title && task.due === dueDate
  );

  return !duplicateTask;
}

const taskSectionHomePage = document.querySelector(".task-section");

export function renderTaskHomePage(date) {
  const date_1 = getDays(date);
  // *
  taskSectionHomePage.innerHTML = "";

  const taskStorage_0 = window.localStorage.getItem("Tasks");
  const taskStorage = JSON.parse(taskStorage_0);

  for (let i = 0; i < taskStorage.tasks.length; i++) {
    if (taskStorage.tasks[i].due === date_1) {
      taskSectionHomePage.innerHTML += `
       <div class="task-box ${taskStorage.tasks[i].priority}-priority">
      <div class="task-title-div">
        <h3>${taskStorage.tasks[i].title}</h3>
        <h6>${taskStorage.tasks[i].due}</h6>
      </div> 
      
     <div class="task-msg-div">
        <p>${taskStorage.tasks[i].message}</p>
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
  }
}

function getDays(dayNr) {
  const date = new Date();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + dayNr);
  const nextDayStrArray = `${nextDay}`.split(" ");
  const nextDayStr = `${nextDayStrArray[3]}-${month}-${date.getDate() + dayNr}`;
  return nextDayStr;
}

function resetAddTaskValues() {
  defaultProjectSelected.setAttribute("selected", "");
  taskTitle.value = "";
  taskMessage.value = "";
  dueDateCalender.value = formatDate();
}

export function taskDoneFunction() {
  const all_done_boxes = document.querySelectorAll(".done-box");
  const PROJECT_STORAGE = getLocalStorageObject("Projects");
  const TASKS_STORAGE = getLocalStorageObject("Tasks");
  all_done_boxes.forEach((el) => {
    el.addEventListener("click", function () {
      el.parentElement.parentElement.classList.toggle("task-done");
      const task_Done_title =
        el.parentElement.parentElement.firstElementChild.firstElementChild
          .textContent;
      const task_Done_Due =
        el.parentElement.parentElement.firstElementChild.lastElementChild
          .textContent;

      // MANIPULATING THE CLICKED TASK INSIDE THe RIGHT PROJECT IN localStorage
      let projectIndex = -1;

      for (const project of PROJECT_STORAGE.projects) {
        projectIndex = project.project_tasks.findIndex(
          (task) => task.project === project.project_name
        );
        if (projectIndex !== -1) {
          break; // Exit the loop if the task is found
        }
      }

      let taskArrayIndex = PROJECT_STORAGE.projects[
        projectIndex
      ].project_tasks.findIndex((task) => {
        return (
          task.project ===
            PROJECT_STORAGE.projects[projectIndex].project_name &&
          task.title === task_Done_title &&
          task.due === task_Done_Due
        );
      });

      if (
        PROJECT_STORAGE.projects[projectIndex].project_tasks[taskArrayIndex]
          .done === false
      ) {
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].done = true;
      } else if (
        PROJECT_STORAGE.projects[projectIndex].project_tasks[taskArrayIndex]
          .done === true
      ) {
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].done = false;
      }
      //** MANIPULATING THE CLICKED TASK INSIDE TASKS IN THE localStorage **
      let taskIndex = TASKS_STORAGE.tasks.findIndex((element) => {
        return (
          element.title === task_Done_title && element.due === task_Done_Due
        );
      });

      if (TASKS_STORAGE.tasks[taskIndex].done === false) {
        TASKS_STORAGE.tasks[taskIndex].done = true;
      } else if (TASKS_STORAGE.tasks[taskIndex].done === true) {
        TASKS_STORAGE.tasks[taskIndex].done = false;
      }

      // ***********************************************************
      pushDataToLocalStorage("Projects", PROJECT_STORAGE);
      pushDataToLocalStorage("Tasks", TASKS_STORAGE);
    });
  });
}

function getLocalStorageObject(keyName) {
  const data_0 = window.localStorage.getItem(`${keyName}`);
  const data = JSON.parse(data_0);
  return data;
}

function pushDataToLocalStorage(keyName, object) {
  const objStr = JSON.stringify(object);
  return window.localStorage.setItem(`${keyName}`, objStr);
}
