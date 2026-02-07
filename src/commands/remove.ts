/**
 * Remove command - deletes a skill
 */

import { createSpinner, handleResult } from '../utils/cli';
import { deleteSkill } from '../utils/helpers';

export async function removeSkill(name: string): Promise<void> {
  const spinner = createSpinner(`Removing skill: ${name}...`);
  spinner.start();

  const result = await deleteSkill(name);
  handleResult(result, spinner, `Skill '${name}' removed successfully`);
}
