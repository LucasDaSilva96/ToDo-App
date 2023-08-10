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

export function addTaskFunction() {
  // ****
  let project = undefined;
  selectProjectHtml.addEventListener("change", function () {
    project = selectProjectHtml.value;
  });
  // ***

  addTaskBtn.addEventListener("click", function () {
    if (isPrioritySelected() && isProjectSelected() && isTaskTitleLegit()) {
      newTask = new TASK(
        project,
        taskTitle.value,
        taskMessage.value,
        dueDateCalender.value,
        prioritySelected
      );

      if (checkForTitleDuplicate(taskTitle.value, project)) {
        newTask.saveTaskToProject();
      } else {
        window.alert("You already have this title on the selected project");
      }
    } else {
      return;
    }
  });
}

function checkForTitleDuplicate(title, projectName) {
  const data = window.localStorage.getItem("Projects");
  const data_1 = JSON.parse(data);

  const index_proj = data_1.projects.findIndex((el) => {
    return el.project_name === projectName;
  });

  const index_title = data_1.projects[index_proj].project_tasks.findIndex(
    (el) => {
      return el.title === title;
    }
  );

  if (index_title < 0) {
    return true;
  } else {
    return false;
  }
}
