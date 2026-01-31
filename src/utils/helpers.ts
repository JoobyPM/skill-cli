import { readdir, readFile, mkdir, writeFile, rm } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SKILLS_DIR = join(__dirname, '../../skills');

export async function getAvailableSkills(): Promise<string[]> {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

export async function skillExists(name: string): Promise<boolean> {
  const skills = await getAvailableSkills();
  return skills.includes(name);
}

export async function readSkillFile(name: string): Promise<string> {
  const skillPath = join(SKILLS_DIR, name, 'SKILL.md');
  return readFile(skillPath, 'utf-8');
}

export async function createSkill(name: string): Promise<void> {
  const skillDir = join(SKILLS_DIR, name);
  await mkdir(skillDir, { recursive: true });
  
  const skillTemplate = `# ${name}

## Description
[Add skill description here]

## Capabilities
- [Capability 1]
- [Capability 2]

## Usage
\`\`\`
[Add usage example]
\`\`\`

## Examples
See [examples.md](./examples.md) for detailed examples.
`;
  
  const examplesTemplate = `# ${name} - Examples

## Example 1
\`\`\`
[Add example prompt]
\`\`\`

## Example 2
\`\`\`
[Add example prompt]
\`\`\`
`;
  
  await writeFile(join(skillDir, 'SKILL.md'), skillTemplate);
  await writeFile(join(skillDir, 'examples.md'), examplesTemplate);
}

export async function updateSkillFile(name: string): Promise<void> {
  // Placeholder for update logic
  // Could implement interactive editing or fetch updates
  console.log(`Updating skill: ${name}`);
}

export async function deleteSkill(name: string): Promise<void> {
  const skillDir = join(SKILLS_DIR, name);
  await rm(skillDir, { recursive: true });
}
