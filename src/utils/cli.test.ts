/**
 * Tests for CLI utilities
 */

import { describe, expect, it } from 'bun:test';
import {
  InvalidSkillNameError,
  NotImplementedError,
  SkillCliError,
  SkillExistsError,
  SkillNotFoundError,
} from '../types';
import { createSpinner, getErrorMessage } from './cli';

describe('cli utilities', () => {
  describe('getErrorMessage()', () => {
    it('formats InvalidSkillNameError correctly', () => {
      const error = new InvalidSkillNameError('bad/name', 'contains path separator');
      const message = getErrorMessage(error);
      expect(message).toBe("Invalid skill name 'bad/name': contains path separator");
    });

    it('formats SkillNotFoundError correctly', () => {
      const error = new SkillNotFoundError('my-skill');
      const message = getErrorMessage(error);
      expect(message).toBe("Skill 'my-skill' not found");
    });

    it('formats SkillExistsError correctly', () => {
      const error = new SkillExistsError('my-skill');
      const message = getErrorMessage(error);
      expect(message).toBe("Skill 'my-skill' already exists");
    });

    it('formats NotImplementedError correctly', () => {
      const error = new NotImplementedError('Feature X');
      const message = getErrorMessage(error);
      expect(message).toBe('Feature X is not yet implemented');
    });

    it('formats SkillCliError with code', () => {
      const error = new SkillCliError('Something failed', 'ERR_CODE');
      const message = getErrorMessage(error);
      expect(message).toBe('Something failed (ERR_CODE)');
    });

    it('formats generic errors with just message', () => {
      const error = new Error('Generic error');
      const message = getErrorMessage(error);
      expect(message).toBe('Generic error');
    });
  });

  describe('createSpinner()', () => {
    it('creates spinner with correct interface', () => {
      const spinner = createSpinner('Test message');
      expect(typeof spinner.start).toBe('function');
      expect(typeof spinner.succeed).toBe('function');
      expect(typeof spinner.fail).toBe('function');
      expect(typeof spinner.stop).toBe('function');
    });
  });
});
