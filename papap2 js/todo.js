const form = document.querySelector('.js-todoForm'),
    todoInput = form.querySelector('input'),
    todoList = document.querySelector('.js-todoList');

    const TODOS_LOCALSTORAGE = 'todos';
    
    let todos = [];
    
    function deleteTodo(event) {
        const btn = event.target;
        const li = btn.parentNode;
        todoList.removeChild(li);
        const clearTodos = todos.filter(todo => {
            console.log(todo.id, li.id);
            return todo.id !== Number(li.id);
        });
        todos = clearTodos;
        setTodos();
    }
    
    
    function setTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }


    function showTodos(value) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    
    var done = document.createElement("input");
    done.setAttribute("type", "checkbox");
    
    const newId = todos.length + 1;
    delBtn.innerText = 'X';
    delBtn.addEventListener('click', deleteTodo);
    span.innerText = value;
    li.appendChild(span);
    li.id = newId;
    // appendChild 태그는 부모엘리먼트의 자식 엘리먼트로 지정
    li.appendChild(delBtn);
    li.appendChild(done);
    todoList.appendChild(li);
    const todoOBJ = {
        text: value,
        id: newId
    };
    todos.push(todoOBJ);
    setTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    showTodos(currentValue);
    todoInput.value = '';
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LOCALSTORAGE);
    if (loadedTodos !== null) {
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(todo => showTodos(todo.text));
    } 
}

function init() {
    loadTodos();
    form.addEventListener('submit', handleSubmit);
    var t = document.getElementById('add');
    t.addEventListener('click', handleSubmit);
}

init();