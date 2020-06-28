var todoInput = document.getElementById('newTodo');
var addbtn = document.getElementById('addTodo');
var clearTask = document.getElementById('clearTask');
var todoList = document.getElementById('todoList');
var taskCount = document.getElementById('taskCount');

var todoData = [];
renderPage(todoData);

addbtn.addEventListener('click', addTodo);
clearTask.addEventListener('click', removeAllTask);
todoList.addEventListener('click', doSomething);


function addTodo() {
    if (todoInput.value.trim() !== '') {
        todoData.push({
            id: Math.floor(Date.now()),
            title: todoInput.value,
            completed: false,
        })
        renderPage(todoData);
        todoInput.value = '';
    }
}

function doSomething(e) {
    var dataAction = e.target.dataset.action;
    var id = e.target.dataset.id;
    if (dataAction == 'remove')
        removeTodo(id);
    else if (dataAction == 'complete')
        completeTodo(id);
}

function removeTodo(id) {
    var newIndex = 0;
    todoData.forEach(function (item, key) {
        if (id == item.id) {
            newIndex = key;
        }
    })
    todoData.splice(newIndex, 1);
    renderPage(todoData);
}

function removeAllTask(e) {
    e.preventDefault();
    todoData = [];
    renderPage(todoData);
}

function completeTodo(id) {
    todoData.forEach((item) => {
        if (id == item.id)
            item.completed = !item.completed;
    });
    renderPage(todoData);
}

function renderPage(data) {
    var str = '';
    data.forEach(function (item) {
        str += `<li class="list-group-item">
      <div class="d-flex">
      <div class="form-check">
      <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
      <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
      </div>
      <button type="button" class="close ml-auto" aria-label="Close">
      <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
      </button>
      </div>
      </li>`;
    });

    todoList.innerHTML = str;
    taskCount.textContent = data.length;
}