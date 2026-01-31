import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createSkill, skillExists } from '../utils/helpers';

export const createCommand = new Command('create')
  .description('Create a new skill file')
  .argument('<name>', 'Name of the skill')
  .option('-c, --content <content>', 'Skill content')
  .action(async (name: string, options: { content?: string }) => {
    const spinner = ora('Creating skill...').start();
    
    try {
      if (await skillExists(name)) {
        spinner.fail(chalk.red(`Skill '${name}' already exists`));
        process.exit(1);
      }

      const content = options.content || `# ${name}\n\nSkill content goes here...`;
      await createSkill(name, content);
      
      spinner.succeed(chalk.green(`Skill '${name}' created successfully`));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to create skill: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });
