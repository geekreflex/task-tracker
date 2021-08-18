"use strict";

const Store = require("electron-store");

class DataStore extends Store {
  constructor(settings) {
    super(settings);

    // initialize with tasks or empty array
    this.tasks = this.get("tasks") || [];
  }

  saveTasks() {
    // save tasks to JSON file
    this.set("tasks", this.tasks);
    return this;
  }

  getTasks() {
    // set object's tasks to tasks in JSON file
    this.taks = this.get("tasks") || [];
    return this;
  }

  addTask(task) {
    // merge the existing tasks with the new task
    this.tasks = [...this.tasks, task];
    return this.saveTasks();
  }

  deleteTask(task) {
    // filter out the target task
    this.tasks = this.tasks.filter((t) => t !== task);
    return this.saveTasks();
  }
}

module.exports = DataStore;
