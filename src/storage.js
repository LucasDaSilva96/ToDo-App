import { PROJECT } from "./classes.js";
import { removeProject } from "./remove-project.js";
import { getLocalStorageObject } from "./add-task-modal.js";
import { ProjectSideBarShowTasks } from "./render-sidebar-task.js";
import { renderProjectTasks } from "./render-sidebar-task.js";
import { toggleProjectSelectedSidebarAtrr } from "./render-sidebar-task.js";

const addProjectBtn = document.querySelector(".add");
const projectInputField = document.getElementById("project-input");
const projectsListContainer = document.querySelector(".projects-list-box");
const projectInputContainer = document.querySelector(".project-input-div");
const openProjectInputBtn = document.querySelector(".add-project-svg");
const selectProjectHtml = document.getElementById("project-selection");
let projectName = undefined;
let projectObj;

export function renderProjects() {
  const data = getLocalStorageObject("Projects");
  projectsListContainer.innerHTML = ``;
  for (let i = 0; i < data.projects.length; i++) {
    if (data.projects[i].project_name === "General") {
      projectsListContainer.innerHTML += `
      <div class="project-box" id="${data.projects[i].project_name}" data-project="false">
          <h4>${data.projects[i].project_name}</h4>
            <div class="task-nr-div">
                  <p class="task-nr-p"></p>
            </div>
      </div> `;
    } else {
      projectsListContainer.innerHTML += `
      <div class="project-box" id="${data.projects[i].project_name}" data-project="false">
      <h4>${data.projects[i].project_name}</h4>
      <div class="task-nr-div">
        <p class="task-nr-p"></p>
      </div>
      <div class="remove-project-box">
        <svg
          class="remove-project-svg"
          data-navigation="home"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#FF0000"
          viewBox="0 0 256 256"
        >
          <path
            d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
          ></path>
        </svg>
      </div>
    </div>
                    
     `;
    }
  }
  const removeProjectDivs = document.querySelectorAll(".remove-project-svg");
  removeProjectDivs.forEach((el) => {
    el.addEventListener("click", function () {
      removeProject(el);
    });
  });
}

export function renderProjectSelections() {
  const data = getLocalStorageObject("Projects");
  selectProjectHtml.innerHTML = `
  <option class="hidden" selected disabled>Select Project</option>`;
  for (let i = 0; i < data.projects.length; i++) {
    selectProjectHtml.innerHTML += `
  <option value="${data.projects[i].project_name}">${data.projects[i].project_name}</option>
  `;
  }
}

export function projectInputListener() {
  projectInputField.addEventListener("input", function () {
    projectName = projectInputField.value;
  });

  addProjectBtn.addEventListener("click", function () {
    if (projectName === undefined || projectName === "") {
      window.alert("Invalid project name");
      return;
    } else if (
      projectName !== undefined &&
      checkProjectDuplicate(projectName) === false
    ) {
      projectObj = new PROJECT(projectName);
      projectObj.saveToLocalStorage();
      projectInputContainer.classList.add("hidden");
      openProjectInputBtn.classList.remove("hidden");
      renderProjects();
      projectName = undefined;
    } else if (checkProjectDuplicate(projectName) === true) {
      window.alert("You already have this project");
      return;
    } else {
      return;
    }
    ProjectSideBarShowTasks();
  });
}

// LocalStorage
export function setLocalStorage() {
  const storageObj = {
    projects: [
      {
        project_name: "General",
        project_notis: null,
        project_tasks: [],
      },
    ],
  };

  const storageTasks = {
    tasks: [],
  };
  if (getLocalStorageObject("Projects") === null) {
    window.localStorage.setItem("Projects", JSON.stringify(storageObj));
  }
  if (getLocalStorageObject("Tasks") === null) {
    window.localStorage.setItem("Tasks", JSON.stringify(storageTasks));
  }
}

function checkProjectDuplicate(projectData) {
  let PROJECT_STORAGE = getLocalStorageObject("Projects");

  let index = PROJECT_STORAGE.projects.findIndex((index) => {
    return index.project_name === projectData;
  });
  if (index === -1) {
    return false;
  } else if (index >= 0) {
    return true;
  }
}
