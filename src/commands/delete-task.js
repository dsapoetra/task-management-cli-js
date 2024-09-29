import chalk from "chalk";
import inquirer from "inquirer";
import { getAll, deleteTask } from "../utils/db.js";

export const runDeleteTask = (returnToMainMenu) => {
  const tasks = getAll();

  if (tasks.length === 0) {
    console.log(chalk.yellow("There are no tasks to delete."));
    if (returnToMainMenu) {
      returnToMainMenu();
    }
    return;
  }

  // Display existing tasks
  console.log(chalk.blue("Existing tasks:"));
  tasks.forEach(task => {
    console.log(chalk.cyan(`ID: ${task.id} - Name: ${task.task.name}`));
  });

  inquirer
    .prompt([
      {
        type: "number",
        name: "taskId",
        message: "Enter the ID of the task to be deleted:",
        validate: (input) => {
          if (tasks.some(task => task.id === input)) {
            return true;
          }
          return "Please enter a valid task ID.";
        }
      },
      {
        type: "confirm",
        name: "confirmDelete",
        message: "Are you sure you want to delete this task?",
        default: false
      }
    ])
    .then((answers) => {
      if (answers.confirmDelete) {
        const taskToDelete = tasks.find(task => task.id === answers.taskId);
        if (taskToDelete) {
          deleteTask(answers.taskId);
          console.log(chalk.green(`Task deleted: ${taskToDelete.task.name}`));
          console.log(chalk.blue(`You now have ${getAll().length} tasks.`));
        } else {
          console.log(chalk.red("Task not found."));
        }
      } else {
        console.log(chalk.yellow("Task deletion cancelled."));
      }

      if (returnToMainMenu) {
        returnToMainMenu();
      }
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred while deleting the task."), error);
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    });
};