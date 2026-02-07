#!/usr/bin/env bun
/**
 * skill-cli - CLI tool for managing AI coding assistant skills
 */

import { Command } from 'commander';
import { addSkill } from './commands/add';
import { getSkill } from './commands/get';
import { listSkills } from './commands/list';
import { removeSkill } from './commands/remove';
import { updateSkill } from './commands/update';
import { error } from './utils/cli';
import { getVersion } from './utils/helpers';

const program = new Command();

program
  .name('skill')
  .description('CLI tool for managing AI coding assistant skills')
  .version(getVersion());

program.command('list').description('List all available skills').action(listSkills);

program.command('get <name>').description('Get/show a specific skill').action(getSkill);

program.command('add <name>').description('Add a new skill').action(addSkill);

program.command('update <name>').description('Update an existing skill').action(updateSkill);

program.command('remove <name>').description('Remove a skill').action(removeSkill);

try {
  await program.parseAsync();
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  error(`Unexpected error: ${message}`);
  process.exit(1);
}
