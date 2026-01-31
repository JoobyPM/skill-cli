# Platform-Specific Guides

This guide provides platform-specific instructions for using skill-cli with various AI coding assistants.

## Table of Contents

- [Cursor](#cursor)
- [Claude](#claude)
- [Codex](#codex)
- [General Best Practices](#general-best-practices)

---

## Cursor

Cursor is an AI-first code editor that integrates AI assistance directly into your development workflow.

### Setup

1. **Install Cursor**: Download from [cursor.sh](https://cursor.sh)
2. **Clone skill-cli**: 
   ```bash
   git clone https://github.com/JoobyPM/skill-cli.git
   cd skill-cli
   ```
3. **Build the CLI**:
   ```bash
   bun install
   bun run build
   ```

### Using Skills in Cursor

#### Method 1: Copy Skill Content

```bash
# Get the skill content
skill get code-generation

# Copy the output and paste it into Cursor's AI chat
```

#### Method 2: Reference Skills in Prompts

In Cursor's AI chat, reference skills like this:

```
Using the code-generation skill approach, create a React component for...
```

Then manually provide the skill context from `skills/code-generation/SKILL.md`.

#### Method 3: Add Skills to Cursor's Context

1. Open Cursor Settings
2. Go to "AI" settings
3. Add custom instructions with skill content:
   ```
   When generating code, follow these principles:
   [Paste skill content here]
   ```

### Cursor-Specific Tips

- **Use Cmd/Ctrl+K** for inline AI suggestions with skill context
- **Use Cmd/Ctrl+L** to open the AI chat panel
- **Add `.cursor/` folder** to your project with common skills for quick access
- **Use skill examples** as templates for your Cursor prompts

### Example Workflow

```bash
# Working on a debugging task
skill get debugging

# Copy the debugging principles
# Open Cursor's AI chat (Cmd/Ctrl+L)
# Paste: "Using these debugging principles: [paste content]"
# Then describe your bug
```

---

## Claude

Claude is Anthropic's AI assistant, available through the web interface and API.

### Setup

1. **Access Claude**: Visit [claude.ai](https://claude.ai) or use the API
2. **Get Skills**: Clone and build skill-cli as shown in the main README

### Using Skills with Claude

#### Web Interface

1. **Start a new conversation**
2. **Provide skill context** by copying skill content:
   ```bash
   skill get code-review
   ```
3. **Paste the skill content** into your message
4. **Ask your question** after providing the context

Example prompt:
```
I need help with code review. Here's my approach:

[Paste content from 'skill get code-review']

Now, please review this code:
[Your code here]
```

#### Claude API

If using the Claude API programmatically:

```python
import anthropic

# Get skill content
skill_content = """
[Content from skill get code-generation]
"""

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    system=skill_content,  # Add skill as system context
    messages=[
        {"role": "user", "content": "Generate a function that..."}
    ]
)
```

### Claude-Specific Tips

- **Use Projects**: Create a Claude Project and add your most-used skills as project knowledge
- **System Prompts**: For API usage, add skills as system prompts for consistent behavior
- **Conversation History**: Keep skill context early in conversations for better results
- **Multi-turn Conversations**: Reference the skill in follow-up questions

### Example Workflow

```bash
# Starting a documentation task
skill get documentation

# In Claude web interface:
# 1. Paste the documentation skill content
# 2. Say: "I need to document this codebase..."
# 3. Provide your code
# 4. Get AI-generated documentation following the skill guidelines
```

---

## Codex

OpenAI's Codex powers GitHub Copilot and is available through the OpenAI API.

### Setup

1. **Install GitHub Copilot** (recommended way to use Codex)
   - VS Code: Install the GitHub Copilot extension
   - JetBrains IDEs: Install the GitHub Copilot plugin

2. **Or use OpenAI API** directly
   - Sign up at [platform.openai.com](https://platform.openai.com)
   - Get your API key

### Using Skills with GitHub Copilot

#### Method 1: Comment-Based Prompting

Add skill principles as comments in your code:

```javascript
// Following refactoring best practices:
// 1. Maintain single responsibility
// 2. Extract reusable functions
// 3. Improve naming clarity

// TODO: Refactor this function
function processData(data) {
  // Copilot will suggest refactored code based on the context
}
```

#### Method 2: Use Copilot Chat

In VS Code with Copilot Chat:

```
@workspace /help I need to refactor this code following these principles:
[Paste refactoring skill content]
[Your code]
```

### Using Skills with OpenAI API

```python
import openai

# Load skill content
with open('skills/testing/SKILL.md', 'r') as f:
    skill_content = f.read()

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": skill_content},
        {"role": "user", "content": "Generate unit tests for this function: [code]"}
    ]
)
```

### Codex-Specific Tips

- **Inline Comments**: Use detailed comments with skill principles for better suggestions
- **File Context**: Keep relevant skill content in comments at the top of files
- **Iterative Refinement**: Accept suggestions and refine with additional skill context
- **Example-Driven**: Include examples from skill `examples.md` files in comments

### Example Workflow

```bash
# Working with GitHub Copilot on testing
skill get testing

# In your test file, add:
# Testing approach:
# [Paste key points from the testing skill]

# Then write your test structure and let Copilot suggest implementations
```

---

## General Best Practices

### Combining Skills

You can combine multiple skills for complex tasks:

```bash
# Get multiple skills
skill get code-generation
skill get testing
skill get documentation

# Use them together in your prompt:
# "Following code-generation and testing best practices,
#  create a new feature with tests and documentation..."
```

### Customizing Skills

1. **Create Custom Skills**:
   ```bash
   skill add project-specific-patterns
   ```

2. **Edit for Your Needs**:
   Edit `skills/project-specific-patterns/SKILL.md` with your team's conventions

3. **Share with Team**:
   Commit custom skills to your project repository

### Version Control Integration

Track your skills in your project:

```bash
# In your project
mkdir .ai-skills
cd .ai-skills

# Copy relevant skills
cp /path/to/skill-cli/skills/code-generation/SKILL.md ./
cp /path/to/skill-cli/skills/testing/SKILL.md ./

# Commit to your project
git add .ai-skills/
git commit -m "Add AI coding assistant skills"
```

### Prompt Engineering Tips

1. **Be Specific**: Reference exact skill sections
   ```
   "Following the 'Error Handling' section of the code-generation skill..."
   ```

2. **Provide Context**: Include relevant examples
   ```
   "As shown in examples.md, create a similar function for..."
   ```

3. **Iterate**: Start with skill overview, then add details
   ```
   First prompt: High-level with skill context
   Follow-up: Specific requirements and edge cases
   ```

4. **Use Structured Format**:
   ```
   Task: [What you want]
   Skill Context: [Skill content]
   Requirements: [Specific needs]
   Constraints: [Limitations]
   ```

### Skill Selection Guide

| Task Type | Recommended Skills |
|-----------|-------------------|
| Creating new features | code-generation, testing |
| Fixing bugs | debugging, testing |
| Improving existing code | refactoring, code-review |
| Writing docs | documentation, explanation |
| Understanding code | explanation, code-review |
| Test coverage | testing, code-review |

### Performance Tips

- **Cache Skills**: Keep frequently used skills in clipboard or notes
- **Create Shortcuts**: Use shell aliases for common skill commands
- **Organize by Project**: Keep project-specific skills in `.ai-skills/` folder
- **Update Regularly**: Pull latest skill updates from skill-cli repository

### Team Collaboration

1. **Standardize Skills**: Agree on which skills to use
2. **Customize Together**: Create team-specific skills
3. **Share Prompts**: Document successful prompts in project wiki
4. **Review Outputs**: Ensure AI-generated code follows team standards

## Troubleshooting

### Issue: Skill Content Too Long

**Solution**: Use shorter excerpts or summarize key points

```bash
# Instead of full skill:
skill get code-generation | head -n 30  # First 30 lines only
```

### Issue: Inconsistent Results

**Solution**: 
- Be more specific in prompts
- Include relevant examples from `examples.md`
- Use the same skill version across team

### Issue: Skills Out of Date

**Solution**:
```bash
cd skill-cli
git pull origin main
bun run build
```

## Resources

- [Cursor Documentation](https://cursor.sh/docs)
- [Claude Help Center](https://support.anthropic.com)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Contributing Platform Guides

Have experience with other platforms? Contribute guides for:
- Tabnine
- Amazon CodeWhisperer
- Replit Ghostwriter
- And more!

See our [Contributing Guidelines](../README.md#contributing) for details.
