/**
 * Tests for type utilities and Result pattern
 */

import { describe, expect, it } from 'bun:test';
import {
  InvalidSkillNameError,
  NotImplementedError,
  SkillCliError,
  SkillDirectoryError,
  SkillExistsError,
  SkillNotFoundError,
  err,
  isErr,
  isNodeError,
  isOk,
  ok,
} from './index';

describe('Result pattern', () => {
  describe('ok()', () => {
    it('creates a successful result with data', () => {
      const result = ok('test-data');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('test-data');
      }
    });

    it('works with complex types', () => {
      const data = { name: 'test', values: [1, 2, 3] };
      const result = ok(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(data);
      }
    });
  });

  describe('err()', () => {
    it('creates a failed result with error', () => {
      const error = new Error('test error');
      const result = err(error);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe(error);
      }
    });

    it('works with custom error types', () => {
      const error = new SkillNotFoundError('my-skill');
      const result = err(error);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.skillName).toBe('my-skill');
      }
    });
  });

  describe('isOk()', () => {
    it('returns true for successful results', () => {
      const result = ok('data');
      expect(isOk(result)).toBe(true);
    });

    it('returns false for failed results', () => {
      const result = err(new Error('fail'));
      expect(isOk(result)).toBe(false);
    });
  });

  describe('isErr()', () => {
    it('returns true for failed results', () => {
      const result = err(new Error('fail'));
      expect(isErr(result)).toBe(true);
    });

    it('returns false for successful results', () => {
      const result = ok('data');
      expect(isErr(result)).toBe(false);
    });
  });
});

describe('Custom error types', () => {
  describe('SkillCliError', () => {
    it('has correct properties', () => {
      const error = new SkillCliError('test message', 'TEST_CODE');
      expect(error.message).toBe('test message');
      expect(error.code).toBe('TEST_CODE');
      expect(error.name).toBe('SkillCliError');
      expect(error instanceof Error).toBe(true);
    });

    it('supports ErrorOptions with cause', () => {
      const cause = new Error('root cause');
      const error = new SkillCliError('wrapped', 'WRAP', { cause });
      expect(error.message).toBe('wrapped');
      expect(error.cause).toBe(cause);
    });
  });

  describe('SkillNotFoundError', () => {
    it('has correct properties', () => {
      const error = new SkillNotFoundError('my-skill');
      expect(error.message).toBe("Skill 'my-skill' not found");
      expect(error.code).toBe('SKILL_NOT_FOUND');
      expect(error.skillName).toBe('my-skill');
      expect(error.name).toBe('SkillNotFoundError');
      expect(error instanceof SkillCliError).toBe(true);
    });
  });

  describe('SkillExistsError', () => {
    it('has correct properties', () => {
      const error = new SkillExistsError('my-skill');
      expect(error.message).toBe("Skill 'my-skill' already exists");
      expect(error.code).toBe('SKILL_EXISTS');
      expect(error.skillName).toBe('my-skill');
      expect(error.name).toBe('SkillExistsError');
    });
  });

  describe('SkillDirectoryError', () => {
    it('has correct properties without cause', () => {
      const error = new SkillDirectoryError('my-skill', 'read');
      expect(error.message).toBe("Failed to read skill directory 'my-skill'");
      expect(error.code).toBe('SKILL_DIRECTORY_ERROR');
      expect(error.skillName).toBe('my-skill');
      expect(error.operation).toBe('read');
    });

    it('includes cause message when provided', () => {
      const cause = new Error('permission denied');
      const error = new SkillDirectoryError('my-skill', 'write', cause);
      expect(error.message).toBe("Failed to write skill directory 'my-skill': permission denied");
      expect(error.cause).toBe(cause);
    });
  });

  describe('NotImplementedError', () => {
    it('has correct properties', () => {
      const error = new NotImplementedError('Feature X');
      expect(error.message).toBe('Feature X is not yet implemented');
      expect(error.code).toBe('NOT_IMPLEMENTED');
      expect(error.name).toBe('NotImplementedError');
    });
  });

  describe('InvalidSkillNameError', () => {
    it('has correct properties', () => {
      const error = new InvalidSkillNameError('bad/name', 'contains path separator');
      expect(error.message).toBe("Invalid skill name 'bad/name': contains path separator");
      expect(error.code).toBe('INVALID_SKILL_NAME');
      expect(error.skillName).toBe('bad/name');
      expect(error.reason).toBe('contains path separator');
      expect(error.name).toBe('InvalidSkillNameError');
      expect(error instanceof SkillCliError).toBe(true);
    });
  });
});

describe('isNodeError()', () => {
  it('returns true for NodeJS errors with code', () => {
    const error = new Error('ENOENT') as NodeJS.ErrnoException;
    error.code = 'ENOENT';
    expect(isNodeError(error)).toBe(true);
  });

  it('returns false for regular errors', () => {
    const error = new Error('regular error');
    expect(isNodeError(error)).toBe(false);
  });

  it('returns false for non-errors', () => {
    expect(isNodeError('string')).toBe(false);
    expect(isNodeError(null)).toBe(false);
    expect(isNodeError(undefined)).toBe(false);
  });

  it('returns false for SkillCliError (has code but is not a Node error)', () => {
    const error = new SkillCliError('test', 'TEST_CODE');
    expect(isNodeError(error)).toBe(false);
  });

  it('returns false for SkillCliError subclasses', () => {
    const error = new SkillNotFoundError('my-skill');
    expect(isNodeError(error)).toBe(false);
  });
});
