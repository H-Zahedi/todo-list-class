class Todo {
    constructor(title) {
        this.title = title;
        this.isComplete = false;
        this.id = Date.now() + Math.random();
    }
}

class TodoList {
    constructor(todosContainer) {
        this.todosContainer = todosContainer;

        this.todos = JSON.parse(
            localStorage.getItem('todos')
        ) || [];

        this.todoInput = document.querySelector('#username');
        this.todoForm = document.querySelector('#todoForm');
        this.clearBtn = document.querySelector('#clearButton');

        this.render();
    }

    render() {
        this.addTodosToDom();
        this.saveTodosIntoLocalStorage();

        this.todoForm.addEventListener('submit', (event) => {
            event.preventDefault();

            this.addNewTodo(this.todoInput.value);
        });

        this.clearBtn.addEventListener('click', () => {
            this.clearTodos();
        });
    }

    addTodosToDom() {
        this.todosContainer.innerHTML = '';

        this.todos.forEach((todo) => {
            const li = document.createElement('li');

            const title = document.createElement('span');
            title.textContent = todo.title;

            if (todo.isComplete) {
                title.classList.add('completed');
            }

            title.addEventListener('click', () => {
                todo.isComplete = !todo.isComplete;
                this.refresh();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'حذف';
            deleteBtn.className = 'delete-btn';
            deleteBtn.type = 'button';

            deleteBtn.addEventListener('click', () => {
                this.todos = this.todos.filter(
                    (item) => item.id !== todo.id
                );

                this.refresh();
            });

            li.append(title, deleteBtn);
            this.todosContainer.appendChild(li);
        });
    }

    addNewTodo(newTodoTitle) {
        newTodoTitle = newTodoTitle.trim();

        if (newTodoTitle === '') {
            this.todoInput.focus();
            return;
        }

        const todo = new Todo(newTodoTitle);

        this.todos.push(todo);

        this.todoInput.value = '';

        this.refresh();

        this.todoInput.focus();
    }

    clearTodos() {
        this.todos = [];
        this.refresh();
    }

    saveTodosIntoLocalStorage() {
        localStorage.setItem(
            'todos',
            JSON.stringify(this.todos)
        );
    }

    refresh() {
        this.addTodosToDom();
        this.saveTodosIntoLocalStorage();
    }
}

new TodoList(document.querySelector('#todoList'));