# code-generation

## Description

Generate high-quality, production-ready code from natural language descriptions. This skill focuses on translating requirements and specifications into clean, maintainable, and efficient code following best practices and design patterns.

## Capabilities

- **Natural Language Processing**: Convert plain English descriptions into working code
- **Multi-Language Support**: Generate code in various programming languages
- **Design Pattern Implementation**: Apply appropriate design patterns automatically
- **Best Practices**: Follow language-specific conventions and idioms
- **Type Safety**: Generate properly typed code with type annotations
- **Error Handling**: Include comprehensive error handling and edge cases
- **Documentation**: Auto-generate inline comments and docstrings
- **Testing Hooks**: Create testable, modular code structures

## Best Practices

### 1. Clarity and Readability
- Use descriptive variable and function names
- Follow language-specific naming conventions (camelCase, snake_case, etc.)
- Keep functions small and focused (single responsibility principle)
- Add comments only when code intent isn't clear

### 2. Code Structure
- Organize code logically with clear separation of concerns
- Use appropriate design patterns (Factory, Strategy, Observer, etc.)
- Implement proper abstraction layers
- Follow DRY (Don't Repeat Yourself) principle

### 3. Error Handling
- Validate inputs at function boundaries
- Use exceptions/errors appropriately
- Provide meaningful error messages
- Handle edge cases explicitly

### 4. Performance Considerations
- Choose appropriate data structures
- Avoid premature optimization
- Consider time and space complexity
- Use efficient algorithms

### 5. Security
- Sanitize user inputs
- Avoid SQL injection and XSS vulnerabilities
- Use parameterized queries
- Validate and escape data appropriately

## Usage

### Basic Code Generation

When generating code, provide:
1. **Clear Requirements**: Specific functionality needed
2. **Language/Framework**: Target technology
3. **Constraints**: Performance, compatibility, or style requirements
4. **Context**: Related code or system architecture

### Example Prompt Structure

```
Generate a [language] [component type] that:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Requirements:
- Language: [Python/JavaScript/etc.]
- Framework: [Optional]
- Style: [Functional/OOP/etc.]
- Error handling: [Robust/Basic]
```

## Anti-Patterns to Avoid

- ❌ Generating overly complex solutions
- ❌ Ignoring error handling
- ❌ Creating tightly coupled code
- ❌ Missing input validation
- ❌ Inconsistent naming conventions
- ❌ Hardcoding configuration values
- ❌ Skipping edge case handling

## Examples

See [examples.md](./examples.md) for detailed examples and prompts.

## Checklist

Before accepting generated code, verify:

- [ ] Code follows language conventions
- [ ] Functions have clear, single purposes
- [ ] Error handling is comprehensive
- [ ] Edge cases are covered
- [ ] Code is properly documented
- [ ] Security considerations addressed
- [ ] Performance is reasonable
- [ ] Code is testable

## Related Skills

- **testing**: Generate tests for your code
- **documentation**: Create comprehensive documentation
- **code-review**: Review generated code for quality
