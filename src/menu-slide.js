const menuBtn = document.querySelector(".menu");
const sideBarSection = document.querySelector(".sideBar-section");
const calenderClockSection = document.querySelector(".calender-clock-section");
const taskSection = document.querySelector(".task-section");
const addTaskBtnSection = document.querySelector(".add-task-btn-section");

// This function is for showing the sideBar section and hide
// the other sections
export function menuSlider() {
  menuBtn.addEventListener("click", function () {
    sideBarSection.classList.toggle("slide-sideBar");

    calenderClockSection.classList.toggle("hidden");
    taskSection.classList.toggle("hidden");
    addTaskBtnSection.classList.toggle("hidden");
  });
}
