# code-review

## Description

Comprehensive code review skill for identifying bugs, security vulnerabilities, performance issues, and suggesting improvements. This skill helps maintain high code quality through systematic analysis of code structure, logic, and adherence to best practices.

## Capabilities

- **Bug Detection**: Identify logic errors, edge cases, and potential runtime errors
- **Security Analysis**: Detect vulnerabilities like SQL injection, XSS, CSRF
- **Performance Review**: Spot inefficient algorithms and resource usage
- **Best Practices**: Validate coding standards and conventions
- **Architecture Review**: Assess code structure and design patterns
- **Maintainability**: Evaluate code readability and maintainability
- **Test Coverage**: Identify areas lacking proper testing
- **Documentation Quality**: Review comment quality and documentation

## Review Checklist

### 1. Correctness
- [ ] Logic is sound and handles all cases
- [ ] Edge cases are properly handled
- [ ] Error handling is comprehensive
- [ ] Return values are appropriate
- [ ] Null/undefined checks are in place

### 2. Security
- [ ] Input validation is present
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Secrets are not hardcoded
- [ ] Authentication/authorization is correct
- [ ] Data is properly sanitized

### 3. Performance
- [ ] Algorithm complexity is reasonable
- [ ] No unnecessary loops or iterations
- [ ] Database queries are optimized
- [ ] Caching is used where appropriate
- [ ] Resource cleanup is handled

### 4. Code Quality
- [ ] Naming is clear and consistent
- [ ] Functions are focused and small
- [ ] DRY principle is followed
- [ ] Code is readable
- [ ] Proper abstraction levels

### 5. Testing
- [ ] Unit tests exist
- [ ] Edge cases are tested
- [ ] Error conditions are tested
- [ ] Test coverage is adequate

## Review Process

### Step 1: Initial Assessment
- Read the code to understand intent
- Identify the main functionality
- Note any immediate concerns

### Step 2: Detailed Analysis
- Check each function/method individually
- Verify error handling
- Look for security issues
- Assess performance implications

### Step 3: Architecture Review
- Evaluate overall structure
- Check design pattern usage
- Assess coupling and cohesion
- Review dependencies

### Step 4: Provide Feedback
- Prioritize findings (critical, important, minor)
- Provide specific examples
- Suggest concrete improvements
- Explain the reasoning

## Feedback Structure

Use this structure for review comments:

```
**[Priority Level]**: [Issue Title]

**Location**: Line X, function Y

**Issue**: [Clear description of the problem]

**Impact**: [What could go wrong]

**Suggestion**: [How to fix it]

**Example**:
[Code example if helpful]
```

## Priority Levels

- 🔴 **Critical**: Security vulnerabilities, data loss risks, crashes
- 🟡 **Important**: Bugs, performance issues, maintainability problems
- 🟢 **Minor**: Style issues, minor optimizations, suggestions

## Common Issues to Check

### Logic Errors
- Off-by-one errors
- Incorrect comparisons
- Missing edge cases
- Race conditions
- Infinite loops

### Security Issues
- Unvalidated inputs
- SQL injection
- XSS vulnerabilities
- Insecure password storage
- Exposed secrets

### Performance Issues
- N+1 query problems
- Inefficient algorithms (O(n²) when O(n) possible)
- Memory leaks
- Unnecessary computations
- Missing indexes

### Code Smells
- Duplicate code
- Long functions
- God objects
- Feature envy
- Dead code

## Anti-Patterns to Flag

- ❌ Magic numbers
- ❌ Deep nesting
- ❌ Commented-out code
- ❌ Global variables
- ❌ Inconsistent naming
- ❌ Tight coupling
- ❌ Missing error handling

## Best Practices

1. **Be Constructive**: Focus on solutions, not just problems
2. **Be Specific**: Provide exact line numbers and examples
3. **Prioritize**: Address critical issues first
4. **Educate**: Explain why something is an issue
5. **Be Objective**: Base feedback on facts and standards
6. **Acknowledge Good Code**: Mention positive aspects too

## Examples

See [examples.md](./examples.md) for detailed review examples.

## Review Completion Checklist

Before completing a review:

- [ ] All critical issues identified
- [ ] Security concerns addressed
- [ ] Performance bottlenecks noted
- [ ] Code quality issues documented
- [ ] Suggestions provided for improvements
- [ ] Positive aspects acknowledged
- [ ] Feedback is actionable

## Related Skills

- **debugging**: Fix identified issues
- **refactoring**: Improve code structure
- **testing**: Add missing test coverage
- **security**: Deep security analysis
