let tasks = [];
const backend = fetch('https://jsonplaceholder.typicode.com/users');
console.log(backend);
function onAddTask() {
  const inputValue = document.querySelector(".style-input").value;

  const task = {
    isDone: false,
    text: inputValue,
    id: tasks.length + 1
  };

  tasks.push(task);

  renderTask(task);
}

function handlerCheckboxChange(event) {
  const isChecked = event.currentTarget.checked;
  const index = Number(
    event.currentTarget.parentElement.parentElement.getAttribute("data-id")
  );
  let findElement = tasks.find((element) => element.id === index);
  findElement.isDone = isChecked;
  const textElement = document.querySelector(
    `div[data-id='${index}'] .taskText`
  );
  if (isChecked === true) {
    //либо просто if(isChecked)
    textElement.classList.add("textDecoration");
  } else {
    textElement.classList.remove("textDecoration");
  }
  UpdateDoneTask();
}

function handleDeleteTask(event) {
  const taskElement = event.currentTarget.parentNode;
  taskElement.remove();

  const index = Number(taskElement.getAttribute("data-id"));

  tasks = tasks.filter((task) => task.id !== index);
  updateTotalTasks();
  document.querySelector(
    ".totalTasks"
  ).innerHTML = `Всего задач ${tasks.length}`;
  UpdateDoneTask();
}

function renderTask(task) {
  const taskHTML = `<div><input type="checkbox" class="check" /></div><p class="taskText">${task.text}</p><div class="trash"><img src="/img/trash.png" /></div>
  `;

  const taskdiv = document.createElement("div");
  taskdiv.classList.add("task");
  taskdiv.innerHTML = taskHTML;
  taskdiv.setAttribute("data-id", task.id);

  document.querySelector(".tasks").appendChild(taskdiv);

  const trashElement = document.querySelector(
    `div[data-id='${task.id}'] .trash`
  );

  trashElement.onclick = handleDeleteTask;

  const checkboxElement = document.querySelector(
    `div[data-id ='${task.id}'] .check`
  );
  checkboxElement.onclick = handlerCheckboxChange;
  updateTotalTasks();
  // document.querySelector(
  //   ".totalTasks"
  // ).innerHTML = `Всего задач ${tasks.length}`;
}

function updateTotalTasks() {
  let allTask = document.querySelector(".totalTasks");
  let count = tasks.length;
  allTask.textContent = `Всего задач ${[count]}`;
}
document.querySelector(".style-button").onclick = onAddTask;
function UpdateDoneTask() {
  let filterDoneTask = tasks.filter((task) => task.isDone == true).length;
  document.querySelector(".doneTask").innerHTML = `Выполнено ${filterDoneTask}`;
}
