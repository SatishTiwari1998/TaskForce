//////////////////////////// On Reload ///////////////////////////
window.onload = () => {
  loadTasks();
  loadPriorityTasks();
  loadCompletedTasks();
  updateDashBoard();
  loadAllTasks();

  if (sessionStorage.getItem("userName") === null) {
    let person = prompt("Enter your name !");
    sessionStorage.setItem("userName", person);
    const userName = document.getElementById("username");
    userName.innerHTML = sessionStorage.getItem("userName");
  } else {
    const userName = document.getElementById("username");
    userName.innerHTML = sessionStorage.getItem("userName");
  }
};
/////////////////////// Variable Declarations ////////////////////
let pendingTaskCount = 0;
let priorityTaskCount = 0;
let completedTaskCount = 0;
let oa_cr = 0;
let oa_pr = 0;
let oa_cm = 0;
let oa_dl = 0;

// Initialise count variables
if (
  localStorage.getItem("pendingTaskCount") === 0 ||
  localStorage.getItem("pendingTaskCount") === null
) {
  localStorage.setItem("pendingTaskCount",0)
}

if (
  localStorage.getItem("priorityTaskCount") === 0 ||
  localStorage.getItem("priorityTaskCount") === null
) {
  localStorage.setItem("priorityTaskCount",0);
}

if (
  localStorage.getItem("completedTaskCount") === 0 ||
  localStorage.getItem("completedTaskCount") === null
) {
  localStorage.setItem("completedTaskCount",0);
}

if (
  localStorage.getItem("oa_cr") === 0 ||
  localStorage.getItem("oa_cr") === null
) {
  localStorage.setItem("oa_cr",0);
}
if (
  localStorage.getItem("oa_pr") === 0 ||
  localStorage.getItem("oa_pr") === null
) {
  localStorage.setItem("oa_pr",0);
} 
if (
  localStorage.getItem("oa_cm") === 0 ||
  localStorage.getItem("oa_cm") === null
) {
  localStorage.setItem("oa_cm",0);
} 
if (
  localStorage.getItem("oa_dl") === 0 ||
  localStorage.getItem("oa_dl") === null
) {
  localStorage.setItem("oa_dl",0);
}


////////////////////////// UTILITY FUNCTIONS ///////////////////////////////////

const input = document.getElementById("user-input");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("task-list");
const taskBox = document.querySelector("div.task-box");

function addTask() {
  if (input.value && input.value.length > 4 && input.value.length<=50) {
    ////// Appending To Task List ////////////
    document.getElementById("task-display-box").style.display = "block";
    const taskTitle = input.value;
    const li = document.createElement("li");
    li.innerHTML = `<p style="text-transform: capitalize;">${taskTitle}</p>
                        <div class="task-action">
                        <button id="priority" data-toggle="tooltip" data-placement="top" title="Prioritize" onclick="prioritize(this)"><i class="fa-regular fa-bookmark fa-2x"></i></button>
                        <button id="done" data-toggle="tooltip" data-placement="top" title="Mark Done" onclick="taskDone(this)"><i class="fa-solid fa-check fa-2x"></i></button>
                        <button id="delete" data-toggle="tooltip" data-placement="top" title="Delete Task" onclick="deleteTask(this)"><i class="fa-regular fa-trash-can fa-2x"></i></button>
                        </div>`;
    taskList.insertBefore(li, taskList.children[0]);

    // add task to local storage
    const date = new Date().today();
    const time = new Date().timeNow();
    localStorage.setItem(
      "taskArr",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("taskArr") || "[]"),
        {
          task: taskTitle,
          status: "pending",
          createdOn: { date: date, time: time },
          prioritizedOn: { date: "-", time: "-" },
          completedOn: { date: "-", time: "-" },
        },
      ])
    );
    
    pendingTaskCount=parseInt(localStorage.getItem("pendingTaskCount"));
    oa_cr=parseInt(localStorage.getItem("oa_cr"));
    pendingTaskCount++;
    localStorage.setItem("pendingTaskCount", pendingTaskCount);
    oa_cr++;
    localStorage.setItem("oa_cr", oa_cr);
    updateDashBoard();
  } else {
    const alertDanger = document.createElement("div");
    alertDanger.innerHTML = `<div class="alert alert-danger alert-dismissible fade show">
        <button type="button" class="close" data-dismiss="alert" onclick="deleteAlert(this)">&times;</button>
        <p class="text-center"><strong>Wait!</strong> Invalid Input.</p>
        <ul class="list-unstyled">
          <li>Input should be 5-50 characters long.</li>
          <li>Input should not contain special Characters</li>
        </ul>
      </div>`;

    taskBox.insertBefore(alertDanger, taskBox.children[0]);
  }

  input.value = "";
}

function loadTasks() {
  if (localStorage.getItem("taskArr") == null) return;
  else {
    document.getElementById("task-display-box").style.display = "block";
    let tasks = Array.from(JSON.parse(localStorage.getItem("taskArr")));
    tasks.forEach((element) => {
      const li = document.createElement("li");

      li.innerHTML = `<p style="text-transform: capitalize;">${element.task}</p>
            <div class="task-action">
            <button id="priority" onclick="prioritize(this)"><i class="fa-regular fa-bookmark fa-2x"></i></button>
            <button id="done" onclick="taskDone(this)"><i class="fa-solid fa-check fa-2x"></i></button>
            <button id="delete" onclick="deleteTask(this)"><i class="fa-regular fa-trash-can fa-2x"></i></button>
            </div>`;
      taskList.insertBefore(li, taskList.children[0]);
    });
  }
}

function prioritize(event) {
  document.querySelector("div.priority-task-display-box").style.display =
    "block";
  let tasks = Array.from(JSON.parse(localStorage.getItem("taskArr")));
  let imgIndex = Math.floor(Math.random() * (13 - 1 + 1) + 1);

  tasks.forEach((task) => {
    if (task.task === event.parentNode.parentNode.children[0].innerHTML) {
      const priorityTaskBox = document.querySelector("div.priority-tasks");
      const div = document.createElement("div");
      div.innerHTML = `<div class="card">
            <img class="card-img-top img-fluid" src="./images/priority/${imgIndex}.jpg" alt="Card image cap">
            <button id="edit-card" data-toggle="modal" data-target="#editModal" onclick="modifyCards(this)"><i class="fa-solid fa-pen"></i></button>
            <div class="card-body">
              <h6 class="card-title text-center">Important !</h6>
              <p class="card-text">${event.parentNode.parentNode.children[0].innerHTML}</p>
              <div class="card-buttons d-flex justify-content-between">
                <button id="card-done-btn" onclick="priorityToCompleted(this)"><i class="fa-solid fa-check"></i></button>
                <button id="card-delete-btn" onclick="deletePriorityCard(this)"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </div>`;

      priorityTaskBox.insertBefore(div, priorityTaskBox.children[0]);

      let date = new Date().today();
      let time = new Date().timeNow();

      localStorage.setItem(
        "priorityTaskArr",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("priorityTaskArr") || "[]"),
          {
            task: event.parentNode.parentNode.children[0].innerHTML,
            index: imgIndex,
            status: "priority",
            createdOn: { date: task.createdOn.date, time: task.createdOn.time },
            prioritizedOn: { date: date, time: time },
            completedOn: { date: "-", time: "-" },
            modalOpen:false,
          },
        ])
      );
      tasks.splice(tasks.indexOf(task), 1);

      pendingTaskCount=parseInt(localStorage.getItem("pendingTaskCount"));
      priorityTaskCount=parseInt(localStorage.getItem("priorityTaskCount"));
      oa_pr=parseInt(localStorage.getItem("oa_pr"));
      pendingTaskCount--;
      priorityTaskCount++;
      localStorage.setItem("pendingTaskCount", pendingTaskCount);
      localStorage.setItem("priorityTaskCount", priorityTaskCount);
      oa_pr++;
      localStorage.setItem("oa_pr", oa_pr);
      updateDashBoard();
    }
  });

  localStorage.setItem("taskArr", JSON.stringify(tasks));
  event.parentElement.parentElement.remove();
}

function loadPriorityTasks() {
  if (localStorage.getItem("priorityTaskArr") == null) return;
  else {
    document.querySelector("div.priority-task-display-box").style.display ="block";
      const priorityTaskBox = document.querySelector("div.priority-tasks");

      while(priorityTaskBox.hasChildNodes())
      {
        priorityTaskBox.removeChild(priorityTaskBox.childNodes[0]);
      }
    
    
    let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
    tasks.forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="card">
              <img class="card-img-top img-fluid" src="./images/priority/${element.index}.jpg" alt="Card image cap">
              <button id="edit-card" data-toggle="modal" data-target="#editModal" onclick="modifyCards(this)"><i class="fa-solid fa-pen"></i></button>
              <div class="card-body">
                <h6 class="card-title text-center">Important !</h6>
                <p class="card-text">${element.task}</p>
                <div class="card-buttons d-flex justify-content-between">
                  <button id="card-done-btn" onclick="priorityToCompleted(this)"><i class="fa-solid fa-check"></i></button>
                  <button id="card-delete-btn" onclick="deletePriorityCard(this)"><i class="fa-regular fa-trash-can"></i></button>
                </div>
              </div>
            </div>`;

      priorityTaskBox.insertBefore(div, priorityTaskBox.children[0]);
    });

    tasks.forEach(item=>{    ////setting modalOpen false on reload to avoid any bugs
      item.modalOpen=false;
    });
    localStorage.setItem("priorityTaskArr",JSON.stringify(tasks));
  }
}

function taskDone(event) {
  document.querySelector("div.completed-task-display-box").style.display =
    "block";
  let tasks = Array.from(JSON.parse(localStorage.getItem("taskArr")));
  let imgIndex = Math.floor(Math.random() * (13 - 1 + 1) + 1);

  tasks.forEach((task) => {
    if (task.task === event.parentNode.parentNode.children[0].innerHTML) {
      const completedTaskBox = document.querySelector("div.completed-tasks");
      const div = document.createElement("div");
      div.innerHTML = `<div class="card">
            <img class="card-img-top img-fluid" src="./images/completed/${imgIndex}.jpg" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title text-center">Completed !</h6>
              <p class="card-text">${event.parentNode.parentNode.children[0].innerHTML}</p>
              <div class="card-buttons d-flex justify-content-end">
                <button id="card-delete-btn" onclick="deleteCompletedCard(this)"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </div>`;
      completedTaskBox.insertBefore(div, completedTaskBox.children[0]);

      const date = new Date().today();
      const time = new Date().timeNow();
      localStorage.setItem(
        "completedTaskArr",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("completedTaskArr") || "[]"),
          {
            task: event.parentNode.parentNode.children[0].innerHTML,
            index: imgIndex,
            status: "completed",
            createdOn: { date: task.createdOn.date, time: task.createdOn.time },
            prioritizedOn: { date: "-", time: "-" },
            completedOn: { date: date, time: time },
          },
        ])
      );
      tasks.splice(tasks.indexOf(task), 1);

      pendingTaskCount=parseInt(localStorage.getItem("pendingTaskCount"));
      completedTaskCount=parseInt(localStorage.getItem("completedTaskCount"));
      oa_cm=parseInt(localStorage.getItem("oa_cm"));

      pendingTaskCount--;
      localStorage.setItem("pendingTaskCount", pendingTaskCount);
      completedTaskCount++;
      localStorage.setItem("completedTaskCount", completedTaskCount);
      oa_cm++;
      localStorage.setItem("oa_cm", oa_cm);
      updateDashBoard();
    }
  });

  localStorage.setItem("taskArr", JSON.stringify(tasks));
  event.parentElement.parentElement.remove();
}

function loadCompletedTasks() {
  if (localStorage.getItem("completedTaskArr") == null) return;
  else {
    document.querySelector("div.completed-task-display-box").style.display =
      "block";
    let tasks = Array.from(
      JSON.parse(localStorage.getItem("completedTaskArr"))
    );
    tasks.forEach((element) => {
      const completedTaskBox = document.querySelector("div.completed-tasks");
      const div = document.createElement("div");
      div.innerHTML = `<div class="card">
              <img class="card-img-top img-fluid" src="./images/completed/${element.index}.jpg" alt="Card image cap">
              <div class="card-body">
                <h6 class="card-title text-center">Completed !</h6>
                <p class="card-text">${element.task}</p>
                <div class="card-buttons d-flex justify-content-end">
                  <button id="card-delete-btn" onclick="deleteCompletedCard(this)"><i class="fa-regular fa-trash-can"></i></button>
                </div>
              </div>
            </div>`;

      completedTaskBox.insertBefore(div, completedTaskBox.children[0]);
    });
  }
}

function deleteTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("taskArr")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.parentNode.children[0].innerHTML) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);


      pendingTaskCount=parseInt(localStorage.getItem("pendingTaskCount"));
      oa_dl=parseInt(localStorage.getItem("oa_dl"));

      pendingTaskCount--;
      localStorage.setItem("pendingTaskCount", pendingTaskCount);
      oa_dl++;
      localStorage.setItem("oa_dl", oa_dl);
      updateDashBoard();
    }
  });
  localStorage.setItem("taskArr", JSON.stringify(tasks));
  event.parentElement.parentElement.remove();
}

function deletePriorityCard(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.parentNode.children[1].innerHTML) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);

      priorityTaskCount=parseInt(localStorage.getItem("priorityTaskCount"));
      oa_dl=parseInt(localStorage.getItem("oa_dl"));
      priorityTaskCount--;
      localStorage.setItem("priorityTaskCount", priorityTaskCount);
      oa_dl++;
      localStorage.setItem("oa_dl", oa_dl);
      updateDashBoard();
    }
  });
  localStorage.setItem("priorityTaskArr", JSON.stringify(tasks));
  event.parentElement.parentElement.parentElement.parentElement.remove();
}

function deleteCompletedCard(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("completedTaskArr")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.parentNode.children[1].innerHTML) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
      completedTaskCount=parseInt(localStorage.getItem("completedTaskCount"));
      oa_dl=parseInt(localStorage.getItem("oa_dl"));
      completedTaskCount--;
      localStorage.setItem("completedTaskCount", completedTaskCount);
      oa_dl++;
      localStorage.setItem("oa_dl", oa_dl);
      updateDashBoard();
    }
  });
  localStorage.setItem("completedTaskArr", JSON.stringify(tasks));
  event.parentElement.parentElement.parentElement.parentElement.remove();
}

function priorityToCompleted(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.parentNode.children[1].innerHTML) {
      document.querySelector("div.completed-task-display-box").style.display =
        "block";
      let imgIndex = Math.floor(Math.random() * (13 - 1 + 1) + 1);
      const completedTaskBox = document.querySelector("div.completed-tasks");
      const div = document.createElement("div");
      div.innerHTML = `<div class="card">
            <img class="card-img-top img-fluid" src="./images/priority/${imgIndex}.jpg" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title text-center">Completed !</h6>
              <p class="card-text">${event.parentNode.parentNode.children[1].innerHTML}</p>
              <div class="card-buttons d-flex justify-content-end">
                <button id="card-delete-btn" onclick="deleteCompletedCard(this)"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </div>`;

      completedTaskBox.insertBefore(div, completedTaskBox.children[0]);

      const date = new Date().today();
      const time = new Date().timeNow();

      localStorage.setItem(
        "completedTaskArr",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("completedTaskArr") || "[]"),
          {
            task: event.parentNode.parentNode.children[1].innerHTML,
            index: imgIndex,
            status: "completed",
            createdOn: { date: task.createdOn.date, time: task.createdOn.time },
            prioritizedOn: {
              date: task.prioritizedOn.date,
              time: task.prioritizedOn.time,
            },
            completedOn: { date: date, time: time },
          },
        ])
      );
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
      priorityTaskCount=parseInt(localStorage.getItem("priorityTaskCount"));
      completedTaskCount=parseInt(localStorage.getItem("completedTaskCount"));
      oa_cm=parseInt(localStorage.getItem("oa_cm"));
      priorityTaskCount--;
      localStorage.setItem("priorityTaskCount", priorityTaskCount);
      completedTaskCount++;
      localStorage.setItem("completedTaskCount", completedTaskCount);
      oa_cm++;
      localStorage.setItem("oa_cm", oa_cm);
      updateDashBoard();
    }
  });
  localStorage.setItem("priorityTaskArr", JSON.stringify(tasks));
  event.parentElement.parentElement.parentElement.parentElement.remove();
}

function deleteAlert(event) {
  event.parentElement.parentElement.remove();
}

addBtn.addEventListener("click", () => {   
  addTask();
});



////////////////////// Date and time Utility ////////////////////////////

Date.prototype.today = function () {
  return (
    (this.getDate() < 10 ? "0" : "") +
    this.getDate() +
    "/" +
    (this.getMonth() + 1 < 10 ? "0" : "") +
    (this.getMonth() + 1) +
    "/" +
    this.getFullYear()
  );
};

Date.prototype.timeNow = function () {
  return (
    (this.getHours() < 10 ? "0" : "") +
    this.getHours() +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes() +
    ":" +
    (this.getSeconds() < 10 ? "0" : "") +
    this.getSeconds()
  );
};

////////////// Load All Tasks/////////////////////

function loadAllTasks() {
  if (
    localStorage.getItem("completedTaskArr") == null &&
    localStorage.getItem("priorityTaskArr") == null &&
    localStorage.getItem("taskArr") == null
  )
    return;
  const searchedBox = document.querySelector("div.searched-items");
  let allTaskArray = [];

  if (localStorage.getItem("priorityTaskArr") !== null) {
    let priorityTaskArr = Array.from(
      JSON.parse(localStorage.getItem("priorityTaskArr"))
    );
    for (let i = 0; i < priorityTaskArr.length; i++) {
      allTaskArray.push(priorityTaskArr[i]);
    }
  }

  if (localStorage.getItem("taskArr") !== null) {
    let taskArr = Array.from(JSON.parse(localStorage.getItem("taskArr")));
    for (let i = 0; i < taskArr.length; i++) {
      allTaskArray.push(taskArr[i]);
    }
  }

  if (localStorage.getItem("completedTaskArr") !== null) {
    let completedTaskArr = Array.from(
      JSON.parse(localStorage.getItem("completedTaskArr"))
    );
    for (let i = 0; i < completedTaskArr.length; i++) {
      allTaskArray.push(completedTaskArr[i]);
    }
  }

  shuffle(allTaskArray);

  allTaskArray.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="card">
            <div class="card-body">
              <h5 class="card-title text-center"><span class=${item.status}>${item.status}</span></h5>
              <p class="card-text text-center">${item.task}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Created on:<span class="date">${item.createdOn.date}</span><span class="time">${item.createdOn.time}</span></li>
              <li class="list-group-item">Prioritized on:<span class="date">${item.prioritizedOn.date}</span><span class="time">${item.prioritizedOn.time}</span></li>
              <li class="list-group-item">Completed on:<span class="date">${item.completedOn.date}</span><span class="time">${item.completedOn.time}</span></li>
            </ul>
          </div>`;
    searchedBox.append(div);
  });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

////////////////////// Search Functionality ////////////////////////

function search() {
  const parent = document.querySelector("div.searched-items");
  const p = document.querySelector("p.search-count");
  let query = document.getElementById("search-task").value.toLowerCase();
  const searchArray = Array.from(parent.children);
  if (searchArray.length > 0) {
    let count = 0;
    searchArray.forEach((item) => {
      if (
        item.children[0].children[0].children[1].innerText
          .toLowerCase()
          .includes(query)
      ) {
        item.style.display = "block";
        count++;
      } else {
        item.style.display = "none";
      }
    });
    p.innerHTML = `${count} Items Found`;
  }
}

///////////////// Update DashBoard ///////////////

function updateDashBoard() {
  let completed = parseInt(localStorage.getItem("completedTaskCount"));
  let pending = parseInt(localStorage.getItem("pendingTaskCount"));
  let priority = parseInt(localStorage.getItem("priorityTaskCount"));

  let oa_created = parseInt(localStorage.getItem("oa_cr"));
  let oa_completed = parseInt(localStorage.getItem("oa_cm"));
  let oa_prioritized = parseInt(localStorage.getItem("oa_pr"));
  let oa_deleted = parseInt(localStorage.getItem("oa_dl"));

  document.querySelector("p.pending-count").innerHTML = pending;
  document.querySelector("p.priority-count").innerHTML = priority;
  document.querySelector("p.completed-count").innerHTML = completed;

  document.querySelector("div.overall-stats p.created-count").innerHTML =
    oa_created;
  document.querySelector("div.overall-stats p.priority-count").innerHTML =
    oa_prioritized;
  document.querySelector("div.overall-stats p.completed-count").innerHTML =
    oa_completed;
  document.querySelector("div.overall-stats p.deleted-count").innerHTML =
    oa_deleted;

  /// current progress bars ////
  const pendingBarCurrent = document.getElementById("current-pending-bar");
  const priorityBarCurrent = document.getElementById("current-priority-bar");
  const completedBarCurrent = document.getElementById("current-completed-bar");

  let cur_pending_percentage = Math.round(
    (parseInt(pending) /
      (parseInt(completed) + parseInt(pending) + parseInt(priority))) *
      100
  );
  pendingBarCurrent.style.width = `${cur_pending_percentage}%`;
  pendingBarCurrent.innerHTML = `${cur_pending_percentage}%`;

  let cur_priority_percentage = Math.round(
    (parseInt(priority) /
      (parseInt(completed) + parseInt(pending) + parseInt(priority))) *
      100
  );
  priorityBarCurrent.style.width = `${cur_priority_percentage}%`;
  priorityBarCurrent.innerHTML = `${cur_priority_percentage}%`;

  let cur_complete_percentage = Math.round(
    (parseInt(completed) /
      (parseInt(completed) + parseInt(pending) + parseInt(priority))) *
      100
  );
  completedBarCurrent.style.width = `${cur_complete_percentage}%`;
  completedBarCurrent.innerHTML = `${cur_complete_percentage}%`;

  /// overall progress bars ////

  const createdBarOA = document.getElementById("oa-created-bar");
  const priorityBarOA = document.getElementById("oa-priority-bar");
  const completedBarOA = document.getElementById("oa-completed-bar");
  const deletedBarOA = document.getElementById("oa-deleted-bar");

  let oa_created_percentage = Math.round(
    (parseInt(oa_created) /
      (parseInt(oa_created) +
        parseInt(oa_completed) +
        parseInt(oa_prioritized) +
        parseInt(oa_deleted))) *
      100
  );
  createdBarOA.style.width = `${oa_created_percentage}%`;
  createdBarOA.innerHTML = `${oa_created_percentage}%`;

  let oa_priority_percentage = Math.round(
    (parseInt(oa_prioritized) /
      (parseInt(oa_created) +
        parseInt(oa_completed) +
        parseInt(oa_prioritized) +
        parseInt(oa_deleted))) *
      100
  );
  priorityBarOA.style.width = `${oa_priority_percentage}%`;
  priorityBarOA.innerHTML = `${oa_priority_percentage}%`;

  let oa_completed_percentage = Math.round(
    (parseInt(oa_completed) /
      (parseInt(oa_created) +
        parseInt(oa_completed) +
        parseInt(oa_prioritized) +
        parseInt(oa_deleted))) *
      100
  );
  completedBarOA.style.width = `${oa_completed_percentage}%`;
  completedBarOA.innerHTML = `${oa_completed_percentage}%`;

  let oa_deleted_percentage = Math.round(
    (parseInt(oa_deleted) /
      (parseInt(oa_created) +
        parseInt(oa_completed) +
        parseInt(oa_prioritized) +
        parseInt(oa_deleted))) *
      100
  );
  deletedBarOA.style.width = `${oa_deleted_percentage}%`;
  deletedBarOA.innerHTML = `${oa_deleted_percentage}%`;

  const reloadBtn=document.getElementById("search-tasks-reload");
  reloadBtn.style.backgroundColor='#55C1FF';

  updateCharts();
}

///////////////////////////// CHART JS //////////////////////////////////////
let pie1 = document.getElementById("current-pi-chart").getContext("2d");
let pie2 = document.getElementById("overall-pi-chart").getContext("2d");

let currentPiChart = new Chart(pie1, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["rgb(196, 19, 19)", "#044678", "rgb(1, 71, 1)"],
        hoverOffset: 10,
        rotation: -90,
        weight: 5,
      },
    ],
  },
  options: {
    cutout: 40,
    responsive: true,
  },
});

let overallPiChart = new Chart(pie2, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [5, 10, 12, 6],
        backgroundColor: [
          "rgb(252, 128, 5)",
          "#044678",
          "rgb(1, 71, 1)",
          "rgb(196, 19, 19)",
        ],
        hoverOffset: 10,
        rotation: -90,
      },
    ],
  },
  options: {
    cutout: 40,
    responsive: true,
  },
});

function updateCharts() {
  let completed = localStorage.getItem("completedTaskCount");
  let pending = localStorage.getItem("pendingTaskCount");
  let priority = localStorage.getItem("priorityTaskCount");

  let oa_created = localStorage.getItem("oa_cr");
  let oa_completed = localStorage.getItem("oa_cm");
  let oa_prioritized = localStorage.getItem("oa_pr");
  let oa_deleted = localStorage.getItem("oa_dl");

  const currentUpdatedData = [pending, priority, completed];
  const overallUpdatedData = [
    oa_created,
    oa_prioritized,
    oa_completed,
    oa_deleted,
  ];

  currentPiChart.data.datasets[0].data = currentUpdatedData;
  overallPiChart.data.datasets[0].data = overallUpdatedData;

  currentPiChart.update();
  overallPiChart.update();
}

////////////////////////////////// MODAL Edit Functionalities /////////////////////////////

function modifyCards(e) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
  document.getElementById("save-changes").style.display='block';
  
  tasks.forEach(item=>{
    if(item.task===e.parentNode.children[2].children[1].innerHTML)
    {
      item.modalOpen=true;
    }
  });
  localStorage.setItem("priorityTaskArr",JSON.stringify(tasks));

}

const saveChanges=()=>{
  const modalInput = document.querySelector("input.modal-input");
  let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
  const date=document.getElementById("input-date-show").innerHTML;
  const hr=document.getElementById("input-hr-show").innerHTML;
  const min=document.getElementById("input-min-show").innerHTML;
  let selectedDateTime="--"
  if(date!=="--")
  {
    const arr=date.split("-");
    selectedDateTime=new Date(`${arr[0]}-${arr[1]}-${arr[2]}`);
    const dateNow=new Date();
    if(selectedDateTime<dateNow)
    {
      alert("Cannot set a past date as deadline !");
    }
    else
    {
      selectedDateTime.setHours(parseInt(hr));
      selectedDateTime.setMinutes(parseInt(min));
    }

  }

  tasks.forEach(item=>{
    if(item.modalOpen===true)
    {
      item.task=modalInput.value;
      item.modalOpen=false;
      item.selectedDateTime=selectedDateTime;
    }
  })

  modalInput.value="";
  localStorage.setItem("priorityTaskArr",JSON.stringify(tasks));
  loadPriorityTasks();
  document.getElementById("save-changes").style.display='none';
}

                      //------------ resetting modalOpen status on closing of modal ----------//

const dismiss1=document.getElementById("dismiss-modal-1");
const dismiss2=document.getElementById("dismiss-modal-2");
dismiss1.addEventListener("click",()=>{
  let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
  tasks.forEach(item=>{
    item.modalOpen=false;
  });
  localStorage.setItem("priorityTaskArr",JSON.stringify(tasks));
});
dismiss2.addEventListener("click",()=>{
  let tasks = Array.from(JSON.parse(localStorage.getItem("priorityTaskArr")));
  tasks.forEach(item=>{
    item.modalOpen=false;
  });
  localStorage.setItem("priorityTaskArr",JSON.stringify(tasks));
});





///////////////////////// Reset and Reload Functionalities //////////////////////////

                              // -----Reset List------- ////

const listResetBtn=document.getElementById("list-reset");
function resetList(){
  const list=document.getElementById("task-list");
  if(!list.hasChildNodes()) return;

  const numberOfItems = Array.from(list.children).length;
  let pendingTaskCount=parseInt(localStorage.getItem("pendingTaskCount"));
  let oa_dl=parseInt(localStorage.getItem("oa_dl"));

  while(list.hasChildNodes())
  {
    list.removeChild(list.childNodes[0]);
  }
  pendingTaskCount = pendingTaskCount - parseInt(numberOfItems);
  oa_dl = oa_dl + parseInt(numberOfItems);
  localStorage.setItem("pendingTaskCount",pendingTaskCount);
  localStorage.setItem("oa_dl",oa_dl);
  localStorage.setItem("taskArr",JSON.stringify([]));
  updateDashBoard();
}
listResetBtn.addEventListener("click",resetList);

                           // ----Search Reload Box---- ////

const reloadBtn=document.getElementById("search-tasks-reload");

function reloadSearchBox()
{
  const p = document.querySelector("p.search-count");
  const reloadBtn=document.getElementById("search-tasks-reload");
  const count=parseInt(localStorage.getItem("pendingTaskCount"))+parseInt(localStorage.getItem("priorityTaskCount"))+parseInt(localStorage.getItem("completedTaskCount"));
  const searchContainer=document.querySelector("div.searched-items");
  while(searchContainer.hasChildNodes() && searchContainer.children[0]!==undefined)
  {
    searchContainer.removeChild(searchContainer.children[0]);
  }
  loadAllTasks();
  p.innerHTML = `${count} Items Found`;
  reloadBtn.style.backgroundColor='grey';
}

reloadBtn.addEventListener("click",reloadSearchBox);


//////////////////////// User Selected Date and Time /////////////////////


function getDateInput()
{
  const date_input=document.getElementById("input-date-show");
  date_input.innerHTML=document.getElementById("modal-date-input").value;
  document.getElementById("input-hr-show").innerHTML="00";
  document.getElementById("input-min-show").innerHTML="00";

}

function getHourInput()
{
  const hr_input=document.getElementById("input-hr-show");
  let hr=document.getElementById("modal-hr-input").value;
  hr < 10 ? (hr_input.innerHTML="0"+hr):(hr_input.innerHTML=hr);
  
}

function getMinInput()
{
  const min_input=document.getElementById("input-min-show");
  let min=document.getElementById("modal-min-input").value;
  min < 10 ? (min_input.innerHTML="0"+min):(min_input.innerHTML=min);

}

////////////////////// Timer ////////////////////////////////////////
// function Timer(selectedDate) {

//   if(selectedDate==='Invalid Date') return;

//     const startDate = new Date();
//     const endDate = new Date(selectedDate);
//     console.log(startDate,endDate);
  
//     const x = setInterval(function () {
//       let now = new Date().getTime();
  
//       const distance = endDate - now;
  
//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       console.log(hours,minutes,seconds)
  
//       if (now > startDate && now < endDate) {
//         return innerHTML=(days + 'd : ' + hours + 'hrs : ' + minutes + 'mins : ' + seconds + 's');
//       }
//     }, 1000);
//   }



















