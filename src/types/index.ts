/**
 * Core type definitions for skill-cli
 */

// =============================================================================
// Result Type Pattern
// =============================================================================

/**
 * Discriminated union for operation results.
 * Provides type-safe error handling without exceptions.
 */
export type Result<T, E extends Error = Error> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

/**
 * Creates a successful result
 */
export function ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Creates a failed result
 */
export function err<E extends Error>(error: E): Result<never, E> {
  return { success: false, error };
}

// =============================================================================
// Custom Error Types
// =============================================================================

/**
 * Base error class for skill-cli errors
 */
export class SkillCliError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'SkillCliError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when a skill is not found
 */
export class SkillNotFoundError extends SkillCliError {
  constructor(public readonly skillName: string) {
    super(`Skill '${skillName}' not found`, 'SKILL_NOT_FOUND');
    this.name = 'SkillNotFoundError';
  }
}

/**
 * Error thrown when a skill already exists
 */
export class SkillExistsError extends SkillCliError {
  constructor(public readonly skillName: string) {
    super(`Skill '${skillName}' already exists`, 'SKILL_EXISTS');
    this.name = 'SkillExistsError';
  }
}

/**
 * Error thrown when skill directory operations fail.
 * Uses standard Error.cause for error chaining.
 */
export class SkillDirectoryError extends SkillCliError {
  constructor(
    public readonly skillName: string,
    public readonly operation: 'read' | 'write' | 'delete' | 'create',
    cause?: Error
  ) {
    super(
      `Failed to ${operation} skill directory '${skillName}'${cause ? `: ${cause.message}` : ''}`,
      'SKILL_DIRECTORY_ERROR',
      cause ? { cause } : undefined
    );
    this.name = 'SkillDirectoryError';
  }
}

/**
 * Error thrown when a feature is not implemented
 */
export class NotImplementedError extends SkillCliError {
  constructor(feature: string) {
    super(`${feature} is not yet implemented`, 'NOT_IMPLEMENTED');
    this.name = 'NotImplementedError';
  }
}

/**
 * Error thrown when a skill name is invalid
 */
export class InvalidSkillNameError extends SkillCliError {
  constructor(
    public readonly skillName: string,
    public readonly reason: string
  ) {
    super(`Invalid skill name '${skillName}': ${reason}`, 'INVALID_SKILL_NAME');
    this.name = 'InvalidSkillNameError';
  }
}

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Type guard to check if an error is a NodeJS.ErrnoException.
 * Explicitly excludes SkillCliError instances which also have a code property.
 */
export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && !(error instanceof SkillCliError) && 'code' in error;
}

/**
 * Type guard to check if result is successful
 */
export function isOk<T, E extends Error>(
  result: Result<T, E>
): result is { readonly success: true; readonly data: T } {
  return result.success;
}

/**
 * Type guard to check if result is an error
 */
export function isErr<T, E extends Error>(
  result: Result<T, E>
): result is { readonly success: false; readonly error: E } {
  return !result.success;
}
