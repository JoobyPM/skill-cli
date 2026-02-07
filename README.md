# skill-cli

CLI tool for managing AI coding assistant skills for Cursor, Claude, and Codex.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**skill-cli** helps developers manage and organize skills for AI coding assistants. Create, share,
and version-control your AI interaction patterns across Cursor, Claude, and Codex.

### Features

- Simple CLI for skill management
- Create custom skills for your team
- Built with Bun for fast performance
- TypeScript with full type safety
- Result pattern for type-safe error handling
- Comprehensive test coverage

## Installation

```bash
# Clone and install
git clone https://github.com/JoobyPM/skill-cli.git
cd skill-cli
bun install

# Build
bun run build

# Link globally (optional)
bun link
```

## Usage

```bash
# List all skills
skill list

# View a skill
skill get <skill-name>

# Create a new skill
skill add <skill-name>

# Update a skill
skill update <skill-name>

# Remove a skill
skill remove <skill-name>
```

## Project Structure

```
skill-cli/
├── src/
│   ├── commands/      # CLI command implementations
│   ├── types/         # TypeScript types and error classes
│   └── utils/         # Shared utilities
├── skills/            # Skill definitions
├── docs/              # Documentation
└── examples/          # Example prompts
```

## Development

```bash
# Development mode
bun run dev list

# Build
bun run build

# Type check
bun run typecheck

# Lint
bun run lint
bun run lint:fix

# Format
bun run format
bun run format:check

# Run all checks
bun run check
bun run check:fix

# Test
bun test
bun test --watch
```

### Available Scripts

| Script         | Description                     |
| -------------- | ------------------------------- |
| `dev`          | Run CLI in development mode     |
| `build`        | Build for production            |
| `typecheck`    | Run TypeScript type checker     |
| `lint`         | Run Biome linter                |
| `lint:fix`     | Fix lint issues                 |
| `format`       | Format code with Biome          |
| `format:check` | Check code formatting           |
| `check`        | Run both lint and format checks |
| `check:fix`    | Fix lint and format issues      |
| `test`         | Run tests                       |
| `test:watch`   | Run tests in watch mode         |

### Type Safety

This project uses a Result pattern for type-safe error handling:

```typescript
import { ok, err, type Result } from "./types";

async function doSomething(): Promise<Result<Data, CustomError>> {
  if (success) {
    return ok(data);
  }
  return err(new CustomError("message"));
}

// Usage
const result = await doSomething();
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```

## Platform Support

Use these skills with:

- **Cursor** - Copy skill content into AI chat or custom instructions
- **Claude** - Paste as context in conversations or Projects
- **Codex** - Use with GitHub Copilot Chat or OpenAI API

See [PLATFORMS.md](./docs/PLATFORMS.md) for detailed guides.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

### Pre-commit Hooks

This project uses Husky for pre-commit hooks. On commit:

- Code is automatically formatted
- Lint issues are auto-fixed
- Type checking runs

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Made with Bun + TypeScript
