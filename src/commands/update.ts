import chalk from 'chalk';
import ora from 'ora';
import { skillExists, updateSkillFile } from '../utils/helpers.js';

export async function updateSkill(name: string): Promise<void> {
  const spinner = ora(`Updating skill: ${name}...`).start();

  try {
    if (!(await skillExists(name))) {
      spinner.fail(`Skill '${name}' not found`);
      return;
    }

    await updateSkillFile(name);
    spinner.succeed(`Skill '${name}' updated successfully`);

    console.log(chalk.green(`\n✅ Skill '${name}' has been updated\n`));
  } catch (error) {
    spinner.fail(`Failed to update skill: ${name}`);
    console.error(chalk.red(error));
  }
}
