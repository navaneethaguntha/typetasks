export function addTask(tasks, title, status = "todo") {
    const cleanTitle = title.trim();
    if (!cleanTitle)
        return tasks;
    const newTask = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
        title: cleanTitle,
        status,
    };
    return [...tasks, newTask];
}
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id)
            return task;
        const nextStatus = task.status === "todo" ? "in-progress" : "done";
        return { ...task, status: nextStatus };
    });
}
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
export function filterByStatus(tasks, status) {
    if (status === "all")
        return tasks;
    return tasks.filter((task) => task.status === status);
}
