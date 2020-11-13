let todoItems = [];

$(document).ready(() =>{
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'Home/GetAllTodos',
        success: function(data){
            data.responseText.forEach((item) => {
                addFirstTodo(item.ToDoContent, item.ToDoId, item.IsFinished)
            })
        },
        error: function (response) {
            console.log(response)
        }
    });
    
    function renderTodo(todo) {
        const list = document.querySelector('.js-todo-list');
        const item = document.querySelector(`[data-key='${todo.ToDoId}']`);
        const trItem = document.getElementById('item/' + todo.ToDoId)
        if (todo.deleted) {
            let rowId = 'item/' + todo.ToDoId
            let rowNode = document.getElementById(rowId)
            rowNode.remove()
            item.remove();
            return
        }
        
        const isChecked = todo.IsFinished ? 'done': '';
        const node = document.createElement("li");
        node.setAttribute('class', `todo-item ${isChecked}`);
        node.setAttribute('data-key', todo.ToDoId);
        node.innerHTML = `
                            <input id="${todo.ToDoId}" type="checkbox"/>
                            <label for="${todo.ToDoId}" class="tick js-tick"></label>
                            <span>${todo.ToDoContent}</span>
                            <button class="delete-todo js-delete-todo">
                            <svg><use href="#delete-icon"></use></svg>
                            </button>
                          `;
        
        const anaTBody = document.getElementById('tbodyOfToDoTable')
        const tableRowNode = document.createElement("tr");
        tableRowNode.setAttribute('id', 'item/' + todo.ToDoId)
        const tableTHNode = document.createElement("th");
        tableTHNode.innerHTML = `${todo.ToDoId}`;
        const tableTDNodeForContent =  document.createElement("td");
        tableTDNodeForContent.innerHTML = `${todo.ToDoContent}`;
        const tableTDNodeForFinishTick =  document.createElement("td");
        tableTDNodeForFinishTick.innerHTML = `${todo.IsFinished}`;

        if (item) {
            list.replaceChild(node, item);
        }
        else {
            list.append(node);
            tableRowNode.appendChild(tableTHNode)
            tableRowNode.appendChild(tableTDNodeForContent)
            tableRowNode.appendChild(tableTDNodeForFinishTick)
            anaTBody.appendChild(tableRowNode)
        }
        if(trItem !== null) {
            console.log(anaTBody)
            tableRowNode.appendChild(tableTHNode)
            tableRowNode.appendChild(tableTDNodeForContent)
            tableRowNode.appendChild(tableTDNodeForFinishTick)
            anaTBody.replaceChild(tableRowNode, trItem)
        }
    }

    function addTodo(text) {
        const todo = {
            ToDoContent: text,
            IsFinished: false,
            ToDoId: Date.now(),
        };

        todoItems.push(todo);
        renderTodo(todo);
    }

    function renderFirstTodo(todo) {
        const list = document.querySelector('.js-todo-list');
        const item = document.querySelector(`[data-key='${todo.ToDoId}']`);
        if (todo.deleted) {
            item.remove();
            return
        }

        const isChecked = todo.IsFinished ? 'done': '';
        const node = document.createElement("li");
        node.setAttribute('class', `todo-item ${isChecked}`);
        node.setAttribute('data-key', todo.ToDoId);
        node.innerHTML = `
                            <input id="${todo.ToDoId}" type="checkbox"/>
                            <label for="${todo.ToDoId}" class="tick js-tick"></label>
                            <span>${todo.ToDoContent}</span>
                            <button class="delete-todo js-delete-todo">
                            <svg><use href="#delete-icon"></use></svg>
                            </button>
                          `;

        if (item) {
            list.replaceChild(node, item);
        } else {
            list.append(node);
        }
    }
    
    function addFirstTodo(todoContent, todoId, todoIsFinished) {
        const todo = {
            ToDoContent: todoContent,
            IsFinished: todoIsFinished,
            ToDoId: todoId,
        };

        todoItems.push(todo);
        renderFirstTodo(todo);
    }

    function toggleDone(key) {
        const index = todoItems.findIndex(item => item.ToDoId === Number(key));
        todoItems[index].IsFinished = !todoItems[index].IsFinished;
        renderTodo(todoItems[index]);
    }

    function deleteTodo(key) {
        const index = todoItems.findIndex(item => item.ToDoId === Number(key));
        const todo = {
            deleted: true,
            ...todoItems[index]
        };
        todoItems = todoItems.filter(item => item.ToDoId !== Number(key));
        renderTodo(todo);
    }

    const form = document.querySelector('.js-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const input = document.querySelector('.js-todo-input');

        const text = input.value.trim();
        if (text !== '') {
            addTodo(text);
            input.value = '';
            input.focus();
        }
    });

    const list = document.querySelector('.js-todo-list');
    list.addEventListener('click', event => {
        if (event.target.classList.contains('js-tick')) {
            const itemKey = event.target.parentElement.dataset.key;
            toggleDone(itemKey);
        }

        if (event.target.classList.contains('js-delete-todo')) {
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    });
    
})