import chalk from "chalk";
import inquirer from "inquirer";
import { set, getAll, addField } from '../utils/db.js';

// import { set, getAll } from '../utils/db.js';
// Function to generate a new unique ID
const generateId = () => {
  const allTasks = getAll();
  return allTasks.length > 0 ? Math.max(...allTasks.map(task => task.id)) + 1 : 1;
};

// Add task function
export const runAddTask = (returnToMainMenu) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "taskName",
        message: "What's the task to be added?",
      },
      {
        type: "input",
        name: "status",
        message: "What's the status of the task?",
        default: "pending",
      },
    ])
    .then((answers) => {
      const newId = generateId();
      set(newId, { name: answers.taskName, status: answers.status });
      console.log(chalk.green(`Task added: ${answers.taskName}`));
      console.log(chalk.blue(`You now have ${getAll().length} tasks.`));

      // After adding task, return to the main menu
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred while adding the task."), error);
    });
};

// Function to get all tasks
export const getTasks = () => getAll();

// Function to update a task
export const updateTask = (id, key, value) => {
  addField(id, key, value);
  console.log(chalk.green(`Task ${id} updated: ${key} set to ${value}`));
};

// Function to display all tasks
export const displayTasks = () => {
  const allTasks = getAll();
  if (allTasks.length === 0) {
    console.log(chalk.yellow("No tasks found."));
  } else {
    console.log(chalk.blue("Current tasks:"));
    allTasks.forEach(task => {
      console.log(chalk.green(`ID: ${task.id}`));
      Object.entries(task.task).forEach(([key, value]) => {
        console.log(chalk.cyan(`  ${key}: ${value}`));
      });
      console.log("---");
    });
  }
};