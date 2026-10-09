class Todo {
    constructor(title) {
        this.title = title;
        this.isComplete = false;
    }
}

class TodoList {
    constructor(todosContainer) {
        this.todosContainer = todosContainer;
        this.todos = this.loadTodos();

        this.todoInput = document.querySelector('#username');
        this.todoForm = document.querySelector('#todoForm');
        this.addBtn = document.querySelector('#addButton');
        this.clearBtn = document.querySelector('#clearButton');

        this.bindEvents();
        this.render();
    }

    loadTodos() {
        try {
            const savedTodos = JSON.parse(
                localStorage.getItem('todos')
            );

            return Array.isArray(savedTodos) ? savedTodos : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            return [];
        }
    }

    bindEvents() {
        this.todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addNewTodo(this.todoInput.value);
        });

        this.clearBtn.addEventListener('click', () => {
            this.clearTodos();
        });
    }

    render() {
        this.todosContainer.innerHTML = '';

        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');

            const todoTitleElem = document.createElement('label');
            todoTitleElem.textContent = todo.title;

            const completeBtn = document.createElement('button');
            completeBtn.type = 'button';
            completeBtn.textContent = 'Complete';

            if (todo.isComplete) {
                completeBtn.classList.add('todo-completed');
            }

            completeBtn.addEventListener('click', () => {
                this.toggleTodo(index);
            });

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = 'Remove';

            removeBtn.addEventListener('click', () => {
                this.removeTodo(index);
            });

            li.append(todoTitleElem, completeBtn, removeBtn);
            this.todosContainer.appendChild(li);
        });
    }

    addNewTodo(newTodoTitle) {
        const title = newTodoTitle.trim();

        if (!title) {
            this.todoInput.focus();
            return;
        }

        this.todos.push(new Todo(title));

        this.saveTodosIntoLocalStorage();
        this.render();

        this.todoInput.value = '';
        this.todoInput.focus();
    }

    toggleTodo(index) {
        if (index < 0 || index >= this.todos.length) {
            return;
        }

        this.todos[index].isComplete =
            !this.todos[index].isComplete;

        this.saveTodosIntoLocalStorage();
        this.render();
    }

    removeTodo(index) {
        if (index < 0 || index >= this.todos.length) {
            return;
        }

        this.todos.splice(index, 1);

        this.saveTodosIntoLocalStorage();
        this.render();
    }

    clearTodos() {
        if (this.todos.length === 0) {
            return;
        }

        this.todos = [];

        this.saveTodosIntoLocalStorage();
        this.render();
    }

    saveTodosIntoLocalStorage() {
        try {
            localStorage.setItem(
                'todos',
                JSON.stringify(this.todos)
            );
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }
}

const todosContainer = document.querySelector('#todoList');

if (todosContainer) {
    new TodoList(todosContainer);
} else {
    console.error('Todo list element not found.');
}