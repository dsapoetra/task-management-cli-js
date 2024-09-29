// db.js
let data = new Map();

export const get = (id) => {
  const entry = data.get(id);
  return entry ? { id: entry.id, task: Object.fromEntries(entry.task) } : undefined;
};

export const set = (id, taskObj) => {
  if (taskObj === undefined) {
    // If taskObj is undefined, delete the entry
    data.delete(id);
  } else {
    const task = new Map(Object.entries(taskObj));
    data.set(id, { id, task });
  }
};

export const getAll = () => {
  return Array.from(data.values()).map(entry => ({
    id: entry.id,
    task: Object.fromEntries(entry.task)
  }));
};

export const clear = () => {
  data.clear();
};

export const deleteTask = (id) => {
  return data.delete(id);
};

// Helper function to add a field to a task
export const addField = (id, key, value) => {
  const entry = data.get(id);
  if (entry) {
    entry.task.set(key, value);
  }
};

// Helper function to remove a field from a task
export const removeField = (id, key) => {
  const entry = data.get(id);
  if (entry) {
    entry.task.delete(key);
  }
};