const addTaskModalSection = document.querySelector(".add-task-modal-section");
const overlay = document.querySelector(".overlay");
const closeModalSvg = document.querySelector(".close-svg");
const sideBarSection = document.querySelector(".sideBar-section");

export function closeAddTaskModal() {
  closeModalSvg.addEventListener("click", function () {
    addTaskModalSection.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    sideBarSection.classList.add("slide-sideBar");
  });
}
