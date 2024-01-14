// selector
const todoInput = document.querySelector(".todo-input");
const todoButoon = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event listener
todoButoon.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheckClick);
function addTodo(event) {
  //Prevent from from submitting
  event.preventDefault();
  console.log(`this buttton is working`);
  const todo = getTodo(todoInput.value);
  todoList.appendChild(todo);
  todoInput.value = "";
}

function getTodo(inputText) {
  const outerDiv = document.createElement("div");
  outerDiv.classList.add("todo");
  const textTodo = document.createElement("li");
  textTodo.innerText = inputText;
  textTodo.classList.add("todo-item");
  outerDiv.appendChild(textTodo);
  //check button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.classList.add("completed-btn");
  outerDiv.appendChild(completeButton);

  //trash button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  outerDiv.appendChild(deleteButton);
  return outerDiv;
}

function deleteAndCheckClick(event) {
  console.log(event.target);
  const clickItem = event.target;
  if (clickItem.classList[0] === "delete-btn") {
    const todo = clickItem.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (clickItem.classList[0] === "completed-btn") {
    const todo = clickItem.parentElement;
    todo.classList.toggle("completed");
  }
}
