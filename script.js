// SOURCE: https://www.youtube.com/watch?v=Ttf3CEsEwMQ

// SELECTROS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentloaded', getTodos());
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



// FUNCTIONS
function addTodo(event) {
    event.preventDefault(); // prevent button from submitting
    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // complted button
    const compBtn = document.createElement("button");
    compBtn.innerHTML = '<i class="fas fa-check"></i>';
    compBtn.classList.add("complete-btn");
    todoDiv.appendChild(compBtn);
    // delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add("delete-btn");
    todoDiv.appendChild(delBtn);
    // APPEND iten to UL
    todoList.appendChild(todoDiv);
    // clear todo input
    todoInput.value = '';
    // console.log(todoDiv)
}

function deleteCheck(e) {
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall'); 
        removeStorageTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    // check mark
    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = Array.from(todoList.children);
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex'
                break;
            case "comp":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncomp":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break
        }
    })
};

function saveLocalTodos (todo) {
    // check local storage for existing ones
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos () {
    // check local storage for existing ones
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create todo li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // complted button
        const compBtn = document.createElement("button");
        compBtn.innerHTML = '<i class="fas fa-check"></i>';
        compBtn.classList.add("complete-btn");
        todoDiv.appendChild(compBtn);
        // delete button
        const delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fas fa-trash"></i>';
        delBtn.classList.add("delete-btn");
        todoDiv.appendChild(delBtn);
        // APPEND iten to UL
        todoList.appendChild(todoDiv);
    });
};

function removeStorageTodos (todo) {
    // check local storage for existing ones
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}