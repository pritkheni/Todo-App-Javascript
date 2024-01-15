// selector
const todoInput = document.querySelector(".todo-input");
const todoButoon = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const fillterTodo = document.querySelector(".fillter-todo");
const todoState = {
  todo: [],
};

// Event listener
document.addEventListener("DOMContentLoaded", function () {
  let getTodoFromStore = localStorage.getItem("saved-todo");
  if (getTodoFromStore) {
    todoState.todo = JSON.parse(getTodoFromStore);
    renderAllTodo(todoState.todo);
  }
});

todoButoon.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheckClick);
fillterTodo.addEventListener("click", fillterTodoOption);

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
  renderAllTodo(todoState.todo);
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
      const index = todoState.todo.findIndex((element) => {
        console.log(element.id);
        console.log(element.id == todo.id);
        return element.id == todo.id;
      });
      if (index >= 0) {
        todoState.todo.splice(index, 1);
        console.log(todoState.todo);
        saveTodo();
      }
      todo.remove();
    });
  }
  if (clickItem.classList[0] === "completed-btn") {
    const id = clickItem.parentElement.id;
    const findedTodo = todoState.todo.find((element) => element.id == id);
    findedTodo.isCompleted = !findedTodo.isCompleted;
    saveTodo();
    renderAllTodo(todoState.todo);
  }
}

function fillterTodoOption(event) {
  switch (event.target.value) {
    case "all":
      console.log("all");
      console.log(todoState.todo);
      renderAllTodo(todoState.todo);
      break;
    case "complete":
      console.log(
        JSON.stringify(todoState.todo.filter((element) => element.isCompleted))
      );
      renderAllTodo(todoState.todo.filter((element) => element.isCompleted));
      break;
    case "uncompleted":
      console.log(todoState.todo.filter((element) => !element.isCompleted));
      renderAllTodo(todoState.todo.filter((element) => !element.isCompleted));
      break;
  }
}

function renderAllTodo(todos) {
  let temp = new Map();
  const oldNodes = todoList.children;
  if (todos.length == 0) todoList.innerHTML = "";
  if (oldNodes.length > todos.length) {
    for (let i = todos.length; i < oldNodes.length; i++) {
      const element = oldNodes[i];
      console.log(element);
      temp.set(element.id, element);
    }
  }

  for (let i = 0; i < todos.length; i++) {
    const element = todos[i];
    if (oldNodes.length == 0) {
      const todo = getTodo(element);
      todoList.appendChild(todo);
    } else if (temp.size > 0 && temp.get(element.id)) {
      const el = temp.get(element.id);
      if (i > oldNodes.length - 1) {
        todoList.appendChild(el);
      } else {
        temp.set(oldNodes[i].id, oldNodes[i]);
        oldNodes[i].remove();
        oldNodes[i] = el;
      }
      temp.delete(element.id);
    } else if (i > oldNodes.length - 1) {
      const todo = getTodo(element);
      todoList.appendChild(todo);
    } else {
      const oldElement = oldNodes[i];
      if (oldElement.id != element.id) {
        oldElement.id = element.id;
      }
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
  temp.forEach((values, _keys) => {
    try {
      values.remove();
    } catch (err) {
      console.log(err);
    }
  });
  console.log(temp);
}

function saveTodo() {
  localStorage.setItem("saved-todo", JSON.stringify(todoState.todo));
}
