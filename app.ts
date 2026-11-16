import {
  Task,
  TaskStatus,
  addTask,
  completeTask,
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
    if (chosenStatus !== "todo") {
      const lastTask = tasks[tasks.length - 1];
      tasks = tasks.map((t) =>
        t.id === lastTask.id ? { ...t, status: chosenStatus } : t
      );
    }
  }


  titleInput.value = "";
  render();
};


function advanceTask(id: number): void {
  const target = tasks.find((t) => t.id === id);
  if (!target) return;


  if (target.status === "todo") {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, status: "in-progress" } : t
    );
  } else if (target.status === "in-progress") {
    tasks = completeTask(tasks, id);
  }


  render();
}


function deleteTask(id: number): void {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}


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
    advBtn.onclick = () => advanceTask(task.id);


    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = () => deleteTask(task.id);


    li.append(span, advBtn, delBtn);
    listEl.appendChild(li);
  });
}


render();