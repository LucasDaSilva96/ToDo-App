const currentTime = document.querySelector(".current-time");

export function clockFunction() {
  const date = new Date();
  const currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  if (currentMinute <= 9) {
    currentMinute = `0${currentMinute}`;
  }
  let Time = `${currentHour}:${currentMinute}`;
  return (currentTime.textContent = Time);
}
