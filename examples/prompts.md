# Example Prompts

Example prompts for using skills with AI coding assistants.

## Prompt Structure

```
Context: [What you're working on]
Skill: [Which skill to apply]
Task: [What you need]
Requirements: [Constraints]
```

---

## Code Generation

```
Using code-generation skill principles:

Create a Node.js Express endpoint that:
- Handles POST to /api/products
- Validates: name, price, category
- Returns 201 or 400
- TypeScript with error handling
```

---

## Code Review

```
Using code-review skill, review for:
- Security (SQL injection, XSS)
- Performance issues
- Error handling
- Best practices

[paste code]
```

---

## Debugging

```
Using debugging best practices:

Error: "TypeError: Cannot read property 'name' of undefined"

Stack trace: [paste]
Code: [paste]

Help identify root cause and fix.
```

---

## Refactoring

```
Using refactoring techniques:

This function is too long:
[paste code]

Refactor to:
- Single responsibility
- Extract smaller functions
- Better naming
- Reduce nesting
```

---

## Documentation

```
Using documentation standards:

Add JSDoc comments to:
[paste code]

Include:
- Purpose
- Parameters
- Return value
- Examples
```

---

## Testing

```
Using testing best practices:

Generate tests for:
[paste code]

Include:
- Happy path
- Edge cases
- Error conditions
- Use Jest
```

---

## Explanation

```
Using explanation skill:

Explain this code simply:
[paste code]

Include:
- What it does
- How it works
- Why this approach
```

---

## Combined Skills

```
Using code-generation and testing:

Create a user authentication feature with:
- Registration function
- Login function
- Password hashing
- JWT tokens
- Comprehensive tests
```

---

## Platform Tips

**Cursor:** Use Cmd/Ctrl+K with skill context in comments

**Claude:** Paste full skill content, then ask question

**Copilot:** Add skill principles as code comments

---

## Template

```
Context: [Working on X]
Skill: [skill-name]
Task: [Need help with Y]
Requirements:
- [Requirement 1]
- [Requirement 2]
Code: [if applicable]
Expected: [desired outcome]
```
