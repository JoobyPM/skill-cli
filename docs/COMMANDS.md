# Commands Reference

## Overview

This document describes all available commands in the skill-cli tool.

## Available Commands

### create

Create a new skill file.

```bash
skill create <name> [options]
```

**Arguments:**
- `<name>` - Name of the skill to create

**Options:**
- `-c, --content <content>` - Skill content (optional)

**Example:**
```bash
skill create my-skill
skill create my-skill --content "Custom content"
```

### update

Update an existing skill file.

```bash
skill update <name>
```

**Arguments:**
- `<name>` - Name of the skill to update

**Example:**
```bash
skill update my-skill
```

> Tip: Use tab completion for skill names when entering commands

### delete

Delete a skill file.

```bash
skill delete <name>
```

**Arguments:**
- `<name>` - Name of the skill to delete

**Example:**
```bash
skill delete my-skill
```

## Tips

- Skill names are case-sensitive
- All skills are stored in `~/.ai-skills/`
- Skill files use Markdown format (.md extension)
