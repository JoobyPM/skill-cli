import chalk from 'chalk';
import ora from 'ora';
import { skillExists, deleteSkill } from '../utils/helpers.js';

export async function removeSkill(name: string): Promise<void> {
  const spinner = ora(`Removing skill: ${name}...`).start();

  try {
    if (!(await skillExists(name))) {
      spinner.fail(`Skill '${name}' not found`);
      return;
    }

    await deleteSkill(name);
    spinner.succeed(`Skill '${name}' removed successfully`);

    console.log(chalk.yellow(`\n🗑️  Skill '${name}' has been removed\n`));
  } catch (error) {
    spinner.fail(`Failed to remove skill: ${name}`);
    console.error(chalk.red(error));
  }
}
