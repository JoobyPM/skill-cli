# Command Reference

Complete reference for all `skill` CLI commands.

## Commands

### skill list

List all available skills.

```bash
skill list
```

**Output:**

```
📚 Available Skills:
  1. code-generation
  2. code-review
  ...
```

---

### skill get <name>

Display a specific skill's documentation.

```bash
skill get code-generation
```

**Arguments:**

- `<name>` - The skill name (required)

---

### skill add <name>

Create a new skill with template files.

```bash
skill add my-skill
```

**Creates:**

- `skills/my-skill/SKILL.md` - Main documentation
- `skills/my-skill/examples.md` - Examples

---

### skill update <name>

Update an existing skill (placeholder for future functionality).

```bash
skill update my-skill
```

---

### skill remove <name>

Delete a skill directory.

```bash
skill remove my-skill
```

**Warning:** This permanently deletes the skill.

---

## Tips

1. Use kebab-case for skill names (e.g., `my-new-skill`)
2. Skill names must start with a lowercase letter and contain only `a-z`, `0-9`, `-`, `_`
3. Back up skills before removing them

## Examples

```bash
# Create a custom skill
skill add database-migration

# View it
skill get database-migration

# Remove it
skill remove database-migration
```

## See Also

- [Platform Guides](./PLATFORMS.md) - Platform-specific usage
- [Main README](../README.md) - Getting started
