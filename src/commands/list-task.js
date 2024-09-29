import { Command } from "commander";
import chalk from "chalk";
import { getAll } from "../utils/db.js";

export const runListTask = (returnToMainMenu) => {
  const program = new Command(); // Create a new instance of Command each time

  program
    .version("1.0.0")
    .description("List of tasks")
    .action(() => {
      console.log(chalk.green("Here are your tasks:"));
      
      // Get all tasks from the db
      const tasks = getAll();
      
      if (tasks.length === 0) {
        console.log(chalk.yellow("You have no tasks."));
      } else {
        console.log(chalk.blue(`You have ${tasks.length} tasks:`));
        tasks.forEach((task) => {
          console.log(chalk.cyan(`ID: ${task.id}`));
          Object.entries(task.task).forEach(([key, value]) => {
            console.log(chalk.white(`  ${key}: ${value}`));
          });
          console.log("---");
        });
      }

      // After running the action, return to the main menu
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    });

  // Manually parse the arguments
  program.parse([]);
};