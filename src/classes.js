// Project class
export class PROJECT {
  constructor(projectName) {
    this.projectName = projectName;
  }

  saveToLocalStorage() {
    const counter = window.localStorage.length;
    const obj = {
      project_name: this.projectName,
      project_notis: null,
      project_tasks: [],
    };
    const str = JSON.stringify(obj);
    localStorage.setItem(`Project_${counter}`, str);
  }
}
