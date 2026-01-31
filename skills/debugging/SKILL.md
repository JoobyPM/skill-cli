# debugging

## Description

Systematic approach to finding and fixing bugs in code. This skill provides strategies for error investigation, root cause analysis, and implementing effective fixes.

## Capabilities

- **Error Analysis**: Interpret error messages and stack traces
- **Root Cause Identification**: Find the underlying cause of issues
- **Reproduction**: Create minimal reproducible examples
- **Fix Implementation**: Develop and validate solutions
- **Prevention**: Identify patterns to prevent similar bugs
- **Logging Strategy**: Add appropriate debugging information
- **Testing**: Create tests to prevent regression

## Debugging Process

### 1. Understand the Problem
- Read error messages carefully
- Reproduce the issue consistently
- Document the expected vs. actual behavior
- Gather relevant context (environment, inputs, state)

### 2. Isolate the Issue
- Narrow down the problem area
- Use binary search approach (divide and conquer)
- Check recent changes (git blame, git log)
- Review related code sections

### 3. Analyze Root Cause
- Use debugger to step through code
- Add logging/print statements
- Check variable states and types
- Verify assumptions
- Review error stack traces

### 4. Develop Fix
- Create minimal fix that addresses root cause
- Avoid band-aid solutions
- Consider edge cases
- Ensure fix doesn't introduce new issues

### 5. Verify and Test
- Test the fix thoroughly
- Add regression tests
- Verify in different environments
- Document the issue and solution

## Common Bug Categories

### Logic Errors
- Off-by-one errors
- Incorrect conditionals
- Wrong operator usage
- Missing edge cases
- State management issues

### Type Errors
- Type mismatches
- Null/undefined access
- Type coercion issues
- Missing type checks

### Async Issues
- Race conditions
- Callback hell
- Promise rejection handling
- Async/await misuse

### Resource Issues
- Memory leaks
- File handle leaks
- Connection not closed
- Resource exhaustion

## Debugging Techniques

### 1. Print/Log Debugging
```python
# Add strategic logging
logger.debug(f"Processing item: {item}")
logger.debug(f"Variable state: {variable}")
logger.debug(f"Function result: {result}")
```

### 2. Breakpoint Debugging
- Set breakpoints at suspicious locations
- Inspect variable states
- Step through code execution
- Watch expressions

### 3. Rubber Duck Debugging
- Explain code line-by-line to someone (or something)
- Often reveals issues through verbalization

### 4. Binary Search
- Comment out half the code
- Determine which half contains the bug
- Repeat until isolated

### 5. Diff Analysis
```bash
git diff HEAD~5  # Check recent changes
git bisect       # Find commit that introduced bug
```

## Error Message Interpretation

### Stack Traces
1. Read from bottom to top
2. Find your code (not library code)
3. Identify the exact line that failed
4. Check the error type and message

### Common Error Patterns
- `TypeError`: Type mismatch or null/undefined access
- `ReferenceError`: Variable not defined
- `SyntaxError`: Code parsing issue
- `RangeError`: Value out of acceptable range
- `NetworkError`: API or connection issue

## Tools and Commands

### JavaScript/Node.js
```javascript
// Browser DevTools
console.log(), console.table(), console.trace()
debugger;  // Pause execution

// Node.js
node --inspect
node --inspect-brk  // Pause on first line
```

### Python
```python
# Built-in debugger
import pdb; pdb.set_trace()

# Better debugger
import ipdb; ipdb.set_trace()

# Post-mortem debugging
python -m pdb script.py
```

### General Tools
- **Git bisect**: Find bug-introducing commit
- **Profilers**: Identify performance issues
- **Network inspectors**: Debug API calls
- **Memory profilers**: Find memory leaks

## Best Practices

1. **Reproduce First**: Always reproduce before fixing
2. **One Change at a Time**: Test each change
3. **Keep Notes**: Document findings and attempts
4. **Use Version Control**: Commit working states
5. **Ask for Help**: Fresh eyes can spot issues
6. **Take Breaks**: Step away when stuck
7. **Read Documentation**: Verify API usage

## Anti-Patterns

- ❌ Random changes without understanding
- ❌ Fixing symptoms instead of root cause
- ❌ Not reproducing the issue first
- ❌ Skipping tests after fixing
- ❌ Not documenting the fix
- ❌ Over-complicating the solution

## Debugging Checklist

- [ ] Issue is reproducible
- [ ] Error message is understood
- [ ] Stack trace is analyzed
- [ ] Relevant code sections identified
- [ ] Variable states checked
- [ ] Assumptions verified
- [ ] Root cause identified
- [ ] Fix is minimal and targeted
- [ ] Tests added to prevent regression
- [ ] Fix verified in all environments

## Examples

See [examples.md](./examples.md) for detailed debugging scenarios.

## Related Skills

- **testing**: Add tests to prevent regression
- **code-review**: Review fix for quality
- **refactoring**: Improve code structure to prevent bugs
