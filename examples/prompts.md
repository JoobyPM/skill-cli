# Example Prompts

This file contains example prompts for using skills with AI coding assistants like Cursor, Claude, and Codex.

## General Prompt Structure

```
Context: [What you're working on]
Skill: [Which skill to apply]
Task: [What you need help with]
Requirements: [Specific constraints or preferences]
```

---

## Code Generation Prompts

### Example 1: REST API Endpoint
```
Using the code-generation skill principles:

Create a Node.js Express endpoint that:
- Handles POST requests to /api/products
- Validates required fields (name, price, category)
- Checks that price is a positive number
- Saves to MongoDB
- Returns 201 with created product or 400 with validation errors
- Includes proper error handling and TypeScript types
```

### Example 2: React Component
```
Following code-generation best practices:

Generate a React component for a collapsible FAQ section that:
- Takes an array of {question, answer} objects as props
- Each FAQ item can be expanded/collapsed
- Only one item can be open at a time
- Uses TypeScript
- Implements accessibility (ARIA attributes)
- Includes smooth animations
```

---

## Code Review Prompts

### Example 1: Security Review
```
Using the code-review skill, please review this authentication function for:
- Security vulnerabilities (SQL injection, XSS, etc.)
- Password handling best practices
- Error handling
- Input validation

[Paste your code here]
```

### Example 2: Performance Review
```
Apply code-review principles focusing on performance:

Review this data processing function for:
- Algorithm efficiency
- Database query optimization
- Memory usage
- Potential bottlenecks

[Paste your code here]
```

---

## Debugging Prompts

### Example 1: Error Investigation
```
Using debugging best practices:

I'm getting this error: "TypeError: Cannot read property 'name' of undefined"

Stack trace:
[Paste stack trace]

Code:
[Paste relevant code]

Help me:
1. Identify the root cause
2. Explain why it's happening
3. Suggest a fix with proper error handling
```

### Example 2: Performance Issue
```
Following debugging strategies:

My application becomes slow after running for a few hours.
Symptoms:
- Memory usage keeps increasing
- Response times degrade
- Eventually crashes

Help me:
1. Identify likely causes (memory leak, connection pool issue, etc.)
2. Suggest debugging approaches
3. Provide logging strategies to identify the issue
```

---

## Refactoring Prompts

### Example 1: Improve Structure
```
Using refactoring techniques:

This function is too long and does too many things:
[Paste code]

Help me refactor it to:
- Follow single responsibility principle
- Extract smaller, focused functions
- Improve naming
- Reduce nesting
- Maintain the same behavior
```

### Example 2: Apply Design Pattern
```
Following refactoring best practices:

I have multiple similar classes with duplicate code:
[Paste code]

Help me:
1. Identify appropriate design pattern (Factory, Strategy, etc.)
2. Refactor to use the pattern
3. Reduce code duplication
4. Improve extensibility
```

---

## Documentation Prompts

### Example 1: Function Documentation
```
Using documentation standards:

Add comprehensive JSDoc/docstring comments to this function:
[Paste code]

Include:
- Purpose description
- Parameter descriptions with types
- Return value description
- Usage examples
- Error cases
```

### Example 2: README Creation
```
Following documentation best practices:

Create a README.md for this project:

Project: [Name]
Description: [Brief description]
Tech stack: [Technologies used]
Main features: [List features]

Include:
- Overview with badges
- Installation instructions
- Quick start guide
- API reference
- Contributing guidelines
- License
```

---

## Testing Prompts

### Example 1: Unit Tests
```
Using testing best practices:

Generate comprehensive unit tests for this function:
[Paste code]

Include tests for:
- Happy path
- Edge cases (empty input, null, undefined, boundary values)
- Error conditions
- Different input types
Use Jest/Mocha/PyTest (specify your framework)
```

### Example 2: Integration Tests
```
Following testing principles:

Create integration tests for this API endpoint:
[Paste endpoint code]

Test:
- Successful request with valid data
- Various validation failures
- Authentication/authorization
- Database interaction
- Error responses
```

---

## Explanation Prompts

### Example 1: Code Explanation
```
Using explanation skill:

Explain this code in simple terms:
[Paste code]

Include:
- What it does (high-level)
- How it works (step-by-step)
- Why certain approaches were used
- Any important patterns or techniques
- Make it understandable for a junior developer
```

### Example 2: Algorithm Explanation
```
Following explanation best practices:

Explain this algorithm:
[Paste code]

Cover:
- What problem it solves
- How the algorithm works (with example)
- Time and space complexity
- When to use it vs alternatives
- Use analogies where helpful
```

---

## Combined Skills Prompts

### Example 1: Feature Development (Generation + Testing)
```
Using code-generation and testing skills:

Create a user authentication feature with:

1. Registration function
   - Email validation
   - Password hashing
   - User creation

2. Login function
   - Credential verification
   - JWT token generation

3. Comprehensive tests for both

Requirements:
- Node.js/Express
- MongoDB
- TypeScript
- Jest for testing
```

### Example 2: Refactor + Document
```
Using refactoring and documentation skills:

This code works but is hard to understand and maintain:
[Paste code]

Please:
1. Refactor for clarity and maintainability
2. Add comprehensive documentation
3. Improve naming
4. Extract reusable functions
5. Add usage examples
```

### Example 3: Debug + Test
```
Using debugging and testing skills:

This function has a bug that causes intermittent failures:
[Paste code]

Error message: [Paste error]

Please:
1. Identify and fix the bug
2. Explain the root cause
3. Add tests to prevent regression
4. Test edge cases that might trigger similar issues
```

---

## Platform-Specific Tips

### For Cursor
- Reference skills in chat: "Using the [skill-name] approach..."
- Use Cmd/Ctrl+K for inline suggestions with skill context
- Add skill content to .cursor/rules for consistent behavior

### For Claude
- Paste the full skill content at the start of conversation
- Reference it in follow-ups: "Based on the code-generation skill..."
- Use Projects feature to add skills as permanent context

### For Codex/Copilot
- Add skill principles as comments in your code
- Use Copilot Chat with @workspace and skill content
- Include skill examples in comments for better suggestions

---

## Tips for Better Prompts

1. **Be Specific**: Clearly state what you want
2. **Provide Context**: Include relevant code and information
3. **Reference Skills**: Mention which skill to apply
4. **Set Constraints**: Specify languages, frameworks, requirements
5. **Include Examples**: Show desired input/output when possible
6. **Iterative Refinement**: Start broad, then add details
7. **Combine Skills**: Use multiple skills for complex tasks

---

## Template Prompt

```
Context:
[What you're building/working on]

Skill:
[Which skill(s) to use: code-generation, code-review, debugging, etc.]

Task:
[Specific thing you need help with]

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Code (if applicable):
[Paste relevant code]

Expected outcome:
[Describe what you want as the result]
```

---

## Additional Resources

- See individual skill directories for more examples
- Check [PLATFORMS.md](../docs/PLATFORMS.md) for platform-specific guides
- Review [COMMANDS.md](../docs/COMMANDS.md) for CLI usage
