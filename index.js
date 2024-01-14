// selector
const todoInput = document.querySelector(".todo-input");
const todoButoon = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoState = {
  todo: [],
};

// Event listener
document.addEventListener("DOMContentLoaded", function () {
  console.log(`controle reach here`);
  let getTodoFromStore = localStorage.getItem("saved-todo");
  if (getTodoFromStore) {
    todoState.todo = JSON.parse(getTodoFromStore);
    renderAllTodo();
  }
});

todoButoon.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheckClick);
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  const newTodo = {
    id: Date.now().toString(),
    title: todoInput.value,
    isCompleted: false,
  };
  todoState.todo.push(newTodo);
  saveTodo();
  renderAllTodo();
  todoInput.value = "";
}

function getTodo({ id, title, isCompleted }) {
  const outerDiv = document.createElement("div");
  outerDiv.setAttribute("id", id);
  outerDiv.classList.add("todo");
  if (isCompleted) {
    outerDiv.classList.add("completed");
  }
  const textTodo = document.createElement("li");
  textTodo.innerText = title;
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
  const clickItem = event.target;
  if (clickItem.classList[0] === "delete-btn") {
    const todo = clickItem.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      const index = todoState.todo.findIndex(
        (element) => element.id === todo.id
      );
      if (index > 0) {
        todoState.todo.splice(index, 1);
      }
      saveTodo();
      todo.remove();
    });
  }
  if (clickItem.classList[0] === "completed-btn") {
    const id = clickItem.parentElement.id;
    const findedTodo = todoState.todo.find((element) => element.id == id);
    findedTodo.isCompleted = !findedTodo.isCompleted;
    saveTodo();
    renderAllTodo();
  }
}

function renderAllTodo() {
  let temp = new Map();
  let oldNodes = todoList.children;
  for (let i = 0; i < todoState.todo.length; i++) {
    const element = todoState.todo[i];
    if (oldNodes.length == 0) {
      const todo = getTodo(element);
      todoList.appendChild(todo);
    } else if (temp.length > 0 && temp.get(element.id)) {
      todoList.appendChild(temp.get(element.id));
    } else if (i > oldNodes.length - 1) {
      const todo = getTodo(element);
      todoList.appendChild(todo);
    } else {
      const oldElement = oldNodes[i];
      if (oldElement.id != element.id) {
        oldElement.remove();
        temp.set(oldElement.id, oldElement);
        const todo = getTodo(element);
        todoList.appendChild(todo);
      } else {
        const oldTitl = oldElement.children[0].innerText;
        const oldIsCheck = oldElement.classList.contains("completed");
        if (oldTitl != element.title) {
          oldElement.children[0].innerText = element.title;
        }
        if (element.isCompleted) {
          if (!oldIsCheck) {
            oldElement.classList.toggle("completed");
          }
        } else {
          if (oldIsCheck) oldElement.classList.remove("completed");
        }
      }
    }
  }
}

function saveTodo() {
  localStorage.setItem("saved-todo", JSON.stringify(todoState.todo));
}
