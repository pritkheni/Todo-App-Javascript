// selector
const todoInput = document.querySelector(".todo-input");
const todoButoon = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event listener
todoButoon.addEventListener("click", addTodo);

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
  completeButton.classList.add("completd-btn");
  outerDiv.appendChild(completeButton);

  //trash button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  outerDiv.appendChild(deleteButton);
  return outerDiv;
}
