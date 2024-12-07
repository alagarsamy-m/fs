// Get DOM elements
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Add a new to-do
addTodoBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todos = getTodos();
    todos.push({ text: todoText, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    loadTodos();
  }
});

// Load todos from localStorage
function loadTodos() {
  const todos = getTodos();
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
    todoList.appendChild(li);
  });
}

// Get todos from localStorage
function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

// Delete a todo
function deleteTodo(index) {
  const todos = getTodos();
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
}

// Initial load
loadTodos();
