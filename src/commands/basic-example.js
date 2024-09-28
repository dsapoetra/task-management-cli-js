import { Command } from "commander";
import chalk from "chalk";

export const runBasicExample = (returnToMainMenu) => {
  const program = new Command(); // Create a new instance of Command each time

  program
    .version("1.0.0")
    .description("Basic Example")
    .option("-n, --name <type>", "Add your name")
    .action((options) => {
      // Simulate the action and print something
      console.log(chalk.green(`Hey!`));
      
      // Optionally, you can access the name option here
      if (options.name) {
        console.log(chalk.blue(`Hello, ${options.name}!`));
      }

      // After running the action, return to the main menu
      if (returnToMainMenu) {
        returnToMainMenu();
      }
    });

  // Manually parse the arguments
  program.parse([]);
};
