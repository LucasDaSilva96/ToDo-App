// *** Import Statements
import { getLocalStorageObject } from "./add-task-modal.js";
import { pushDataToLocalStorage } from "./add-task-modal.js";
// *******
// Project class
export class PROJECT {
  constructor(projectName) {
    this.projectName = projectName;
  }

  // This function is for saving the project to the LocalStorage
  saveToLocalStorage() {
    const obj = {
      project_name: this.projectName,
      project_notis: null,
      project_tasks: [],
    };
    storage(obj);
  }
}

export class TASK {
  constructor(projectName, task_title, task_message, task_due, task_priority) {
    this.projectName = projectName;
    this.task_title = task_title;
    this.task_message = task_message;
    this.task_due = task_due;
    this.task_priority = task_priority;
  }

  // This function is for saving the the task to the localStorage &&
  // saving the task inside the right project
  saveTaskToProject() {
    const obj = {
      title: this.task_title,
      message: this.task_message,
      due: this.task_due,
      priority: this.task_priority,
      done: false,
      remove: false,
      project: this.projectName,
    };

    const data = getLocalStorageObject("Projects");
    const index = data.projects.findIndex(
      (element) => element.project_name === this.projectName
    );

    data.projects[index].project_tasks.push(obj);
    pushDataToLocalStorage("Projects", data);

    const taskStorage = getLocalStorageObject("Tasks");
    taskStorage.tasks.push(obj);
    pushDataToLocalStorage("Tasks", taskStorage);
  }
}

// This function is for saving the project to the localStorage
function storage(project) {
  let data = getLocalStorageObject("Projects");

  data.projects.push(project);

  return pushDataToLocalStorage("Projects", data);
}

// This function is for checking if there is a Project key saved in the localStorage
export function projectsExist() {
  const projects = getLocalStorageObject("Projects");

  if (projects === null || projects === undefined) {
    return false;
  } else {
    return true;
  }
}
