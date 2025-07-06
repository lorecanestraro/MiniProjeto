const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    createTaskElement(taskText); 
    
    taskInput.value = ''; 
    saveTasks();
}

function createTaskElement(taskText, isDone = false) {
    const li = document.createElement('li');
    if (isDone) {
        li.classList.add('done');
    }
    
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="toggle-btn" onclick="toggleDone(this)">${isDone ? 'Refazer' : 'Concluir'}</button>
            <button class="edit-btn" onclick="editTask(this)">Editar</button>
            <button class="delete-btn" onclick="deleteTask(this)">Excluir</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleDone(button) {
    const li = button.closest('li');
    li.classList.toggle('done');
    
    if (li.classList.contains('done')) {
        button.textContent = 'Refazer';
    } else {
        button.textContent = 'Concluir';
    }
    saveTasks(); 
}

function editTask(button) {
    const li = button.closest('li');
    const span = li.querySelector('span');
    const currentText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    li.replaceChild(input, span);
    input.focus();

    button.textContent = 'Salvar';
    button.setAttribute('onclick', 'saveEditedTask(this)');
}

function saveEditedTask(button) {
    const li = button.closest('li');
    const input = li.querySelector('input[type="text"]');
    const newText = input.value.trim();

    if (newText) {
        const span = document.createElement('span');
        span.textContent = newText;
        li.replaceChild(span, input);

        button.textContent = 'Editar';
        button.setAttribute('onclick', 'editTask(this)');
        saveTasks(); 
    } else {
        alert('A tarefa não pode ficar vazia!');
    }
}

function deleteTask(button) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        const li = button.closest('li');
        li.remove();
        saveTasks(); 
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            done: li.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => createTaskElement(task.text, task.done));
    }
}

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});