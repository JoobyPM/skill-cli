# Skills Overview

This directory contains pre-built skills for AI coding assistants. Each skill provides structured guidance for specific coding tasks.

## Available Skills

### 1. [Code Generation](./code-generation/)
Generate high-quality code from natural language descriptions.

**Use Cases:**
- Creating new functions, classes, and modules
- Implementing features from specifications
- Scaffolding project structures
- Generating boilerplate code

**Key Capabilities:**
- Natural language to code translation
- Best practices enforcement
- Multiple language support
- Design pattern implementation

---

### 2. [Code Review](./code-review/)
Review code for quality, bugs, security issues, and improvements.

**Use Cases:**
- Pull request reviews
- Code quality audits
- Security vulnerability detection
- Performance optimization suggestions

**Key Capabilities:**
- Bug detection
- Security analysis
- Performance review
- Best practices validation

---

### 3. [Debugging](./debugging/)
Find and fix bugs in your code systematically.

**Use Cases:**
- Error investigation
- Bug reproduction
- Root cause analysis
- Fix implementation

**Key Capabilities:**
- Error analysis
- Stack trace interpretation
- Debugging strategies
- Fix suggestions with explanations

---

### 4. [Refactoring](./refactoring/)
Improve code structure and quality without changing behavior.

**Use Cases:**
- Code cleanup
- Performance optimization
- Maintainability improvements
- Technical debt reduction

**Key Capabilities:**
- Code smell detection
- Refactoring patterns
- Incremental improvements
- Safe transformation strategies

---

### 5. [Documentation](./documentation/)
Generate and improve code documentation.

**Use Cases:**
- README creation
- API documentation
- Inline comments
- Usage examples
- Architecture documentation

**Key Capabilities:**
- Auto-documentation generation
- Clear explanation writing
- Example creation
- Documentation standards

---

### 6. [Testing](./testing/)
Create and improve test cases for better coverage.

**Use Cases:**
- Unit test creation
- Integration test design
- Test coverage improvement
- Test-driven development

**Key Capabilities:**
- Test case generation
- Edge case identification
- Test structure organization
- Assertion recommendations

---

### 7. [Explanation](./explanation/)
Explain how code works in clear, understandable terms.

**Use Cases:**
- Understanding complex code
- Onboarding new developers
- Learning new codebases
- Architecture comprehension

**Key Capabilities:**
- Code walkthrough
- Concept explanation
- Dependency mapping
- Flow visualization

---

## Using Skills

### Command Line

Use the skill-cli tool to manage skills:

```bash
# List all skills
skill list

# Get a specific skill
skill get code-generation

# Add a custom skill
skill add my-custom-skill

# Remove a skill
skill remove my-custom-skill
```

### Direct Usage

You can also directly read skill files:

```bash
# View a skill
cat skills/code-generation/SKILL.md

# View examples
cat skills/code-generation/examples.md
```

### In AI Assistants

Copy the content of `SKILL.md` files and paste them into your AI assistant (Cursor, Claude, Codex) to provide context for your tasks.

## Skill Structure

Each skill directory contains:

```
skill-name/
├── SKILL.md       # Main skill documentation
└── examples.md    # Practical examples and prompts
```

### SKILL.md Format

Each `SKILL.md` follows this structure:

- **Description**: What the skill does
- **Capabilities**: What it can help with
- **Best Practices**: Guidelines and principles
- **Usage**: How to apply the skill
- **Anti-patterns**: What to avoid

### examples.md Format

Each `examples.md` contains:

- Practical prompts
- Real-world scenarios
- Before/after examples
- Common use cases

## Creating Custom Skills

You can create custom skills for your specific needs:

```bash
# Create a new skill
skill add database-optimization

# Edit the skill files
code skills/database-optimization/SKILL.md
code skills/database-optimization/examples.md
```

## Contributing Skills

We welcome contributions of new skills! To contribute:

1. Fork the repository
2. Create a new skill with `skill add <skill-name>`
3. Fill in comprehensive documentation
4. Add practical examples
5. Submit a pull request

See our [Contributing Guidelines](../README.md#contributing) for more details.

## Skill Categories

Skills are organized by task type:

| Category | Skills | Focus Area |
|----------|--------|------------|
| **Creation** | code-generation | Building new code |
| **Quality** | code-review, refactoring, testing | Improving code quality |
| **Problem Solving** | debugging | Fixing issues |
| **Communication** | documentation, explanation | Understanding and sharing |

## Best Practices

### Combining Skills

For complex tasks, combine multiple skills:

```bash
# Get code generation and testing skills for TDD
skill get code-generation
skill get testing

# Use both in your AI assistant prompt
```

### Skill Updates

Keep skills up to date:

```bash
# Update the repository
cd skill-cli
git pull origin main

# Use updated skills
skill list
```

### Customization

Customize skills for your team:

1. Copy a skill: `cp -r skills/code-review skills/team-code-review`
2. Modify for your standards
3. Use your custom version
4. Share with your team via git

## Platform-Specific Guides

See [PLATFORMS.md](../docs/PLATFORMS.md) for detailed guides on using skills with:
- Cursor
- Claude
- Codex
- And more

## Feedback

Have suggestions for improving skills? Please:
- Open an issue on GitHub
- Submit a pull request
- Share your use cases

## License

All skills are available under the MIT License. See [LICENSE](../LICENSE) for details.
