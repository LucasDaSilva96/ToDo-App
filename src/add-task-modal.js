const addTaskModalSection = document.querySelector(".add-task-modal-section");
const overlay = document.querySelector(".overlay");
const closeModalSvg = document.querySelector(".close-svg");
const sideBarSection = document.querySelector(".sideBar-section");

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
    closeModalSvg.dataset.navigation = "home";
    overlay.classList.remove("hidden");
    addTaskModalSection.classList.remove("hidden");
  });
}

const addTaskSideBarBtn = document.querySelector(".sideBar-add-task-btn");

export function openAddTaskModalSideBar() {
  addTaskSideBarBtn.addEventListener("click", function () {
    closeModalSvg.dataset.navigation = "sideBar";
    overlay.classList.remove("hidden");
    addTaskModalSection.classList.remove("hidden");
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
