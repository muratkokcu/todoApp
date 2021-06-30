const form = document.getElementById('form');
const searchInput = document.getElementById('searchInput');
const todosUl = document.querySelector('.todos');
const allBtn = document.getElementById('allBtn');
const completedBtn = document.getElementById('completedBtn');
const activeBtn = document.getElementById('activeBtn');


const getTodos = JSON.parse(localStorage.getItem('todos'));

if (getTodos) {
    getTodos.forEach((todoItem) => {
        addToDo(todoItem);
    });
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
    const id = new Date().getTime().toString(); // cheating with numbers

    if (inputValue) {

        const newTodo = document.createElement('li');

        if (todoItem && todoItem.completed == true) {
            newTodo.classList.add('completed');
        }

        // Show active tasks in UI
        activeBtn.addEventListener('click', () => {
            getTodos.forEach(() => {
                if (newTodo.classList.contains('completed')) {
                    newTodo.classList.add('hidden')
                } else if (!newTodo.classList.contains('completed')) {
                    newTodo.classList.remove('hidden');
                }
            });
        })

        // Show completed tasks in UI
        completedBtn.addEventListener('click', () => {
            getTodos.forEach(() => {
                if (newTodo.classList.contains('completed')) {
                    newTodo.classList.remove('hidden')
                } else if (!newTodo.classList.contains('completed')) {
                    newTodo.classList.add('hidden');
                }
            });
        })

        // Show all tasks in UI
        allBtn.addEventListener('click', () => {
            newTodo.classList.remove('hidden');
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