document.addEventListener('DOMContentLoaded', function () {
            const addButton = document.getElementById('add-task');
            const inputField = document.getElementById('new-task');
            const todoList = document.getElementById('todo-list');
            const image1 = document.querySelector('.placeholder-img');


    // Load existing tasks from localStorage
            const savedTasks = JSON.parse(localStorage.getItem('todos')) || [];
            savedTasks.sort((tA, tB) => tA.completed ? -1 : 1).forEach(task => {
                addTask(task.text, task.completed, task.priority); // Add the priority parameter
            });


    // on submit
            function onSubmit(evt) {
            evt.preventDefault();

            const taskText = inputField.value.trim();

            if (taskText) {
            const priority = 'low'; // Default priority, you can modify this based on user input
            addTask(taskText, false, priority);
            inputField.value = '';
            saveTasks();
            }

            }

    // Function to add a task
        addButton.addEventListener('click', onSubmit);
        
    // Add task to the list
        function addTask(text, completed = false, priority = 'low') {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        if (completed) {
            listItem.classList.add('completed');
            
        }
        image1.remove();
  
    
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        textSpan.onclick = () => editTask(textSpan); // Edit task on text click
        listItem.appendChild(textSpan);
    
        // Add priority dropdown
const prioritySelect = document.createElement('select');
prioritySelect.className = 'priority-select';
['low', 'medium', 'high'].forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value.charAt(0).toUpperCase() + value.slice(1);
    prioritySelect.appendChild(option);
});
prioritySelect.value = priority; // Set the priority value
prioritySelect.onchange = () => { saveTasks(); }; // Save priority on change
listItem.appendChild(prioritySelect);

    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => { listItem.remove(); saveTasks(); }; // Delete task
        listItem.appendChild(deleteButton);
    
        const completeButton = document.createElement('input');
        completeButton.type = 'checkbox';
        completeButton.checked = completed;
        completeButton.onchange = () => { listItem.classList.toggle('completed'); saveTasks(); }; // Mark as completed
        listItem.appendChild(completeButton);
    
        todoList.insertBefore(listItem, todoList.firstChild);
    }
    

    // Edit task function
    function editTask(textElement) {
        const newText = prompt("Edit your task:", textElement.textContent);
        if (newText !== null && newText.trim() !== "") {
            textElement.textContent = newText.trim();
            saveTasks();
        }
    }
    

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(todoList.children).map(li => {
            return {
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed'),
                priority: li.querySelector('select').value,
            };
        });
        localStorage.setItem('todos', JSON.stringify(tasks));

        
        
    }
    
    
});