// LECTURE-1
// GLOBAL UI VARS

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);

  // remove task event
  taskList.addEventListener("click", removeTask);

  // clear tasks event
  clearBtn.addEventListener("click", clearTasks);

  // filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  // create text node
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  //icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //append the link to the li
  li.appendChild(link);

  //append li to the UL
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";

  e.preventDefault();
}

// LECTURE - 2
// we gonna use event delegation here

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm('are you sure nigga"?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS also
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    // console.log(e.target);
    // console.log(e.target.parentElement);
  }

  e.preventDefault();
}

// CLEAR TASKS

function clearTasks() {
  // one way to remove the items

  taskList.innerHTML = "";

  //  faster way

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from LS

  clearTasksFromLocalStorage();
}

// FILTER TASKS

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    var item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// LECTURE - 3

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// get tasks from LS

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // create text node
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    //icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link to the li
    li.appendChild(link);

    //append li to the UL
    taskList.appendChild(li);
  });
}

// remove tasks from LS

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear the list

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
