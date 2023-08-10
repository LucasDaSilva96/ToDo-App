const day_0_name = document.querySelector(".day-0-name");
const day_0_nr = document.querySelector(".day-0-nr");
// ***
const day_1_name = document.querySelector(".day-1-name");
const day_1_nr = document.querySelector(".day-1-nr");
// ***
const day_2_name = document.querySelector(".day-2-name");
const day_2_nr = document.querySelector(".day-2-nr");
// ***
const day_3_name = document.querySelector(".day-3-name");
const day_3_nr = document.querySelector(".day-3-nr");
// ***
const day_4_name = document.querySelector(".day-4-name");
const day_4_nr = document.querySelector(".day-4-nr");
// ***
const day_5_name = document.querySelector(".day-5-name");
const day_5_nr = document.querySelector(".day-5-nr");
// ***
const day_6_name = document.querySelector(".day-6-name");
const day_6_nr = document.querySelector(".day-6-nr");

const currentDateDiv = document.querySelector(".current-date");

export function setCalenderDates() {
  const day_0 = getNextDays(0);
  const day_1 = getNextDays(1);
  const day_2 = getNextDays(2);
  const day_3 = getNextDays(3);
  const day_4 = getNextDays(4);
  const day_5 = getNextDays(5);
  const day_6 = getNextDays(6);

  // Change the currentDateDiv to the current date i the right
  // formate
  currentDateDiv.textContent = changeDateFormat(day_0);

  // This is for setting up the calender in the home-page
  day_0_name.textContent = getDayName(day_0);
  day_0_nr.textContent = getDayNr(day_0);
  // **
  day_1_name.textContent = getDayName(day_1);
  day_1_nr.textContent = getDayNr(day_1);
  // **
  // **
  day_2_name.textContent = getDayName(day_2);
  day_2_nr.textContent = getDayNr(day_2);
  // **
  day_3_name.textContent = getDayName(day_3);
  day_3_nr.textContent = getDayNr(day_3);
  // **
  day_4_name.textContent = getDayName(day_4);
  day_4_nr.textContent = getDayNr(day_4);
  // **
  day_5_name.textContent = getDayName(day_5);
  day_5_nr.textContent = getDayNr(day_5);
  // **
  day_6_name.textContent = getDayName(day_6);
  day_6_nr.textContent = getDayNr(day_6);
  // **
  toggleIsSelectedAttr();
}

function getNextDays(daysToAdd) {
  const date = new Date();
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + daysToAdd);
  return nextDay;
}

function getDayName(date) {
  let dateString = `${date}`;
  return dateString.split(" ")[0];
}

function getDayNr(date) {
  let dateString = `${date}`;
  return dateString.split(" ")[2];
}

function changeDateFormat(date) {
  let dateString = `${date}`;
  let dateStringArray = dateString.split(" ");
  let result = `${dateStringArray[2]}|${dateStringArray[1]}|${dateStringArray[3]}`;
  return result;
}

function toggleIsSelectedAttr() {
  const date_containers = document.querySelectorAll(".calender-box-container");

  date_containers.forEach((el) => {
    el.addEventListener("click", function () {
      for (let i = 0; i < date_containers.length; i++) {
        date_containers[i].dataset.clicked = "false";
      }
      if (el.dataset.clicked === "false") {
        el.dataset.clicked = "true";
      }
    });
  });
}
