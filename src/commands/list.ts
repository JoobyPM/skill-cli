/**
 * List command - displays all available skills
 */

import { createSpinner, info, muted, title } from '../utils/cli';
import { getAvailableSkills } from '../utils/helpers';

export async function listSkills(): Promise<void> {
  const spinner = createSpinner('Loading skills...');
  spinner.start();

  const result = await getAvailableSkills();

  if (!result.success) {
    spinner.fail(result.error.message);
    process.exitCode = 1;
    return;
  }

  spinner.succeed('Skills loaded successfully');

  const skills = result.data;
  title('📚 Available Skills:');

  if (skills.length === 0) {
    muted('  No skills found. Use `skill add <name>` to create one.');
  } else {
    skills.forEach((skill, index) => {
      info(`  ${index + 1}. ${skill}`);
    });
  }

  muted(`\n  Total: ${skills.length} skill${skills.length === 1 ? '' : 's'}\n`);
}
