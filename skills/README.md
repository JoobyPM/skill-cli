# Skills Overview

Pre-built skills for AI coding assistants. Each skill provides structured guidance for specific tasks.

## Using Skills

### Command Line

```bash
# List all skills
skill list

# View a skill
skill get <skill-name>

# Create custom skill
skill add <skill-name>
```

### Direct Access

```bash
# Read a skill file
cat skills/code-generation/SKILL.md
```

### In AI Assistants

Copy skill content and paste into your AI assistant (Cursor, Claude, Codex) for context.

---

## Skill Structure

Each skill directory contains:

```
skill-name/
├── SKILL.md       # Main documentation
└── examples.md    # Practical examples
```

**SKILL.md includes:**

- Description
- Capabilities
- Best practices
- Usage guidelines
- Anti-patterns

**examples.md includes:**

- Real-world examples
- Before/after code
- Common use cases

---

## Creating Custom Skills

```bash
# Create new skill
skill add database-optimization

# Edit files
code skills/database-optimization/SKILL.md
code skills/database-optimization/examples.md
```

---

## Contributing

We welcome new skills! To contribute:

1. Fork the repository
2. Create skill with `skill add <name>`
3. Add comprehensive documentation
4. Submit pull request

---

## Platform Guides

See [PLATFORMS.md](../docs/PLATFORMS.md) for platform-specific usage guides.

## License

All skills are available under the MIT License.
