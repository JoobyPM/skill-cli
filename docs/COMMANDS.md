# Command Reference

Complete reference for all `skill` CLI commands.

## Global Options

```bash
skill --version    # Show version number
skill --help       # Show help information
```

## Commands

### `skill list`

List all available skills in the skills directory.

**Syntax:**
```bash
skill list
```

**Example:**
```bash
$ skill list
📚 Available Skills:

  1. code-generation
  2. code-review
  3. debugging
  4. refactoring
  5. documentation
  6. testing
  7. explanation

  Total: 7 skills
```

**Description:**
This command scans the `skills/` directory and displays all available skill modules. Each skill is listed with its directory name.

---

### `skill get <name>`

Display the contents of a specific skill.

**Syntax:**
```bash
skill get <skill-name>
```

**Arguments:**
- `<skill-name>` - The name of the skill to display (required)

**Example:**
```bash
$ skill get code-generation
📖 Skill: code-generation

# code-generation

## Description
Generate high-quality code from natural language descriptions...
```

**Description:**
This command reads and displays the `SKILL.md` file from the specified skill directory. The content includes the skill's description, capabilities, usage examples, and more.

---

### `skill add <name>`

Create a new skill with template files.

**Syntax:**
```bash
skill add <skill-name>
```

**Arguments:**
- `<skill-name>` - The name of the skill to create (required)

**Example:**
```bash
$ skill add api-integration
✅ Skill 'api-integration' has been added
   Location: skills/api-integration/SKILL.md
```

**Description:**
This command creates a new skill directory with template files:
- `SKILL.md` - Main skill documentation template
- `examples.md` - Examples template

The templates include placeholders that you can fill in with your skill's details.

---

### `skill update <name>`

Update an existing skill.

**Syntax:**
```bash
skill update <skill-name>
```

**Arguments:**
- `<skill-name>` - The name of the skill to update (required)

**Example:**
```bash
$ skill update code-generation
✅ Skill 'code-generation' has been updated
```

**Description:**
This command allows you to update an existing skill. Currently, it provides a placeholder for future update functionality such as:
- Fetching updates from a remote repository
- Interactive editing
- Version management

---

### `skill remove <name>`

Remove a skill from the skills directory.

**Syntax:**
```bash
skill remove <skill-name>
```

**Arguments:**
- `<skill-name>` - The name of the skill to remove (required)

**Example:**
```bash
$ skill remove my-custom-skill
🗑️  Skill 'my-custom-skill' has been removed
```

**Description:**
This command permanently deletes a skill directory and all its contents. Use with caution as this action cannot be undone.

---

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | Error occurred |

## Error Messages

### Common Errors

**"Skill not found"**
- The specified skill does not exist in the skills directory
- Check spelling and use `skill list` to see available skills

**"Skill already exists"**
- Attempted to create a skill that already exists
- Use `skill update` instead or choose a different name

**"Failed to load skills"**
- Unable to read the skills directory
- Check file permissions and ensure the skills directory exists

## Tips

1. **Tab Completion**: Most shells support tab completion for command names
2. **Skill Names**: Use kebab-case for skill names (e.g., `my-new-skill`)
3. **Backups**: Create backups before removing skills
4. **Version Control**: Track your custom skills with git

## Examples

### Creating a Custom Workflow

```bash
# Create a new skill for your specific use case
skill add database-migration

# Edit the skill files
code skills/database-migration/SKILL.md
code skills/database-migration/examples.md

# View the skill
skill get database-migration

# List all skills including your new one
skill list
```

### Managing Skills

```bash
# List all available skills
skill list

# Get details about a specific skill
skill get debugging

# Create a backup of a skill before modification
cp -r skills/code-review skills/code-review.backup

# Update the skill
skill update code-review

# Remove the backup if everything works
skill remove code-review.backup
```

## See Also

- [Platform Guides](./PLATFORMS.md) - Platform-specific setup and usage
- [Skills Overview](../skills/README.md) - Complete list of available skills
- [Main README](../README.md) - Project overview and getting started
