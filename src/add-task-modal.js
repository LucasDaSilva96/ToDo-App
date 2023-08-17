import { projectsExist } from "./classes.js";
import { renderProjectSelections } from "./storage.js";
import { TASK } from "./classes.js";
import {
  ProjectSideBarShowTasks,
  renderPeriodTasks,
} from "./render-sidebar-task.js";
import { renderTaskNr } from "./render-sidebar-task.js";
import { toggleIsSelectedSidebarAtrr } from "./render-sidebar-task.js";

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
      checkWhichDayIsClicked();
      seeTaskDetailsFunction();
    } else if (closeModalSvg.dataset.navigation === "sideBar") {
      addTaskModalSection.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    } else {
      addTaskModalSection.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      sideBarSection.classList.add("slide-sideBar");
    }
    removePriorityClickListener();
    taskDoneFunction();
    addTaskBtn.removeEventListener("click", handleAddTaskClick);
    addTaskBtn.removeEventListener("click", handleAddTaskClickEdit);
    taskTitle.classList.remove("inputNotValid");
    selectProjectHtml.classList.remove("inputNotValid");
    priorityContainer.classList.remove("inputNotValid");
  });
}

export function openAddTaskModalHome() {
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
}

export function openAddTaskModalSideBar() {
  if (projectsExist()) {
    renderProjectSelections();
    resetAddTaskValues();
    closeModalSvg.dataset.navigation = "sideBar";
    overlay.classList.remove("hidden");
    addTaskModalSection.classList.remove("hidden");
  } else {
    window.alert("You need to create a project first");
    return;
  }
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
let taskTitle = document.querySelector(".title");
const taskMessage = document.getElementById("message");
const defaultProjectSelected = document.querySelector(".default-opt");
function isProjectSelected() {
  if (selectProjectHtml.value === "Select Project") {
    return false;
  } else {
    return true;
  }
}

let prioritySelected = undefined;

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

function handlePriorityClick(event) {
  if (
    event.target.textContent === "Low" ||
    event.target.textContent === "Medium" ||
    event.target.textContent === "High"
  ) {
    const clickedElement = event.target.parentElement;
    priorityDivs.forEach((i) => {
      if (i.parentElement !== clickedElement) {
        i.dataset.selected = "false";
      }
    });
    clickedElement.dataset.selected =
      clickedElement.dataset.selected === "false" ? "true" : "false";
  } else {
    return;
  }
}

export function addPriorityClickListener() {
  priorityDivs.forEach((el) => {
    el.addEventListener("click", handlePriorityClick);
  });
}

export function removePriorityClickListener() {
  priorityDivs.forEach((el) => {
    el.removeEventListener("click", handlePriorityClick);
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
const priorityContainer = document.querySelector(".priority-div");

let project = undefined;
export function addTaskFunction() {
  // ****
  project = selectProjectHtml.value;

  selectProjectHtml.addEventListener("change", function () {
    project = selectProjectHtml.value;
  });
  // ***
  addPriorityClickListener();
  AddTaskClick();
}
function handleAddTaskClick() {
  if (isPrioritySelected() && isProjectSelected() && isTaskTitleLegit()) {
    newTask = new TASK(
      project,
      taskTitle.value,
      taskMessage.value,
      dueDateCalender.value,
      prioritySelected
    );

    if (
      checkForTitleDuplicate(newTask.task_title, newTask.task_due, project) ===
      false
    ) {
      newTask.saveTaskToProject();
      // ******
      setTimeout(function () {
        addTaskModalSection.classList.add("hidden");
        overlay.classList.add("hidden");
        checkWhichDayIsClicked();
        seeTaskDetailsFunction();
        removePriorityClickListener();
        taskDoneFunction();
        addTaskBtn.removeEventListener("click", handleAddTaskClick);
        addTaskBtn.removeEventListener("click", handleAddTaskClickEdit);
        taskTitle.classList.remove("inputNotValid");
        selectProjectHtml.classList.remove("inputNotValid");
        priorityContainer.classList.remove("inputNotValid");
      }, 100);
      // ******
    } else if (
      checkForTitleDuplicate(newTask.task_title, newTask.task_due, project) ===
      true
    ) {
      window.alert("You already have this task on the selected date & project");
      resetAddTaskValues();
    }
  } else if (!isTaskTitleLegit()) {
    taskTitle.classList.add("inputNotValid");
    window.alert("Enter the title of your task.");
    return;
  } else if (!isProjectSelected()) {
    selectProjectHtml.classList.add("inputNotValid");
    window.alert("Please choose a project to save your task.");
    return;
  } else if (!isPrioritySelected()) {
    priorityContainer.classList.add("inputNotValid");
    window.alert("Please select the priority of your task.");
    return;
  } else {
    taskTitle.classList.add("inputNotValid");
    selectProjectHtml.classList.add("inputNotValid");
    priorityContainer.classList.add("inputNotValid");
    window.alert("Please fill all the necessary information.");
    return;
  }
  if (closeModalSvg.dataset.navigation === "sideBar") {
    sideBarperiods.forEach((el) => {
      if (el.dataset.period === "true") {
        renderPeriodTasks(el.textContent);
        toggleIsSelectedSidebarAtrr(el.textContent);
      }
      renderTaskNr();
      seeTaskDetailsFunction();
    });
  }
}

function AddTaskClick() {
  addTaskBtn.addEventListener("click", handleAddTaskClick);
}

function checkForTitleDuplicate(title, dueDate, project) {
  const data = getLocalStorageObject("Tasks");
  let index = data.tasks.findIndex((element) => {
    return (
      element.title === title &&
      element.due === dueDate &&
      element.project === project
    );
  });

  if (index < 0) {
    return false;
  } else if (index >= 0) {
    return true;
  }
}

const taskSectionHomePage = document.querySelector(".task-section");

export function renderTaskHomePage(date) {
  const date_1 = getDays(date);
  // *
  taskSectionHomePage.innerHTML = "";

  const taskStorage = getLocalStorageObject("Tasks");

  for (let i = 0; i < taskStorage.tasks.length; i++) {
    if (taskStorage.tasks[i].due === date_1) {
      taskSectionHomePage.innerHTML += `
       <div class="task-box ${taskStorage.tasks[i].priority}-priority ${
        taskStorage.tasks[i].done === true ? "task-done" : ""
      }">
      <div class="task-title-div">
        <h3>${taskStorage.tasks[i].title}</h3>
        <h6>${taskStorage.tasks[i].due}</h6>
      </div> 
      
     <div class="task-msg-div">
        <p>${taskStorage.tasks[i].message}</p>
      </div> 
      
     <div class="task-opt-container">
        <div class="done-box">
          <input class="task-done" type="checkbox" ${
            taskStorage.tasks[i].done === true ? "checked" : ""
          }/>
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
  // ************************************

  const remove_task_boxes = document.querySelectorAll(".remove-box");
  remove_task_boxes.forEach((el) => {
    el.addEventListener("click", addHandleRemoveTaskClick);
  });

  // **************************************
}

export function addHandleRemoveTaskClick(event) {
  checkWhichDayIsClicked();
  handleRemoveTaskClick(event.target);
}

const date_containers = document.querySelectorAll(".calender-box-container");

export function checkWhichDayIsClicked() {
  date_containers.forEach((el) => {
    if (el.dataset.clicked === "true") {
      renderTaskHomePage(
        Number(el.lastElementChild.lastElementChild.className.split("-")[1])
      );
    }
  });
}

let PROJECT_STORAGE = getLocalStorageObject("Projects");
let TASKS_STORAGE = getLocalStorageObject("Tasks");
export function handleRemoveTaskClick(Element) {
  const title =
    Element.parentElement.parentElement.parentElement.firstElementChild
      .firstElementChild.textContent;
  const due =
    Element.parentElement.parentElement.parentElement.firstElementChild
      .lastElementChild.textContent;

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

  checkWhichDayIsClicked();

  if (closeModalSvg.dataset.navigation === "sideBar") {
    sideBarperiods.forEach((el) => {
      if (el.dataset.period === "true") {
        renderPeriodTasks(el.textContent);
        toggleIsSelectedSidebarAtrr(el.textContent);
      }
      renderTaskNr();
      seeTaskDetailsFunction();
    });
  }

  // ** end of function ** ↓
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
  priorityDivs.forEach((el) => {
    el.dataset.selected = "false";
  });
}

export function taskDoneFunction() {
  PROJECT_STORAGE = getLocalStorageObject("Projects");
  TASKS_STORAGE = getLocalStorageObject("Tasks");
  const all_done_boxes = document.querySelectorAll(".done-box");
  all_done_boxes.forEach((el) => {
    el.addEventListener("click", function () {
      el.parentElement.parentElement.classList.toggle("task-done");
      const task_Done_title =
        el.parentElement.parentElement.firstElementChild.firstElementChild
          .textContent;
      const task_Done_Due =
        el.parentElement.parentElement.firstElementChild.lastElementChild
          .textContent;

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
      let projectIndex = PROJECT_STORAGE.projects.findIndex((project) => {
        return project.project_name === TASKS_STORAGE.tasks[taskIndex].project;
      });

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
      pushDataToLocalStorage("Projects", PROJECT_STORAGE);
      pushDataToLocalStorage("Tasks", TASKS_STORAGE);
    });
  });
}

export function getLocalStorageObject(keyName) {
  const data_0 = window.localStorage.getItem(`${keyName}`);
  const data = JSON.parse(data_0);
  return data;
}

export function pushDataToLocalStorage(keyName, object) {
  const objStr = JSON.stringify(object);
  return window.localStorage.setItem(`${keyName}`, objStr);
}

// ******
const task_detail_section = document.querySelector(
  ".task-detail-modal-section"
);
const close_detail_section_btn = document.querySelector(
  ".close-detail-modal-box"
);
const sideBarperiods = document.querySelectorAll(".notis");

// ******
let editTaskTitle = undefined;
let editTaskDue = undefined;
let editTaskProject = undefined;
export function seeTaskDetailsFunction() {
  const task_details_boxes = document.querySelectorAll(".edit-box");
  const task_detail_title = document.querySelector(".task-detail-title-p");
  const task_detail_project = document.querySelector(".task-detail-project-p");
  const task_detail_priority = document.querySelector(
    ".task-detail-priority-p"
  );
  const task_detail_due = document.querySelector(".task-detail-due-p");
  const task_detail_message = document.querySelector(".task-detail-message-p");
  const edit_task_btn = document.querySelector(".edit-task-btn");

  PROJECT_STORAGE = getLocalStorageObject("Projects");
  TASKS_STORAGE = getLocalStorageObject("Tasks");

  task_details_boxes.forEach((el) => {
    el.addEventListener("click", function () {
      task_detail_section.classList.remove("hidden");
      overlay.classList.remove("hidden");

      let title =
        el.parentElement.parentElement.firstElementChild.firstElementChild
          .textContent;

      let due =
        el.parentElement.parentElement.firstElementChild.lastElementChild
          .textContent;

      // *****
      editTaskTitle = title;
      editTaskDue = due;

      // ****

      // task index in the Tasks array
      let taskIndex = TASKS_STORAGE.tasks.findIndex((element) => {
        return element.title === title && element.due === due;
      });

      // Project index nr in the Projects
      let projectIndex = PROJECT_STORAGE.projects.findIndex((project) => {
        return project.project_name === TASKS_STORAGE.tasks[taskIndex].project;
      });

      // Task array index in the project
      let taskArrayIndex = PROJECT_STORAGE.projects[
        projectIndex
      ].project_tasks.findIndex((task) => {
        return (
          task.project ===
            PROJECT_STORAGE.projects[projectIndex].project_name &&
          task.title === title &&
          task.due === due
        );
      });

      task_detail_title.textContent =
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].title;
      task_detail_project.textContent =
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].project;

      editTaskProject =
        PROJECT_STORAGE.projects[projectIndex].project_tasks[taskArrayIndex]
          .project;
      console.log(editTaskProject);
      task_detail_priority.textContent =
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].priority;
      task_detail_due.textContent =
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].due;
      task_detail_message.textContent =
        PROJECT_STORAGE.projects[projectIndex].project_tasks[
          taskArrayIndex
        ].message;

      edit_task_btn.addEventListener("click", function () {
        addTaskModalSection.classList.remove("hidden");
        // ************
        project = selectProjectHtml.value;
        taskTitle.value = task_detail_title.textContent;
        taskMessage.value = task_detail_message.textContent;
        dueDateCalender.value = task_detail_due.textContent;
        prioritySelected = task_detail_priority.textContent;
        // ************
        selectProjectHtml.addEventListener("change", function () {
          project = selectProjectHtml.value;
        });
        // taskTitle.addEventListener("input", function () {
        //   taskTitle = taskTitle.value;
        // });

        // **********
        renderProjectSelections();

        // *************
        addPriorityClickListener();
        addTaskBtn.addEventListener("click", handleAddTaskClickEdit);
        // ** ↓
      });
    });
  });
  closeModalSvg.addEventListener("click", handleCloseEditModalClick);
  //
  close_detail_section_btn.addEventListener(
    "click",
    handleAddCloseDetailSectionClick
  );
  // ************
}

function handleAddCloseDetailSectionClick() {
  const task_details_boxes = document.querySelectorAll(".edit-box");

  sideBarperiods.forEach((el) => {
    if (el.dataset.period === "true") {
      renderPeriodTasks(el.textContent);
      toggleIsSelectedSidebarAtrr(el.textContent);
    }
    renderTaskNr();
    seeTaskDetailsFunction();
  });

  task_detail_section.classList.add("hidden");
  overlay.classList = "overlay hidden";
  console.log("sideBar");
  task_details_boxes.forEach((element) => {
    element.firstElementChild.checked = false;
  });
  taskDoneFunction();
}

function handleCloseEditModalClick() {
  removePriorityClickListener();
  task_detail_section.classList.add("hidden");
  overlay.classList = "overlay hidden";

  addTaskBtn.removeEventListener("click", handleAddTaskClickEdit);
}

function handleAddTaskClickEdit() {
  // *****************
  const task_detail_title = document.querySelector(".task-detail-title-p");
  const task_detail_project = document.querySelector(".task-detail-project-p");
  const task_detail_priority = document.querySelector(
    ".task-detail-priority-p"
  );
  const task_detail_due = document.querySelector(".task-detail-due-p");
  const task_detail_message = document.querySelector(".task-detail-message-p");
  // ****************
  PROJECT_STORAGE = getLocalStorageObject("Projects");
  TASKS_STORAGE = getLocalStorageObject("Tasks");
  if (isPrioritySelected() && isProjectSelected() && isTaskTitleLegit()) {
    const obj = {
      title: taskTitle.value,
      message: taskMessage.value,
      due: dueDateCalender.value,
      priority: prioritySelected,
      done: false,
      remove: false,
      project: project,
    };

    // task index in the Tasks array
    let taskIndex = TASKS_STORAGE.tasks.findIndex((element) => {
      return element.title === editTaskTitle && element.due === editTaskDue;
    });

    // Project index nr in the Projects
    let projectIndex = PROJECT_STORAGE.projects.findIndex((project) => {
      return project.project_name === obj.project;
    });

    let projectIndexOld = PROJECT_STORAGE.projects.findIndex((project) => {
      return project.project_name === editTaskProject;
    });

    let taskArrayIndexOld = PROJECT_STORAGE.projects[
      projectIndexOld
    ].project_tasks.findIndex((task) => {
      return (
        task.title === editTaskTitle &&
        task.due === editTaskDue &&
        task.project === editTaskProject
      );
    });

    PROJECT_STORAGE.projects[projectIndexOld].project_tasks.splice(
      taskArrayIndexOld,
      1
    );

    task_detail_title.textContent = obj.title;
    task_detail_project.textContent = obj.project;
    task_detail_priority.textContent = obj.priority;
    task_detail_due.textContent = obj.due;
    task_detail_message.textContent = obj.message;

    if (checkForTitleDuplicate(obj.title, obj.due, obj.project) === false) {
      // ***************
      PROJECT_STORAGE.projects[projectIndex].project_tasks.push(obj);

      TASKS_STORAGE.tasks[taskIndex] = obj;
      pushDataToLocalStorage("Projects", PROJECT_STORAGE);
      pushDataToLocalStorage("Tasks", TASKS_STORAGE);
      // **************
      // *************
      setTimeout(function () {
        addTaskModalSection.classList.add("hidden");
        overlay.classList.add("hidden");
        checkWhichDayIsClicked();
        seeTaskDetailsFunction();
        removePriorityClickListener();
        taskDoneFunction();
        addTaskBtn.removeEventListener("click", handleAddTaskClick);
        addTaskBtn.removeEventListener("click", handleAddTaskClickEdit);
        taskTitle.classList.remove("inputNotValid");
        selectProjectHtml.classList.remove("inputNotValid");
        priorityContainer.classList.remove("inputNotValid");
      }, 100);
      // ******
    } else if (
      checkForTitleDuplicate(obj.title, obj.due, obj.project) === true
    ) {
      window.alert("You already have this task on the selected date");
      return;
    }
  } else if (!isTaskTitleLegit()) {
    taskTitle.classList.add("inputNotValid");
    window.alert("Enter the title of your task.");
    return;
  } else if (!isProjectSelected()) {
    selectProjectHtml.classList.add("inputNotValid");
    window.alert("Please choose a project to save your task.");
    return;
  } else if (!isPrioritySelected()) {
    priorityContainer.classList.add("inputNotValid");
    window.alert("Please select the priority of your task.");
    return;
  } else {
    taskTitle.classList.add("inputNotValid");
    selectProjectHtml.classList.add("inputNotValid");
    priorityContainer.classList.add("inputNotValid");
    window.alert("Please fill all the necessary information.");
    return;
  }
}
