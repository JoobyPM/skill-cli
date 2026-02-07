# Platform Guides

Using skill-cli with different AI coding assistants.

## Cursor

Cursor is an AI-first code editor.

**Usage:**

1. Run `skill get <name>` to view a skill
2. Copy the output
3. Paste into Cursor's AI chat (Cmd/Ctrl+L)
4. Or add to Settings → AI → Custom Instructions

**Tips:**

- Use Cmd/Ctrl+K for inline suggestions
- Add skills to `.cursor/` folder for quick access

---

## Claude

Claude is available via web interface and API.

**Web Interface:**

1. Get skill: `skill get <name>`
2. Copy content
3. Paste into Claude conversation
4. Ask your question

**API Usage:**

```python
from anthropic import Anthropic

skill_content = """[Content from skill get <name>]"""

client = Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    system=skill_content,
    messages=[{"role": "user", "content": "..."}],
)
```

**Tips:**

- Use Projects to add skills as permanent context
- Keep skill context early in conversations

---

## Codex / GitHub Copilot

Use with GitHub Copilot or OpenAI API.

**GitHub Copilot:**

Add skill principles as comments:

```javascript
// Following code-generation principles:
// 1. Clear naming
// 2. Single responsibility
// 3. Error handling

function myFunction() {
  // Copilot suggests based on context
}
```

**Copilot Chat:**

```
@workspace Following the refactoring skill:
[paste key points]
Refactor this code: [your code]
```

**OpenAI API:**

```python
from openai import OpenAI

with open("skills/testing/SKILL.md", "r") as f:
    skill = f.read()

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": skill},
        {"role": "user", "content": "Generate tests for: [code]"},
    ],
)
```

---

## General Tips

**Combining Skills:**

```bash
skill get code-generation
skill get testing
# Use both in your prompt
```

**Team Usage:**

```bash
# Create team-specific skills
skill add team-conventions

# Share via git
git add skills/team-conventions/
git commit -m "Add team conventions skill"
```

**Version Control:**

Keep skills in your project:

```bash
mkdir .ai-skills
cp skills/code-generation/SKILL.md .ai-skills/
git add .ai-skills/
```

---

## Resources

- [Cursor Docs](https://cursor.sh/docs)
- [Claude Help](https://support.anthropic.com)
- [GitHub Copilot Docs](https://docs.github.com/copilot)
