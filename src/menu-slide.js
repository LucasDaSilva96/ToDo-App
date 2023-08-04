const menuBtn = document.querySelector(".menu");
const sideBarSection = document.querySelector(".sideBar-section");
const calenderClockSection = document.querySelector(".calender-clock-section");
const taskSection = document.querySelector(".task-section");
const addTaskBtnSection = document.querySelector(".add-task-btn-section");
export function menuSlider() {
  menuBtn.addEventListener("click", function () {
    sideBarSection.classList.toggle("slide-sideBar");

    calenderClockSection.classList.toggle("hidden");
    taskSection.classList.toggle("hidden");
    addTaskBtnSection.classList.toggle("hidden");
  });
}
