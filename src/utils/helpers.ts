import fs from 'fs/promises';
import path from 'path';
import { homedir } from 'os';

const SKILLS_DIR = path.join(homedir(), '.ai-skills');

export function validateSkillName(name: string): void {
  // Only allow alphanumeric, dashes, and underscores
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  
  if (!name || name.trim() === '') {
    throw new Error('Skill name cannot be empty');
  }
  
  if (name.includes('..') || name.includes('/') || name.includes('\\')) {
    throw new Error('Skill name contains invalid path characters');
  }
  
  if (!validPattern.test(name)) {
    throw new Error('Skill name can only contain alphanumeric characters, dashes, and underscores');
  }
}

export async function ensureSkillsDir(): Promise<void> {
  try {
    await fs.access(SKILLS_DIR);
  } catch {
    await fs.mkdir(SKILLS_DIR, { recursive: true });
  }
}

export async function skillExists(name: string): Promise<boolean> {
  validateSkillName(name);
  const skillPath = path.join(SKILLS_DIR, `${name}.md`);
  try {
    await fs.access(skillPath);
    return true;
  } catch {
    return false;
  }
}

export async function readSkillFile(name: string): Promise<string> {
  validateSkillName(name);
  const skillPath = path.join(SKILLS_DIR, `${name}.md`);
  return await fs.readFile(skillPath, 'utf-8');
}

export async function createSkill(name: string, content: string): Promise<void> {
  validateSkillName(name);
  await ensureSkillsDir();
  const skillPath = path.join(SKILLS_DIR, `${name}.md`);
  await fs.writeFile(skillPath, content, 'utf-8');
}

export async function deleteSkill(name: string): Promise<void> {
  validateSkillName(name);
  const skillPath = path.join(SKILLS_DIR, `${name}.md`);
  await fs.unlink(skillPath);
}

export async function listSkills(): Promise<string[]> {
  await ensureSkillsDir();
  const files = await fs.readdir(SKILLS_DIR);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

export async function getSkillPath(name: string): Promise<string> {
  validateSkillName(name);
  return path.join(SKILLS_DIR, `${name}.md`);
}

export async function updateSkillFile(name: string): Promise<void> {
  throw new Error('updateSkillFile is not implemented yet. This feature will be available in a future release.');
}
