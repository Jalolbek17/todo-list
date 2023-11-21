const taskName = document.getElementById("task-name");
const resetTask = document.querySelector(".reset-task");
const taskList = document.querySelector(".task-list");
const form = document.querySelector(".add-task");

var i;

function addTask(taskValue, done) {
    let newTask = document.createElement("li");
    newTask.setAttribute("class", "task");
    newTask.classList.add(done);
    newTask.setAttribute("id", "task" + i++)
    newTask.setAttribute("onclick", "taskDone(this)")
    newTask.textContent = taskValue;
    taskList.appendChild(newTask);
}

if (localStorage.length > 1) {
    i = localStorage.getItem("i");
    for(let j = 1; j < localStorage.length; j++) {
        addTask(localStorage.getItem("task" + j), localStorage.getItem("task" + j + "done"));
    }
} else {
    i = 1;
    localStorage.setItem("i", i);
}

form.addEventListener("submit", (f) => {
    f.preventDefault();
    if (taskName.value) {
        addTask(taskName.value, "not-done");
        taskName.value = "";
        let newTask = document.getElementById("task" + (i-1));
        localStorage.setItem(newTask.id, newTask.textContent);
        localStorage.setItem(newTask.id + "done", "not-done")
    }
});

resetTask.addEventListener("click", (e) => {
    taskList.querySelectorAll(".task").forEach(t => t.remove());
    localStorage.clear();
    i = 1;
    localStorage.setItem("i", i);
});

function taskDone(element) {
    element.classList.toggle("done");
    if (element.classList.contains("done")) {
        localStorage.setItem(element.id + "done", "done")
    } else {
        localStorage.removeItem(element.id + "done");
    }
}