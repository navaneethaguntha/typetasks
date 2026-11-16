import {
  Task,
  TaskStatus,
  addTask,
  advanceTask,
  deleteTask,
  filterByStatus,
} from "./model.js";

let tasks: Task[] = [];
let currentFilter: "all" | TaskStatus = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const chipsEl = document.getElementById("chips") as HTMLDivElement;
const listEl = document.getElementById("list") as HTMLUListElement;

addBtn.onclick = () => {
  const title = titleInput.value.trim();
  if (!title) return;

  tasks = addTask(tasks, title);

  if (statusSelect) {
    const chosenStatus = statusSelect.value as TaskStatus;
    const lastTask = tasks[tasks.length - 1];
    if (chosenStatus !== "todo" && lastTask) {
      tasks = tasks.map((t) =>
        t.id === lastTask.id ? { ...t, status: chosenStatus } : t
      );
    }
  }

  titleInput.value = "";
  render();
};

function renderChips(): void {
  const filters: ("all" | TaskStatus)[] = ["all", "todo", "in-progress", "done"];
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

function render(): void {
  renderChips();

  const visible =
    currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);

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