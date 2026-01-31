import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { updateSkillFile, skillExists } from '../utils/helpers';

export const updateCommand = new Command('update')
  .description('Update an existing skill file')
  .argument('<name>', 'Name of the skill')
  .action(async (name: string) => {
    const spinner = ora('Updating skill...').start();
    
    try {
      if (!(await skillExists(name))) {
        spinner.fail(chalk.red(`Skill '${name}' does not exist`));
        process.exit(1);
      }

      await updateSkillFile(name);
      spinner.succeed(chalk.green(`Skill '${name}' updated successfully`));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to update skill: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });
