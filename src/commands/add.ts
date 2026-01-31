import chalk from 'chalk';
import ora from 'ora';
import { createSkill, skillExists } from '../utils/helpers.js';

export async function addSkill(name: string): Promise<void> {
  const spinner = ora(`Creating skill: ${name}...`).start();

  try {
    if (await skillExists(name)) {
      spinner.fail(`Skill '${name}' already exists`);
      return;
    }

    await createSkill(name);
    spinner.succeed(`Skill '${name}' created successfully`);

    console.log(chalk.green(`\n✅ Skill '${name}' has been added`));
    console.log(chalk.gray(`   Location: skills/${name}/SKILL.md\n`));
  } catch (error) {
    spinner.fail(`Failed to create skill: ${name}`);
    console.error(chalk.red(error));
  }
}
