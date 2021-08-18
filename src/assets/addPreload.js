const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("addTask", {
  send: (channel, data) => {
    ipcRenderer.invoke(channel, data);
  },
});
