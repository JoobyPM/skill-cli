/**
 * Add command - creates a new skill with template files
 */

import { createSpinner, handleResult, muted } from '../utils/cli';
import { createSkill } from '../utils/helpers';

export async function addSkill(name: string): Promise<void> {
  const spinner = createSpinner(`Creating skill: ${name}...`);
  spinner.start();

  const result = await createSkill(name);
  const created = handleResult(result, spinner, `Skill '${name}' created successfully`);

  if (created === null) {
    return;
  }

  muted(`\n   Location: skills/${name}/SKILL.md\n`);
}
