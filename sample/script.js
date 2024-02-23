document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('taskList');

    if (taskInput.value !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span onclick="editTask(this)">${taskInput.value}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);

        saveTask(taskInput.value);
        taskInput.value = '';
    }
}

function editTask(span) {
    const taskText = span.innerText;

    Swal.fire({
        title: 'Edit Task',
        input: 'text',
        inputValue: taskText,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            span.innerText = result.value;
            updateTask(taskText, result.value);
        }
    });
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList');
    const li = button.parentElement;
    taskList.removeChild(li);

    const taskText = li.querySelector('span').innerText;
    removeTask(taskText);
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldTask, newTask) {
    const tasks = getTasks();
    const index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(task) {
    const tasks = getTasks().filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span onclick="editTask(this)">${task}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
