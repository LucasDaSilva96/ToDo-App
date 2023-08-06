const currentTime = document.querySelector(".current-time");

export function clockFunction() {
  const date = new Date();
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  let Time = `${currentHour}:${currentMinute}`;
  return (currentTime.textContent = Time);
}
