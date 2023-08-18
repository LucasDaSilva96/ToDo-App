import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
import { renderProjects } from "./storage.js";
import { renderPeriodTasks } from "./render-sidebar-task.js";
import { ProjectSideBarShowTasks } from "./render-sidebar-task.js";
import { renderTaskNr } from "./render-sidebar-task.js";
import { seeTaskDetailsFunction } from "./add-task-modal.js";
import { renderProjectTasks } from "./render-sidebar-task.js";
import { toggleProjectSelectedSidebarAtrr } from "./render-sidebar-task.js";
const closeModalSvg = document.querySelector(".close-svg");

export function removeProject(event) {
  let PROJECT_STORAGE = getLocalStorageObject("Projects");
  let TASKS_STORAGE = getLocalStorageObject("Tasks");
  const project_title = event.parentElement.parentElement.id;

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

  if (closeModalSvg.dataset.navigation === "sideBar") {
    renderTaskNr();
    seeTaskDetailsFunction();

    ProjectSideBarShowTasks();
  }
}
