<<<<<<< HEAD
 // 1. TaskStatus Literal Union
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task Interface
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// 3. addTask
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: nextId++,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

// 4. completeTask
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// 5. filterByStatus
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// 6. Originality Extension 1: deleteTask
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// 7. Originality Extension 2: advanceTask
function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => {
    if (t.id !== id) return t;
    if (t.status === "todo") return { ...t, status: "in-progress" };
    if (t.status === "in-progress") return { ...t, status: "done" };
    return t;
  });
} 
=======

// 1. Define allowed task statuses
type TaskStatus = "todo" | "in-progress" | "done";


// 2. Define the Task interface
interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}


// 3. Generate unique task IDs
let nextId = 1;


// 4. Add a new task
function addTask(tasks: Task[], title: string): Task[] {

    const maxId = tasks.reduce(
        (max, task) => Math.max(max, task.id),
        0
    );

    nextId = Math.max(nextId, maxId + 1);

    const newTask: Task = {
        id: nextId++,
        title: title,
        status: "todo"
    };

    return [...tasks, newTask];
}


// 5. Complete a task using its ID
function completeTask(tasks: Task[], id: number): Task[] {

    return tasks.map(task =>
        task.id === id
            ? { ...task, status: "done" }
            : task
    );
}


// 6. Filter tasks according to status
function filterByStatus(
    tasks: Task[],
    status: TaskStatus
): Task[] {

    return tasks.filter(task => task.status === status);
}


// 7. Extra operation: Advance task status
function advanceTask(tasks: Task[], id: number): Task[] {

    return tasks.map(task => {

        if (task.id !== id) {
            return task;
        }

        if (task.status === "todo") {
            return { ...task, status: "in-progress" };
        }

        if (task.status === "in-progress") {
            return { ...task, status: "done" };
        }

        return task;
    });
}
>>>>>>> fdaf21c (Complete TypeTasks Part 1 model)
