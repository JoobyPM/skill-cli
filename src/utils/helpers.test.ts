/**
 * Tests for skill helpers
 */

import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import {
  InvalidSkillNameError,
  NotImplementedError,
  SkillExistsError,
  SkillNotFoundError,
} from '../types';
import {
  createSkill,
  deleteSkill,
  getAvailableSkills,
  getSkillPath,
  getVersion,
  readSkillFile,
  skillExists,
  updateSkillFile,
  validateSkillName,
} from './helpers';

const TEST_SKILL_NAME = 'test-skill-fixture';

describe('helpers', () => {
  // Cleanup before and after tests
  beforeAll(async () => {
    // Ensure test skill doesn't exist
    if (await skillExists(TEST_SKILL_NAME)) {
      await deleteSkill(TEST_SKILL_NAME);
    }
  });

  afterAll(async () => {
    // Cleanup test skill
    if (await skillExists(TEST_SKILL_NAME)) {
      await deleteSkill(TEST_SKILL_NAME);
    }
  });

  describe('validateSkillName()', () => {
    it('accepts valid skill names', () => {
      expect(validateSkillName('my-skill').success).toBe(true);
      expect(validateSkillName('skill123').success).toBe(true);
      expect(validateSkillName('a').success).toBe(true);
      expect(validateSkillName('my_skill').success).toBe(true);
      expect(validateSkillName('abc-def-123').success).toBe(true);
    });

    it('rejects empty names', () => {
      const result = validateSkillName('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(InvalidSkillNameError);
      }
    });

    it('rejects names with path traversal characters', () => {
      expect(validateSkillName('../etc').success).toBe(false);
      expect(validateSkillName('foo/bar').success).toBe(false);
      expect(validateSkillName('foo\\bar').success).toBe(false);
    });

    it('rejects names with invalid characters', () => {
      expect(validateSkillName('My-Skill').success).toBe(false);
      expect(validateSkillName('skill@home').success).toBe(false);
      expect(validateSkillName('.hidden').success).toBe(false);
      expect(validateSkillName('has space').success).toBe(false);
    });

    it('rejects names starting with non-letter', () => {
      expect(validateSkillName('123skill').success).toBe(false);
      expect(validateSkillName('-leading').success).toBe(false);
      expect(validateSkillName('_underscore').success).toBe(false);
    });

    it('rejects names exceeding max length', () => {
      const longName = `a${'b'.repeat(64)}`;
      expect(validateSkillName(longName).success).toBe(false);
    });

    it('accepts names at max length', () => {
      const maxName = `a${'b'.repeat(63)}`;
      expect(validateSkillName(maxName).success).toBe(true);
    });
  });

  describe('getVersion()', () => {
    it('returns a valid semver version string', () => {
      const version = getVersion();
      expect(version).toMatch(/^\d+\.\d+\.\d+/);
    });
  });

  describe('getSkillPath()', () => {
    it('returns correct path for skill', () => {
      const path = getSkillPath('my-skill');
      expect(path).toContain('skills');
      expect(path).toContain('my-skill');
    });

    it('throws for invalid skill name', () => {
      expect(() => getSkillPath('../malicious')).toThrow(InvalidSkillNameError);
    });
  });

  describe('getAvailableSkills()', () => {
    it('returns a Result with array of skills', async () => {
      const result = await getAvailableSkills();
      expect(result.success).toBe(true);
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
      }
    });
  });

  describe('skillExists()', () => {
    it('returns false for non-existent skill', async () => {
      const exists = await skillExists('non-existent-skill-xyz');
      expect(exists).toBe(false);
    });

    it('returns false for invalid skill name', async () => {
      const exists = await skillExists('../malicious');
      expect(exists).toBe(false);
    });
  });

  describe('readSkillFile()', () => {
    it('returns error for non-existent skill', async () => {
      const result = await readSkillFile('non-existent-skill-xyz');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(SkillNotFoundError);
      }
    });

    it('returns error for invalid skill name', async () => {
      const result = await readSkillFile('../etc/passwd');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(InvalidSkillNameError);
      }
    });
  });

  describe('createSkill()', () => {
    it('creates a new skill successfully', async () => {
      const result = await createSkill(TEST_SKILL_NAME);
      expect(result.success).toBe(true);

      // Verify skill exists
      const exists = await skillExists(TEST_SKILL_NAME);
      expect(exists).toBe(true);
    });

    it('returns error when skill already exists', async () => {
      // Ensure skill exists
      if (!(await skillExists(TEST_SKILL_NAME))) {
        await createSkill(TEST_SKILL_NAME);
      }

      const result = await createSkill(TEST_SKILL_NAME);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(SkillExistsError);
      }
    });

    it('returns error for invalid skill name', async () => {
      const result = await createSkill('../malicious');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(InvalidSkillNameError);
      }
    });
  });

  describe('deleteSkill()', () => {
    it('deletes an existing skill', async () => {
      // Create if doesn't exist
      if (!(await skillExists(TEST_SKILL_NAME))) {
        await createSkill(TEST_SKILL_NAME);
      }

      const result = await deleteSkill(TEST_SKILL_NAME);
      expect(result.success).toBe(true);

      // Verify skill no longer exists
      const exists = await skillExists(TEST_SKILL_NAME);
      expect(exists).toBe(false);
    });

    it('returns error for non-existent skill', async () => {
      const result = await deleteSkill('non-existent-skill-xyz');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(SkillNotFoundError);
      }
    });

    it('returns error for invalid skill name', async () => {
      const result = await deleteSkill('../../dangerous');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(InvalidSkillNameError);
      }
    });
  });

  describe('updateSkillFile()', () => {
    it('returns NotImplementedError for existing skill', async () => {
      // Ensure skill exists
      if (!(await skillExists(TEST_SKILL_NAME))) {
        await createSkill(TEST_SKILL_NAME);
      }

      const result = await updateSkillFile(TEST_SKILL_NAME);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(NotImplementedError);
      }
    });

    it('returns SkillNotFoundError for non-existent skill', async () => {
      const result = await updateSkillFile('non-existent-skill-xyz');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(SkillNotFoundError);
      }
    });

    it('returns error for invalid skill name', async () => {
      const result = await updateSkillFile('../malicious');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(InvalidSkillNameError);
      }
    });
  });

  describe('full workflow', () => {
    const workflowSkill = 'test-workflow-skill';

    afterAll(async () => {
      if (await skillExists(workflowSkill)) {
        await deleteSkill(workflowSkill);
      }
    });

    it('create -> read -> delete workflow works', async () => {
      // Create
      const createResult = await createSkill(workflowSkill);
      expect(createResult.success).toBe(true);

      // Read
      const readResult = await readSkillFile(workflowSkill);
      expect(readResult.success).toBe(true);
      if (readResult.success) {
        expect(readResult.data).toContain(`# ${workflowSkill}`);
        expect(readResult.data).toContain('## Description');
      }

      // Delete
      const deleteResult = await deleteSkill(workflowSkill);
      expect(deleteResult.success).toBe(true);

      // Verify deleted
      const exists = await skillExists(workflowSkill);
      expect(exists).toBe(false);
    });
  });
});
