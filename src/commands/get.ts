import chalk from 'chalk';
import ora from 'ora';
import { readSkillFile, skillExists } from '../utils/helpers.js';

export async function getSkill(name: string): Promise<void> {
  const spinner = ora(`Loading skill: ${name}...`).start();
  
  try {
    if (!await skillExists(name)) {
      spinner.fail(`Skill '${name}' not found`);
      return;
    }
    
    const content = await readSkillFile(name);
    spinner.succeed(`Skill '${name}' loaded`);
    
    console.log(chalk.bold(`\n📖 Skill: ${name}\n`));
    console.log(content);
  } catch (error) {
    spinner.fail(`Failed to load skill: ${name}`);
    console.error(chalk.red(error));
  }
}
