import chalk from "chalk";
import inquirer from "inquirer";
import { getTasks } from "./add-task.js";

// Add task function
export const runDeleteTask = (returnToMainMenu) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "taskName",
        message: "What's the task to be deleted?",
      },
    ])
    .then((answers) => {
        const tasks = getTasks();
      // Add the task to in-memory array (you can use your db or file storage here)
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === answers.taskName) {
          tasks.splice(i, 1);
          console.log(chalk.green(`Task deleted: ${answers.taskName}`));
          console.log(chalk.blue(`You now have ${tasks.length} tasks.`));
          break;
        }
      }
      // After adding task, return to the main menu
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred while adding the task."), error);
    });
};

