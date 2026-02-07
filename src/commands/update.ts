/**
 * Update command - updates an existing skill
 */

import { NotImplementedError } from '../types';
import { createSpinner, warning } from '../utils/cli';
import { updateSkillFile } from '../utils/helpers';

export async function updateSkill(name: string): Promise<void> {
  const spinner = createSpinner(`Updating skill: ${name}...`);
  spinner.start();

  const result = await updateSkillFile(name);

  if (result.success) {
    spinner.succeed(`Skill '${name}' updated successfully`);
    return;
  }

  // Handle NotImplementedError specially - it's expected
  if (result.error instanceof NotImplementedError) {
    spinner.stop();
    warning(`Update functionality is not yet implemented for skill '${name}'`);
    process.exitCode = 1;
    return;
  }

  // Other errors
  spinner.fail(result.error.message);
  process.exitCode = 1;
}
