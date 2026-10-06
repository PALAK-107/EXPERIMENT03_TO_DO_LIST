const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const count = document.getElementById("taskCount");

function updateCount() {
  const total = list.children.length;
  const completed = list.querySelectorAll(".completed").length;
  count.textContent = `${total} task${total === 1 ? "" : "s"} • ${completed} completed`;
}

function addTask(text) {
  const li = document.createElement("li");
  li.className = "task";

  const left = document.createElement("label");
  left.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete task: ${text}`);

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateCount();
  });

  deleteButton.addEventListener("click", () => {
    li.remove();
    updateCount();
  });

  left.append(checkbox, span);
  li.append(left, deleteButton);
  list.appendChild(li);
  updateCount();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = "";
  input.focus();
});
