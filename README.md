# skill-cli

> A CLI tool for managing AI coding assistant skills for Cursor, Claude, and Codex

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Overview

**skill-cli** is a command-line tool designed to help developers manage and organize skills for AI coding assistants. Whether you're using Cursor, Claude, or Codex, this tool provides a unified way to create, manage, and share coding assistant skills.

### Features

- 🎯 Simple CLI interface for skill management
- 📦 Pre-built skills for common coding tasks
- 🔄 Easy skill creation and customization
- 🚀 Built with Bun for fast performance
- 🛠️ TypeScript support with full type safety
- 📖 Comprehensive documentation

## 🚀 Installation

### Prerequisites

- [Bun](https://bun.sh) v1.0 or higher

### Install from source

```bash
# Clone the repository
git clone https://github.com/JoobyPM/skill-cli.git
cd skill-cli

# Install dependencies
bun install

# Build the CLI
bun run build

# Link globally (optional)
bun link
```

## 📖 Usage

### Available Commands

```bash
# List all available skills
skill list

# Get details about a specific skill
skill get <skill-name>

# Add a new skill
skill add <skill-name>

# Update an existing skill
skill update <skill-name>

# Remove a skill
skill remove <skill-name>
```

### Examples

```bash
# List all skills
$ skill list
📚 Available Skills:
  1. code-generation
  2. code-review
  3. debugging
  4. refactoring
  5. documentation
  6. testing
  7. explanation

# Get a specific skill
$ skill get code-generation
📖 Skill: code-generation
[Shows the skill documentation]

# Add a new custom skill
$ skill add my-custom-skill
✅ Skill 'my-custom-skill' has been added
   Location: skills/my-custom-skill/SKILL.md
```

## 🎯 Available Skills

| Skill | Description | Use Cases |
|-------|-------------|-----------|
| **code-generation** | Generate code from natural language descriptions | Creating new functions, classes, components |
| **code-review** | Review code for quality, bugs, and improvements | Pull request reviews, code audits |
| **debugging** | Find and fix bugs in your code | Error investigation, troubleshooting |
| **refactoring** | Improve code structure without changing behavior | Code cleanup, performance optimization |
| **documentation** | Generate and improve code documentation | README files, inline comments, API docs |
| **testing** | Create and improve test cases | Unit tests, integration tests, test coverage |
| **explanation** | Explain how code works | Understanding complex code, onboarding |

## 📁 Project Structure

```
skill-cli/
├── src/                    # Source code
│   ├── index.ts           # CLI entry point
│   ├── commands/          # Command implementations
│   ├── utils/             # Helper functions
│   └── types/             # TypeScript types
├── skills/                # Skill definitions
│   ├── code-generation/
│   ├── code-review/
│   ├── debugging/
│   └── ...
├── docs/                  # Documentation
│   ├── COMMANDS.md        # Command reference
│   └── PLATFORMS.md       # Platform guides
└── examples/              # Example prompts
```

## 🛠️ Development

### Running in Development

```bash
# Run the CLI in development mode
bun run dev list

# Run with arguments
bun run dev get code-generation
```

### Building

```bash
# Build the project
bun run build
```

### Linting and Formatting

```bash
# Run ESLint
bun run lint

# Fix ESLint issues
bun run lint:fix

# Format code with Prettier
bun run format

# Check formatting
bun run format:check
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Adding a New Skill

To add a new skill to the repository:

1. Run `skill add <skill-name>` to create the skill structure
2. Edit `skills/<skill-name>/SKILL.md` with your skill documentation
3. Add examples to `skills/<skill-name>/examples.md`
4. Submit a pull request

### Code Style

- We use ESLint and Prettier for code formatting
- Husky pre-commit hooks ensure code quality
- All TypeScript code should be properly typed

## 📚 Documentation

- [Command Reference](./docs/COMMANDS.md) - Detailed documentation for all CLI commands
- [Platform Guides](./docs/PLATFORMS.md) - Platform-specific setup and usage guides
- [Skills Overview](./skills/README.md) - Complete list of available skills

## 🌐 Platform Support

### Cursor

Cursor is an AI-first code editor. Use these skills by copying the content from `skills/<skill-name>/SKILL.md` into your Cursor AI prompts.

### Claude

Claude by Anthropic can be used with these skills by providing the skill content as context in your conversations.

### Codex

OpenAI's Codex can utilize these skills as prompts for code generation and assistance.

See [PLATFORMS.md](./docs/PLATFORMS.md) for detailed platform-specific instructions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh)
- CLI powered by [Commander.js](https://github.com/tj/commander.js)
- Styled with [Chalk](https://github.com/chalk/chalk)
- Spinners by [Ora](https://github.com/sindresorhus/ora)

## 📧 Contact

JoobyPM - [@JoobyPM](https://github.com/JoobyPM)

Project Link: [https://github.com/JoobyPM/skill-cli](https://github.com/JoobyPM/skill-cli)

---

Made with ❤️ for developers using AI coding assistants
