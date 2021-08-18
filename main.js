const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const DataStore = require("./db/DataStore");
const tasksData = new DataStore({ name: "Tasks" });

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.send("tasks", tasksData.tasks);
  });

  let addTaskWindow;

  ipcMain.handle("add-task-window", () => {
    if (!addTaskWindow) {
      addTaskWindow = new BrowserWindow({
        width: 400,
        height: 400,
        parent: mainWindow,
        autoHideMenuBar: true,
        webPreference: {
          preload: path.join(__dirname, "./src/addPreload.js"),
        },
      });

      addTaskWindow.loadFile(path.join(__dirname, "./src/add.html"));

      addTaskWindow.on("closed", () => {
        addTaskWindow = null;
      });
    }
  });

  ipcMain.on("task", (event, task) => {
    const updatedTasks = tasksData.addTask(task).tasks;

    mainWindow.webContents.send("tasks", updatedTasks);
  });

  ipcMain.on("delete-task", (event, task) => {
    const updatedTasks = tasksData.deleteTask(task).tasks;

    mainWindow.webContents.send("tasks", updatedTasks);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.plaform !== "darwin") {
    app.quit();
  }
});
