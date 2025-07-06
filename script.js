const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

//função para adicionar uma tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    //cria nova lista item
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button onclick="toggleDone(this)">Concluir</button>
            <button onclick="deleteTask(this)">Excluir</button>
        </div>
    `;

    //adiciona o item à lista
    taskList.appendChild(li);
    
    //limpa o campo de entrada
    taskInput.value = '';
}

//função para alternar o estado de conclusão da tarefa
function toggleDone(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('done');
}

//função para excluir uma tarefa
function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}

//permite adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});