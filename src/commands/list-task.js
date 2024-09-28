import { Command } from "commander";
import chalk from "chalk";
import { getTasks } from "./add-task.js";

export const runListTask = (returnToMainMenu) => {
  const program = new Command(); // Create a new instance of Command each time

  program
    .version("1.0.0")
    .description("List of tasks")
    .action(() => {
      // Simulate the action and print something
      console.log(chalk.green(`Hey!`));
        
      // List task saved in memory by add-task.js
        const tasks = getTasks();
        console.log(chalk.blue(`You have ${tasks.length} tasks.`));
        tasks.forEach((task, index) => {
          console.log(chalk.blue(`${index + 1}. ${task}`));
        });

      // Optionally, you can access the name option here

      // After running the action, return to the main menu
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    });

  // Manually parse the arguments
  program.parse([]);
};
