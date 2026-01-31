#!/usr/bin/env bun
import { Command } from 'commander';
import { listSkills } from './commands/list.js';
import { getSkill } from './commands/get.js';
import { addSkill } from './commands/add.js';
import { updateSkill } from './commands/update.js';
import { removeSkill } from './commands/remove.js';

const program = new Command();

program
  .name('skill')
  .description('CLI tool for managing AI coding assistant skills')
  .version('1.0.0');

program
  .command('list')
  .description('List all available skills')
  .action(listSkills);

program
  .command('get <name>')
  .description('Get/show a specific skill')
  .action(getSkill);

program.command('add <name>').description('Add a new skill').action(addSkill);

program
  .command('update <name>')
  .description('Update an existing skill')
  .action(updateSkill);

program
  .command('remove <name>')
  .description('Remove a skill')
  .action(removeSkill);

program.parse();
