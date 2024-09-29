#!/usr/bin/env node

import inquirer from "inquirer";
import { runBasicExample } from "../src/commands/basic-example.js";
import { runAddTask } from "../src/commands/add-task.js";
import { runListTask } from "../src/commands/list-task.js";
import { runDeleteTask } from "../src/commands/delete-task.js";
import { runUpdateTask } from "../src/commands/update-task.js";

// Define your examples
const examples = {
  "Basic Example": runBasicExample,
  "Add Task": runAddTask,
  "List Task": runListTask,
  "Delete Task": runDeleteTask,
  "Update Task": runUpdateTask,
};

// Function to handle the prompt loop
const runMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selectedExample",
        message: "Choose an example to run:",
        choices: [...Object.keys(examples), new inquirer.Separator(), "Exit"],
        loop: true,
      },
    ])
    .then((answers) => {
      if (answers.selectedExample === "Exit") {
        console.log("Goodbye!");
        process.exit(0); // Exit the program
      }

      const exampleFunction = examples[answers.selectedExample];
      if (exampleFunction) {
        // Pass runMenu as a callback so the command can return to the main menu
        exampleFunction(runMenu);
      } else {
        console.error("Invalid selection");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Start the menu
runMenu();
