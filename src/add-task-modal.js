const addTaskModalSection = document.querySelector(".add-task-modal-section");
const overlay = document.querySelector(".overlay");
const closeModalSvg = document.querySelector(".close-svg");
const sideBarSection = document.querySelector(".sideBar-section");

export function closeAddTaskModal() {
  closeModalSvg.addEventListener("click", function () {
    if (closeModalSvg.dataset.home === "true") {
      overlay.classList.add("hidden");
      addTaskModalSection.classList.add("hidden");
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
    closeModalSvg.dataset.home = "true";
    overlay.classList.remove("hidden");
    addTaskModalSection.classList.remove("hidden");
  });
}
