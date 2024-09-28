import chalk from "chalk";
import inquirer from "inquirer";

// Temporary in-memory storage for tasks (can be replaced with db or file storage)
const tasks = [];

// Add task function
export const runAddTask = (returnToMainMenu) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "taskName",
        message: "What's the task to be added?",
      },
    ])
    .then((answers) => {
      // Add the task to in-memory array (you can use your db or file storage here)
      tasks.push(answers.taskName);
      console.log(chalk.green(`Task added: ${answers.taskName}`));
      console.log(chalk.blue(`You now have ${tasks.length} tasks.`));

      // After adding task, return to the main menu
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred while adding the task."), error);
    });
};

export const getTasks = () => tasks; // Function to get all tasks (optional)
