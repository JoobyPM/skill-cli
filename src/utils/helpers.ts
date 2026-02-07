/**
 * Skill file system operations using Bun-native APIs
 */

import { existsSync, readFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import {
  InvalidSkillNameError,
  NotImplementedError,
  type Result,
  SkillDirectoryError,
  SkillExistsError,
  SkillNotFoundError,
  err,
  isNodeError,
  ok,
} from '../types';

// =============================================================================
// Project Root & Paths
// =============================================================================

/**
 * Find project root by walking up from startDir looking for package.json
 */
function findProjectRoot(startDir: string): string {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, 'package.json'))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error('Could not find project root (no package.json found)');
    }
    dir = parent;
  }
}

/**
 * Project root directory (where package.json lives)
 */
export const PROJECT_ROOT = findProjectRoot(import.meta.dir);

/**
 * Skills directory path - resolved from project root
 */
const SKILLS_DIR = join(PROJECT_ROOT, 'skills');

/**
 * Skill file name constant (SSOT)
 */
const SKILL_FILE_NAME = 'SKILL.md';
const EXAMPLES_FILE_NAME = 'examples.md';

// =============================================================================
// Validation
// =============================================================================

/**
 * Valid skill name pattern: lowercase letters, numbers, hyphens, underscores.
 * Must start with a lowercase letter.
 */
const SKILL_NAME_PATTERN = /^[a-z][a-z0-9_-]*$/;
const MAX_SKILL_NAME_LENGTH = 64;

/**
 * Validate a skill name for safety and correctness.
 * Prevents path traversal, invalid characters, and overly long names.
 * @param name - Skill name to validate
 * @returns Validated name or error
 */
export function validateSkillName(name: string): Result<string, InvalidSkillNameError> {
  if (!name || name.length === 0) {
    return err(new InvalidSkillNameError(name, 'name cannot be empty'));
  }

  if (name.length > MAX_SKILL_NAME_LENGTH) {
    return err(
      new InvalidSkillNameError(name, `name cannot exceed ${MAX_SKILL_NAME_LENGTH} characters`)
    );
  }

  if (!SKILL_NAME_PATTERN.test(name)) {
    return err(
      new InvalidSkillNameError(
        name,
        'must contain only lowercase letters, numbers, hyphens, and underscores, and start with a letter'
      )
    );
  }

  // Defense in depth: verify resolved path stays inside SKILLS_DIR
  const resolvedSkillsDir = resolve(SKILLS_DIR);
  const resolvedPath = resolve(join(SKILLS_DIR, name));
  const relativePath = relative(resolvedSkillsDir, resolvedPath);
  if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
    return err(new InvalidSkillNameError(name, 'resolves outside skills directory'));
  }

  return ok(name);
}

/**
 * Read the project version from package.json
 */
export function getVersion(): string {
  const pkgPath = join(PROJECT_ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version: string };
  return pkg.version;
}

// =============================================================================
// Read Operations
// =============================================================================

/**
 * Get list of available skill names
 * @returns Array of skill directory names
 */
export async function getAvailableSkills(): Promise<Result<string[], SkillDirectoryError>> {
  try {
    const glob = new Bun.Glob(`*/${SKILL_FILE_NAME}`);
    const skills: string[] = [];

    for await (const path of glob.scan({ cwd: SKILLS_DIR, onlyFiles: true })) {
      const skillName = path.split('/')[0];
      if (skillName) {
        skills.push(skillName);
      }
    }

    return ok(skills.toSorted((a, b) => a.localeCompare(b)));
  } catch (error) {
    return err(
      new SkillDirectoryError(
        'skills',
        'read',
        error instanceof Error ? error : new Error(String(error))
      )
    );
  }
}

/**
 * Check if a skill exists by name.
 * Returns false for invalid names.
 * @param name - Skill name to check
 * @returns true if skill exists, false otherwise
 */
export async function skillExists(name: string): Promise<boolean> {
  if (!validateSkillName(name).success) return false;

  const skillPath = join(SKILLS_DIR, name, SKILL_FILE_NAME);
  const file = Bun.file(skillPath);
  return file.exists();
}

/**
 * Read skill file content
 * @param name - Skill name
 * @returns Skill content or error
 */
export async function readSkillFile(
  name: string
): Promise<Result<string, InvalidSkillNameError | SkillNotFoundError | SkillDirectoryError>> {
  const validation = validateSkillName(name);
  if (!validation.success) return validation;

  const skillPath = join(SKILLS_DIR, name, SKILL_FILE_NAME);
  const file = Bun.file(skillPath);

  const exists = await file.exists();
  if (!exists) {
    return err(new SkillNotFoundError(name));
  }

  try {
    const content = await file.text();
    return ok(content);
  } catch (error) {
    return err(
      new SkillDirectoryError(
        name,
        'read',
        error instanceof Error ? error : new Error(String(error))
      )
    );
  }
}

/**
 * Get the path to a skill directory
 * @param name - Skill name (must be valid)
 * @returns Absolute path to skill directory
 * @throws InvalidSkillNameError if name is invalid
 */
export function getSkillPath(name: string): string {
  const validation = validateSkillName(name);
  if (!validation.success) {
    throw validation.error;
  }
  return join(SKILLS_DIR, name);
}

// =============================================================================
// Write Operations
// =============================================================================

/**
 * Create a new skill with template files
 * @param name - Skill name to create
 * @returns Success or error result
 */
export async function createSkill(
  name: string
): Promise<Result<void, InvalidSkillNameError | SkillExistsError | SkillDirectoryError>> {
  const validation = validateSkillName(name);
  if (!validation.success) return validation;

  // Check if already exists
  if (await skillExists(name)) {
    return err(new SkillExistsError(name));
  }

  const skillDir = join(SKILLS_DIR, name);
  const skillFilePath = join(skillDir, SKILL_FILE_NAME);
  const examplesFilePath = join(skillDir, EXAMPLES_FILE_NAME);

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

  try {
    // Bun.write creates parent directories automatically
    await Bun.write(skillFilePath, skillTemplate);
    await Bun.write(examplesFilePath, examplesTemplate);
    return ok(undefined);
  } catch (error) {
    return err(
      new SkillDirectoryError(
        name,
        'create',
        error instanceof Error ? error : new Error(String(error))
      )
    );
  }
}

/**
 * Update a skill file (not yet implemented)
 * @param name - Skill name to update
 * @returns NotImplementedError - feature not yet available
 */
export async function updateSkillFile(
  name: string
): Promise<Result<void, InvalidSkillNameError | SkillNotFoundError | NotImplementedError>> {
  const validation = validateSkillName(name);
  if (!validation.success) return validation;

  // Verify skill exists first
  if (!(await skillExists(name))) {
    return err(new SkillNotFoundError(name));
  }

  // Feature not implemented yet
  return err(new NotImplementedError(`Update functionality for skill '${name}'`));
}

/**
 * Delete a skill directory and all its contents
 * @param name - Skill name to delete
 * @returns Success or error result
 */
export async function deleteSkill(
  name: string
): Promise<Result<void, InvalidSkillNameError | SkillNotFoundError | SkillDirectoryError>> {
  const validation = validateSkillName(name);
  if (!validation.success) return validation;

  if (!(await skillExists(name))) {
    return err(new SkillNotFoundError(name));
  }

  const skillDir = join(SKILLS_DIR, name);

  try {
    await rm(skillDir, { recursive: true });
    return ok(undefined);
  } catch (error) {
    // Handle specific error codes
    if (isNodeError(error) && error.code === 'ENOENT') {
      return err(new SkillNotFoundError(name));
    }
    return err(
      new SkillDirectoryError(
        name,
        'delete',
        error instanceof Error ? error : new Error(String(error))
      )
    );
  }
}
