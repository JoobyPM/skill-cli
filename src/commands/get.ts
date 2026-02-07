/**
 * Get command - displays a specific skill's content
 */

import { createSpinner, handleResult, title } from '../utils/cli';
import { readSkillFile } from '../utils/helpers';

export async function getSkill(name: string): Promise<void> {
  const spinner = createSpinner(`Loading skill: ${name}...`);
  spinner.start();

  const result = await readSkillFile(name);
  const content = handleResult(result, spinner, `Skill '${name}' loaded`);

  if (content === null) {
    return;
  }

  title(`📖 Skill: ${name}`);
  console.log(content);
}
