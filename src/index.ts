import { Command } from 'commander';
import { createCommand } from './commands/create';
import { updateCommand } from './commands/update';
import { deleteCommand } from './commands/delete';

const program = new Command();

program
  .name('skill')
  .description('CLI tool for managing AI coding assistant skills')
  .version('1.0.0');

program.addCommand(createCommand);
program.addCommand(updateCommand);
program.addCommand(deleteCommand);

program.parse();
