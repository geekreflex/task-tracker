const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("addTask", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
});
