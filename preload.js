const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("addTask", {
  open: () => ipcRenderer.invoke("add-task-window"),
  delete: (task) => ipcRenderer.send("delete-task", task),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
