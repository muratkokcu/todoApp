const form = document.getElementById('form');
const searchInput = document.getElementById('searchInput');
const todosUl = document.querySelector('.todos');
const allBtn = document.getElementById('allBtn');
const completedBtn = document.getElementById('completedBtn');
const activeBtn = document.getElementById('activeBtn');

getFromLS();

function getFromLS() {
    const getTodos = JSON.parse(localStorage.getItem('todos'));

    if (getTodos) {
        getTodos.forEach((todoItem) => {
            addToDo(todoItem);
        });
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
});

function addToDo(todoItem) {

    let inputValue = searchInput.value;

    if (todoItem) {
        inputValue = todoItem.content;
    }
    const id = new Date().getTime().toString();

    if (inputValue) {

        const newTodo = document.createElement('li');

        // add data-id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        newTodo.setAttributeNode(attr);

        if (todoItem && todoItem.completed == true) {
            newTodo.classList.add('completed');
        }

        // Display actives in UI
        activeBtn.addEventListener('click', () => {

            if (todoItem.completed) {
                newTodo.classList.add('hidden');
            } else {
                newTodo.classList.remove('hidden');
            }
        })

        // Display completed in UI
        completedBtn.addEventListener('click', () => {
            if (todoItem.completed == false) {
                newTodo.classList.add('hidden');
            } else {
                newTodo.classList.remove('hidden');
            }
        })

        newTodo.innerHTML = inputValue;

        // Trigger Complete Event
        newTodo.addEventListener('dblclick', () => {
            newTodo.classList.toggle('completed');
            updateLS();
        });

        // Remove Event
        newTodo.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            newTodo.remove();
            updateLS();
        });

        todosUl.appendChild(newTodo);

        searchInput.value = "";

        updateLS();
    }
}

function updateLS() {
    const todosLi = document.querySelectorAll('li');

    const todosArr = [];

    todosLi.forEach((li) => {
        todosArr.push({
            content: li.innerText,
            completed: li.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todosArr));
}