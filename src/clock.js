const currentTime = document.querySelector(".current-time");

export function clockFunction() {
  const date = new Date();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  if (currentMinute <= 9) {
    currentMinute = `0${currentMinute}`;
  }

  if (currentHour <= 9) {
    currentHour = `0${currentHour}`;
  }
  let Time = `${currentHour}:${currentMinute}`;
  return (currentTime.textContent = Time);
}
