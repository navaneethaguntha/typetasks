export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export function addTask(
  tasks: Task[],
  title: string,
  status: TaskStatus = "todo"
): Task[] {
  const cleanTitle = title.trim();
  if (!cleanTitle) return tasks;

  const newTask: Task = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    title: cleanTitle,
    status,
  };

  return [...tasks, newTask];
}

export function advanceTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task): Task => {
    if (task.id !== id) return task;
    const nextStatus: TaskStatus =
      task.status === "todo" ? "in-progress" : "done";
    return { ...task, status: nextStatus };
  });
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function filterByStatus(
  tasks: Task[],
  status: "all" | TaskStatus
): Task[] {
  if (status === "all") return tasks;
  return tasks.filter((task) => task.status === status);
}