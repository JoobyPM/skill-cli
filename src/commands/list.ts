import chalk from 'chalk';
import ora from 'ora';
import { getAvailableSkills } from '../utils/helpers.js';

export async function listSkills(): Promise<void> {
  const spinner = ora('Loading skills...').start();
  
  try {
    const skills = await getAvailableSkills();
    spinner.succeed('Skills loaded successfully');
    
    console.log(chalk.bold('\n📚 Available Skills:\n'));
    
    skills.forEach((skill, index) => {
      console.log(chalk.cyan(`  ${index + 1}. ${skill}`));
    });
    
    console.log(chalk.gray(`\n  Total: ${skills.length} skills\n`));
  } catch (error) {
    spinner.fail('Failed to load skills');
    console.error(chalk.red(error));
  }
}
