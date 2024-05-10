let tasks = [];

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    const uniqueTasks = Array.from(new Set(tasks.map(task => JSON.stringify(task))))
                          .map(task => JSON.parse(task));
  
    uniqueTasks.forEach((task, index) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due Date: ${task.dueDate}</p>
        <button class="view-btn" onclick="viewTask(${index})">View</button>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      `;
      tasksList.appendChild(taskElement);
    });
  }
  

function showAddTaskModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const saveBtn = document.getElementById('save-task-btn');
  saveBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;

    if (title && description && dueDate) {
      tasks.push({ title, description, dueDate });
      renderTasks();
      modal.style.display = 'none';
      document.getElementById('add-task-form').reset(); // Reset the form
    } else {
      alert('Please fill in all fields');
    }
  });
}

function viewTask(index) {
  alert(`Title: ${tasks[index].title}\nDescription: ${tasks[index].description}\nDue Date: ${tasks[index].dueDate}`);
}

function editTask(index) {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const dueDateInput = document.getElementById('due-date');

  const task = tasks[index];
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  dueDateInput.value = task.dueDate;

  const saveBtn = document.getElementById('save-task-btn');
  saveBtn.onclick = () => {
    const newTitle = titleInput.value;
    const newDescription = descriptionInput.value;
    const newDueDate = dueDateInput.value;

    if (newTitle && newDescription && newDueDate) {
      tasks[index] = { title: newTitle, description: newDescription, dueDate: newDueDate };
      renderTasks();
      modal.style.display = 'none';
      document.getElementById('add-task-form').reset(); // Reset the form
    } else {
      alert('Please fill in all fields');
    }
  };
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

document.getElementById('add-task-btn').addEventListener('click', showAddTaskModal);

// Sample tasks for testing
tasks.push({ title: 'Task 1', description: 'Description 1', dueDate: '2024-05-20' });
tasks.push({ title: 'Task 2', description: 'Description 2', dueDate: '2024-05-30' });

renderTasks();
