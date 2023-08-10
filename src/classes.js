// Project class
export class PROJECT {
  constructor(projectName) {
    this.projectName = projectName;
  }

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

  saveTaskToProject() {
    const obj = {
      title: this.task_title,
      message: this.task_message,
      due: this.task_due,
      priority: this.task_priority,
      done: false,
      remove: false,
    };
    const data_0 = window.localStorage.getItem("Projects");
    const data = JSON.parse(data_0);
    const index = data.projects.findIndex(
      (element) => element.project_name === this.projectName
    );

    data.projects[index].project_tasks.push(obj);
    window.localStorage.setItem("Projects", JSON.stringify(data));

    const taskStorage_0 = window.localStorage.getItem("Tasks");
    const taskStorage = JSON.parse(taskStorage_0);
    taskStorage.tasks.push(obj);
    window.localStorage.setItem("Tasks", JSON.stringify(taskStorage));
  }
}

function storage(project) {
  let data = JSON.parse(window.localStorage.getItem("Projects"));

  data.projects.push(project);

  return localStorage.setItem("Projects", JSON.stringify(data));
}

export function projectsExist() {
  const projects = window.localStorage.getItem("Projects");

  if (projects === null || projects === undefined) {
    return false;
  } else {
    return true;
  }
}
