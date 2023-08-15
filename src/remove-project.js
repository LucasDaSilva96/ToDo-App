import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
import { renderProjects } from "./storage.js";

export function removeProject(event) {
  if (event.target.nodeName === "path") return;
  let PROJECT_STORAGE = getLocalStorageObject("Projects");
  let TASKS_STORAGE = getLocalStorageObject("Tasks");
  const project_title =
    event.target.parentElement.parentElement.firstElementChild.textContent;

  let findProjectIndex = PROJECT_STORAGE.projects.findIndex((project) => {
    return project.project_name === project_title;
  });

  PROJECT_STORAGE.projects.splice(findProjectIndex, 1);
  pushDataToLocalStorage("Projects", PROJECT_STORAGE);
  renderProjects();

  for (let i = TASKS_STORAGE.tasks.length - 1; i >= 0; i--) {
    if (TASKS_STORAGE.tasks[i].project === project_title) {
      TASKS_STORAGE.tasks.splice(i, 1);
    }
  }

  pushDataToLocalStorage("Tasks", TASKS_STORAGE);
}
