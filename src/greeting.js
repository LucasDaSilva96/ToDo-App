const HtmlBody = document.querySelector("body");
const greetingTxt = document.querySelector(".greeting");
export function greetingFunction() {
  const date = new Date();
  const currentHour = date.getHours();

  if (currentHour >= 5 && currentHour <= 12) {
    HtmlBody.className = "dayBackground";
    greetingTxt.textContent = "Good Morning";
  } else if (currentHour >= 13 && currentHour <= 22) {
    HtmlBody.className = "eveningBackground";
    greetingTxt.textContent = "Good Evening";
  } else {
    HtmlBody.className = "nightBackground";
    greetingTxt.textContent = "Good Night";
  }
}
