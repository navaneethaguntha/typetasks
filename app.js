import { addTask, advanceTask, deleteTask, filterByStatus, } from "./model.js";
let tasks = [
    { id: "1", title: "Define typed Task model", status: "done" },
    { id: "2", title: "Wire DOM controls in app.ts", status: "in-progress" },
    { id: "3", title: "Deploy TaskFlow live URL", status: "todo" },
];
let activeFilter = "all";
const titleInput = document.getElementById("title");
const statusSelect = document.getElementById("status");
const addBtn = document.getElementById("add");
const chipsContainer = document.getElementById("chips");
const listEl = document.getElementById("list");
const statsEl = document.getElementById("stats");
const FILTER_OPTIONS = [
    "all",
    "todo",
    "in-progress",
    "done",
];
function renderFilters() {
    chipsContainer.innerHTML = "";
    FILTER_OPTIONS.forEach((option) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = option === activeFilter ? "chip active" : "chip";
        btn.textContent = option;
        btn.addEventListener("click", () => {
            activeFilter = option;
            render();
        });
        chipsContainer.appendChild(btn);
    });
}
function renderStats() {
    const todoCount = filterByStatus(tasks, "todo").length;
    const inProgressCount = filterByStatus(tasks, "in-progress").length;
    const doneCount = filterByStatus(tasks, "done").length;
    statsEl.textContent = `${todoCount} todo · ${inProgressCount} in-progress · ${doneCount} done`;
}
function renderList() {
    listEl.innerHTML = "";
    const visibleTasks = filterByStatus(tasks, activeFilter);
    if (visibleTasks.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty-state";
        empty.textContent = "No tasks in this view.";
        listEl.appendChild(empty);
        return;
    }
    visibleTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        const titleSpan = document.createElement("span");
        titleSpan.className =
            task.status === "done" ? "task-title done" : "task-title";
        titleSpan.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = `badge ${task.status}`;
        badge.textContent = task.status;
        const actions = document.createElement("div");
        actions.className = "actions";
        const advanceBtn = document.createElement("button");
        advanceBtn.type = "button";
        advanceBtn.className = "btn-advance";
        advanceBtn.textContent =
            task.status === "done" ? "✓ Done" : "Advance →";
        advanceBtn.disabled = task.status === "done";
        advanceBtn.addEventListener("click", () => {
            tasks = advanceTask(tasks, task.id);
            render();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "✕";
        deleteBtn.setAttribute("aria-label", `Delete ${task.title}`);
        deleteBtn.addEventListener("click", () => {
            tasks = deleteTask(tasks, task.id);
            render();
        });
        actions.appendChild(advanceBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(titleSpan);
        li.appendChild(badge);
        li.appendChild(actions);
        listEl.appendChild(li);
    });
}
function render() {
    renderStats();
    renderFilters();
    renderList();
}
function handleAddTask() {
    const title = titleInput.value.trim();
    if (!title)
        return;
    const selectedStatus = statusSelect.value;
    tasks = addTask(tasks, title, selectedStatus);
    titleInput.value = "";
    render();
}
addBtn.addEventListener("click", handleAddTask);
titleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddTask();
    }
});
render();
