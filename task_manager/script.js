const
    addFormBtn = document.querySelector("#show-add-form-btn"),
    inputTask = document.querySelector("#input-task"),
    tasklist = document.querySelector(".task-list"),
    addForm = document.querySelector(".add-task"),
    filters = document.querySelectorAll(".filters span"),
    clearAllBtn = document.querySelector('#clear-btn');

var isEdit = false;
var editId = 0;

// Display Task
const showTasks = (filter = "all") => {
    const allTask = JSON.parse(localStorage.getItem("tasks"));
    let html = "";

    if (allTask !== null) {
        allTask.forEach((task) => {
            if (filter == task.status || filter == "all") {
                let completed = (task.status == "completed") ? "checked" : "";
                html += `
                <div class="task">
                    <label for="${task.id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${task.id}" ${completed}>
                        <p class="task-name ${completed}">${task.taskTitle}</p>
                    </label>
                    <button class="edit" onclick="editTask(${task.id},'${task.taskTitle}')">
                        <span class="material-symbols-outlined icon">edit</span>
                    </button>
                    <button class="delete" onclick="deleteTask(${task.id})">
                        <span class="material-symbols-outlined icon">delete</span>
                    </button>
                </div>`;
            }
        });
    }
    tasklist.innerHTML = html || `<div class="empty">No task to show</div>`;

    let checkTask = tasklist.querySelectorAll(".task");
    !checkTask.length ? clearAllBtn.classList.remove("active") : clearAllBtn.classList.add("active");
};

// Adding Task
const addTask = (e) => {
    if (e.key != "Enter") return;

    let taskTitle = htmlEntities(inputTask.value.trim()),
        parent = inputTask.parentElement;

    if (taskTitle === "") {
        parent.classList.add("error");
        return;
    } else
        parent.classList.remove("error");

    const allTask = JSON.parse(localStorage.getItem("tasks"));
    let updatedTask;

    if (isEdit) {
        for (let i = 0; i < allTask.length; i++) {
            if (allTask[i].id == editId) {
                allTask[i].taskTitle = taskTitle;
                break;
            }
        }
        isEdit = false;
        updatedTask = allTask;
    } else {
        let id = allTask === null ? 1 : allTask.length + 1;

        let newtask = {
            id,
            taskTitle,
            status: 'pending'
        };
        updatedTask = (allTask === null) ? [newtask] : [...allTask, newtask];
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTask));

    inputTask.value = "";
    showTasks();
};

const updateStatus = (selectedTask) => {
    const allTask = JSON.parse(localStorage.getItem("tasks"));

    let task = selectedTask.parentElement.querySelector('.task-name');

    if (selectedTask.checked) {
        task.classList.add("checked");
        allTask.forEach((task) => {
            if (selectedTask.id == task.id)
                task.status = 'completed';
        });
    } else {
        task.classList.remove("checked");
        allTask.forEach((task) => {
            if (selectedTask.id == task.id)
                task.status = 'pending';
        });
    }
    localStorage.setItem("tasks", JSON.stringify(allTask));
}

// Editing Task
const editTask = (id, taskTitle) => {
    inputTask.value = taskTitle;
    isEdit = true;
    editId = id;
    addForm.classList.add("show");
    addFormBtn.classList.add("rotate");
};

// Deleting Task
const deleteTask = (id) => {
    let allTask = JSON.parse(localStorage.getItem("tasks"));

    if (allTask === null) {
        showTasks();
        return;
    }

    let result = allTask.filter((task) => {
        if (task.id !== id) return task;
    });

    if (result.length == 0) result = null;

    localStorage.setItem("tasks", JSON.stringify(result));
    showTasks();
};

clearAllBtn.addEventListener("click", () => {
    let allTask = JSON.parse(localStorage.getItem("tasks"));
    allTask = null;
    localStorage.setItem("tasks", JSON.stringify(allTask));
    showTasks();
});

const htmlEntities = (str) => {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
};

addFormBtn.addEventListener("click", () => {
    if (addForm.style.maxHeight)
        addForm.style.maxHeight = null;
    else
        addForm.style.maxHeight = addForm.scrollHeight + "px";
    addFormBtn.classList.toggle("rotate");
});

inputTask.addEventListener("input", () => {
    let parent = inputTask.parentElement;
    parent.classList.remove("error");
});

filters.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTasks(btn.id);
    });
});

if (localStorage.getItem('isDarkTheme') == "true")
    document.body.classList.add('theme-dark');

document.querySelector('.theme-icon').addEventListener('click', () => {
    if (document.body.classList.contains('theme-dark')) {
        localStorage.setItem("isDarkTheme", "false");
        document.body.classList.remove('theme-dark');
    } else {
        localStorage.setItem("isDarkTheme", "true");
        document.body.classList.add('theme-dark');
    }
    location.reload();
});

showTasks();
inputTask.addEventListener("keyup", addTask);