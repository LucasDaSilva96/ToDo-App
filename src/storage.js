import { PROJECT } from "./classes.js";
import { TASK } from "./classes.js";
const addProjectBtn = document.querySelector(".add");
const projectInputField = document.getElementById("project-input");
const projectsListContainer = document.querySelector(".projects-list-box");
const projectInputContainer = document.querySelector(".project-input-div");
const openProjectInputBtn = document.querySelector(".add-project-svg");
const selectProjectHtml = document.getElementById("project-selection");
let projectName = undefined;
let projectObj;

export function renderProjects() {
  const data = JSON.parse(window.localStorage.getItem("Projects"));

  for (let i = 0; i < data.projects.length; i++) {
    projectsListContainer.innerHTML = `
      <div class="project-box" id="${data.projects[i].project_name}">
          <h4>${data.projects[i].project_name}</h4>
            <div class="task-nr-div">
                  <p></p>
            </div>
      </div>
      
      `;
  }
}

export function renderProjectSelections() {
  const data = JSON.parse(window.localStorage.getItem("Projects"));
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
    if (projectName !== undefined) {
      projectsListContainer.innerHTML += `
      <div class="project-box" id="${projectName}">
          <h4>${projectName}</h4>
            <div class="task-nr-div">
                  <p></p>
            </div>
      </div>
      
      `;
      projectObj = new PROJECT(projectName);
      projectObj.saveToLocalStorage();
      projectInputContainer.classList.add("hidden");
      openProjectInputBtn.classList.remove("hidden");

      projectName = undefined;
    } else {
      return;
    }
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
  if (window.localStorage.getItem("Projects") === null) {
    window.localStorage.setItem("Projects", JSON.stringify(storageObj));
  }
  if (window.localStorage.getItem("Tasks") === null) {
    window.localStorage.setItem("Tasks", JSON.stringify(storageTasks));
  }
}
