const addProjectBtn = document.querySelector(".add");
const projectInputField = document.getElementById("project-input");
const projectsListContainer = document.querySelector(".projects-list-box");
const projectInputContainer = document.querySelector(".project-input-div");
const openProjectInputBtn = document.querySelector(".add-project-svg");
let projectName = undefined;

export function projectInputListener() {
  projectInputField.addEventListener("input", function () {
    projectName = projectInputField.value;
  });

  addProjectBtn.addEventListener("click", function () {
    if (projectName !== undefined) {
      console.log("true");
      projectsListContainer.innerHTML += `
      <div class="project-box" id="${projectName}">
          <h4>${projectName}</h4>
            <div class="task-nr-div">
                  <p></p>
            </div>
      </div>
      
      `;

      projectInputContainer.classList.add("hidden");
      openProjectInputBtn.classList.remove("hidden");
      projectName = undefined;
    } else {
      console.log("false");

      return;
    }
  });
}
