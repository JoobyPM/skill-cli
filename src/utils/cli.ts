/**
 * CLI utilities for consistent command handling
 */

import chalk from 'chalk';
import {
  InvalidSkillNameError,
  NotImplementedError,
  type Result,
  SkillCliError,
  SkillExistsError,
  SkillNotFoundError,
} from '../types';

// =============================================================================
// Output Formatting
// =============================================================================

/**
 * Format success message
 */
export function success(message: string): void {
  console.log(chalk.green(`\n✅ ${message}\n`));
}

/**
 * Format warning message
 */
export function warning(message: string): void {
  console.log(chalk.yellow(`\n⚠️  ${message}\n`));
}

/**
 * Format error message
 */
export function error(message: string): void {
  console.error(chalk.red(`\n❌ ${message}\n`));
}

/**
 * Format info message
 */
export function info(message: string): void {
  console.log(chalk.cyan(message));
}

/**
 * Format muted/secondary message
 */
export function muted(message: string): void {
  console.log(chalk.gray(message));
}

/**
 * Format a title/header
 */
export function title(message: string): void {
  console.log(chalk.bold(`\n${message}\n`));
}

// =============================================================================
// Spinner Utilities
// =============================================================================

/**
 * Simple spinner state for CLI feedback
 */
interface SpinnerState {
  interval: ReturnType<typeof setInterval> | null;
  message: string;
}

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/**
 * Check if stdout supports TTY operations
 */
function isTTY(): boolean {
  return Boolean(process.stdout.isTTY);
}

/**
 * Safely clear line if TTY is available
 */
function clearLine(): void {
  if (isTTY() && typeof process.stdout.clearLine === 'function') {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }
}

/**
 * Create a simple spinner without external dependencies.
 * Each spinner instance maintains its own frame index.
 */
export function createSpinner(message: string): {
  start: () => void;
  succeed: (msg?: string) => void;
  fail: (msg?: string) => void;
  stop: () => void;
} {
  const state: SpinnerState = { interval: null, message };
  const tty = isTTY();
  let frameIndex = 0;

  return {
    start(): void {
      if (tty) {
        process.stdout.write(`${spinnerFrames[frameIndex]} ${state.message}`);
        state.interval = setInterval(() => {
          frameIndex = (frameIndex + 1) % spinnerFrames.length;
          clearLine();
          process.stdout.write(`${spinnerFrames[frameIndex]} ${state.message}`);
        }, 80);
      }
    },

    succeed(msg?: string): void {
      if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
      }
      clearLine();
      console.log(chalk.green(`✔ ${msg ?? state.message}`));
    },

    fail(msg?: string): void {
      if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
      }
      clearLine();
      console.log(chalk.red(`✖ ${msg ?? state.message}`));
    },

    stop(): void {
      if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
      }
      clearLine();
    },
  };
}

// =============================================================================
// Error Handling
// =============================================================================

/**
 * Get user-friendly error message from error type
 */
export function getErrorMessage(err: Error): string {
  if (err instanceof InvalidSkillNameError) {
    return `Invalid skill name '${err.skillName}': ${err.reason}`;
  }
  if (err instanceof SkillNotFoundError) {
    return `Skill '${err.skillName}' not found`;
  }
  if (err instanceof SkillExistsError) {
    return `Skill '${err.skillName}' already exists`;
  }
  if (err instanceof NotImplementedError) {
    return err.message;
  }
  if (err instanceof SkillCliError) {
    return `${err.message} (${err.code})`;
  }
  return err.message;
}

/**
 * Handle a Result type with spinner feedback.
 * Sets process.exitCode = 1 on failure.
 */
export function handleResult<T, E extends Error>(
  result: Result<T, E>,
  spinner: ReturnType<typeof createSpinner>,
  successMessage: string
): T | null {
  if (result.success) {
    spinner.succeed(successMessage);
    return result.data;
  }
  spinner.fail(getErrorMessage(result.error));
  process.exitCode = 1;
  return null;
}
