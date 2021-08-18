const addBtn = document.querySelector("#add-new-task");
const taskList = document.querySelector("#task-list");
const msg = document.querySelector("#empty-msg");

addBtn.addEventListener("click", async () => {
  await window.addTask.open();
});

const deleteTask = (e) => {
  window.addTask.delete(e.target.textContent);
};

window.addTask.receive("tasks", (data) => {
  msg.textContent = data.length == 0 ? "You don't have any task." : "";

  let html = "";
  data.map((d) => {
    html += `<li class="task-item">${d}</li>`;
  });
  taskList.innerHTML = html;

  taskList.querySelectorAll(".task-item").forEach((item) => {
    item.addEventListener("click", deleteTask);
  });
});
