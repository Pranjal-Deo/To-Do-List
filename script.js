document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todoInput");
    const addButton = document.getElementById("addButton");
    const incompleteList = document.getElementById("incompleteList");
    const completedList = document.getElementById("completedList");
    const totalTasks = document.getElementById("totalTasks");
    const completeAllButton = document.getElementById("completeAllButton");
    const clearCompletedButton = document.getElementById("clearCompletedButton");

    addButton.addEventListener("click", addTodo);
    todoInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addTodo();
        }
    });

    completeAllButton.addEventListener("click", completeAllTasks);
    clearCompletedButton.addEventListener("click", clearCompletedTasks);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            const listItem = createListItem(todoText);
            incompleteList.appendChild(listItem);
            todoInput.value = "";
            updateTotalTasks();
        }
    }

    function createListItem(text) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                listItem.classList.add("completed");
                completedList.appendChild(listItem);
            } else {
                listItem.classList.remove("completed");
                incompleteList.appendChild(listItem);
            }
            updateTotalTasks();
        });
        const span = document.createElement("span");
        span.textContent = text;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            listItem.remove();
            updateTotalTasks();
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);
        return listItem;
    }

    function completeAllTasks() {
        const allIncompleteItems = incompleteList.querySelectorAll("li");
        allIncompleteItems.forEach(function(item) {
            item.classList.add("completed");
            completedList.appendChild(item);
        });
        updateTotalTasks();
    }

    function clearCompletedTasks() {
        const completedItems = completedList.querySelectorAll("li");
        completedItems.forEach(function(item) {
            item.remove();
        });
        updateTotalTasks();
    }

    function updateTotalTasks() {
        totalTasks.textContent = incompleteList.querySelectorAll("li").length;
    }
});
