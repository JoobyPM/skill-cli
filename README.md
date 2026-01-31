# skill-cli

CLI tool for managing AI coding assistant skills for Cursor, Claude, and Codex.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**skill-cli** helps developers manage and organize skills for AI coding assistants. Create, share, and version-control your AI interaction patterns across Cursor, Claude, and Codex.

### Features

- 🎯 Simple CLI for skill management
- 📦 Create custom skills for your team
- 🚀 Built with Bun for fast performance
- 🛠️ TypeScript with full type safety

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
├── src/           # TypeScript source code
├── skills/        # Skill definitions
├── docs/          # Documentation
└── examples/      # Example prompts
```

## Development

```bash
# Development mode
bun run dev list

# Build
bun run build

# Lint & Format
bun run lint
bun run format
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

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Made with ❤️ for developers using AI coding assistants
