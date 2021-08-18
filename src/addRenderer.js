const task = document.querySelector("#task-value");
const saveBtn = document.querySelector("#save-task");

saveBtn.addEventListener("click", async () => {
  await window.addTask.send("task", task.value);
});

task.value = "";
