import { addTask, advanceTask, deleteTask, filterByStatus, } from "./model.js";
let tasks = [];
let currentFilter = "all";
const titleInput = document.getElementById("title");
const statusSelect = document.getElementById("status");
const addBtn = document.getElementById("add");
const chipsEl = document.getElementById("chips");
const listEl = document.getElementById("list");
addBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    if (statusSelect) {
        const chosenStatus = statusSelect.value;
        const lastTask = tasks[tasks.length - 1];
        if (chosenStatus !== "todo" && lastTask) {
            tasks = tasks.map((t) => t.id === lastTask.id ? { ...t, status: chosenStatus } : t);
        }
    }
    titleInput.value = "";
    render();
};
function renderChips() {
    const filters = ["all", "todo", "in-progress", "done"];
    chipsEl.innerHTML = "";
    filters.forEach((f) => {
        const btn = document.createElement("button");
        btn.textContent = f;
        btn.className = currentFilter === f ? "chip active" : "chip";
        btn.onclick = () => {
            currentFilter = f;
            render();
        };
        chipsEl.appendChild(btn);
    });
}
function render() {
    renderChips();
    const visible = currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);
    listEl.innerHTML = "";
    visible.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task";
        const span = document.createElement("span");
        span.textContent = `${task.title} [${task.status.toUpperCase()}]`;
        const advBtn = document.createElement("button");
        advBtn.textContent = task.status === "done" ? "✓ done" : "advance →";
        advBtn.disabled = task.status === "done";
        advBtn.onclick = () => {
            tasks = advanceTask(tasks, task.id);
            render();
        };
        const delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        li.append(span, advBtn, delBtn);
        listEl.appendChild(li);
    });
}
render();
